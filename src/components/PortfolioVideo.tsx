import { useEffect, useRef, useState } from "react";
import styles from "../styles/portfolio.module.css";

interface YouTubePlayer {
  destroy?: () => void;
  getIframe?: () => HTMLIFrameElement;
  mute?: () => void;
  pauseVideo?: () => void;
  playVideo?: () => void;
  unloadModule?: (module: string) => void;
}

interface YouTubeEvent {
  data: number;
  target: YouTubePlayer;
}

interface YouTubeApi {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars: Record<string, number | string>;
      events: {
        onReady(event: YouTubeEvent): void;
        onStateChange(event: YouTubeEvent): void;
        onAutoplayBlocked(): void;
        onError(): void;
      };
    },
  ) => YouTubePlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
  };
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YouTubeApi> | null = null;

function mutePlayer(player?: YouTubePlayer | null) {
  if (typeof player?.mute === "function") player.mute();
}

// cc_load_policy alone still lets a viewer's "always show captions" account
// setting win, so the caption modules are torn down as well. "captions" is the
// legacy player's name for it, "cc" the HTML5 one — both are safe to unload.
function hideCaptions(player?: YouTubePlayer | null) {
  if (typeof player?.unloadModule !== "function") return;
  player.unloadModule("captions");
  player.unloadModule("cc");
}

function pausePlayer(player?: YouTubePlayer | null) {
  if (typeof player?.pauseVideo === "function") player.pauseVideo();
}

function playPlayer(player?: YouTubePlayer | null) {
  if (typeof player?.playVideo === "function") player.playVideo();
}

function destroyPlayer(player?: YouTubePlayer | null) {
  if (typeof player?.destroy === "function") player.destroy();
}

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise<YouTubeApi>((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      if (window.YT) resolve(window.YT);
      else reject(new Error("YouTube IFrame API did not initialize"));
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]',
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => reject(new Error("YouTube IFrame API failed to load"));
    document.head.appendChild(script);
  }).catch((error) => {
    youtubeApiPromise = null;
    throw error;
  });

  return youtubeApiPromise;
}

interface PortfolioVideoProps {
  youtubeId: string;
  posterSrc: string;
  aspectRatio: number;
  title: string;
  className?: string;
  fit?: "cover" | "contain";
  interactive?: boolean;
  enabled?: boolean;
  autoplay?: boolean;
  preloadMargin?: string;
  unloadDelay?: number;
  showLoader?: boolean;
}

export function PortfolioVideo({
  youtubeId,
  posterSrc,
  aspectRatio,
  title,
  className = "",
  fit = "cover",
  interactive = true,
  enabled = true,
  autoplay = true,
  preloadMargin = "0px",
  unloadDelay = 2000,
  showLoader = true,
}: PortfolioVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const visibleRef = useRef(false);
  const autoplayRef = useRef(autoplay);
  const unloadTimerRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldMountPlayer, setShouldMountPlayer] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const canMountPlayer = enabled && shouldMountPlayer;

  useEffect(() => {
    autoplayRef.current = autoplay;
  }, [autoplay]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry.isIntersecting && entry.intersectionRatio >= 0.18;
        visibleRef.current = nextVisible;
        setIsVisible(nextVisible);
        if (nextVisible) setHasError(false);
        if (!nextVisible) {
          setIsPlaying(false);
        }
      },
      { threshold: [0, 0.18, 0.5] },
    );

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (unloadTimerRef.current !== null) {
            window.clearTimeout(unloadTimerRef.current);
            unloadTimerRef.current = null;
          }
          setHasError(false);
          setShouldMountPlayer(true);
          return;
        }

        if (unloadTimerRef.current !== null) {
          window.clearTimeout(unloadTimerRef.current);
        }
        unloadTimerRef.current = window.setTimeout(() => {
          setShouldMountPlayer(false);
          unloadTimerRef.current = null;
        }, unloadDelay);
      },
      { rootMargin: preloadMargin, threshold: 0 },
    );

    visibilityObserver.observe(root);
    preloadObserver.observe(root);
    return () => {
      visibilityObserver.disconnect();
      preloadObserver.disconnect();
      if (unloadTimerRef.current !== null) {
        window.clearTimeout(unloadTimerRef.current);
        unloadTimerRef.current = null;
      }
    };
  }, [preloadMargin, unloadDelay]);

  useEffect(() => {
    const root = rootRef.current;
    const host = playerHostRef.current;
    if (!root || !host || !canMountPlayer) return;

    const fitPlayer = () => {
      const { width, height } = root.getBoundingClientRect();
      if (!width || !height) return;
      const sizeByWidth = fit === "cover"
        ? width / height > aspectRatio
        : width / height <= aspectRatio;
      if (sizeByWidth) {
        host.style.width = `${Math.ceil(width)}px`;
        host.style.height = `${Math.ceil(width / aspectRatio)}px`;
      } else {
        host.style.height = `${Math.ceil(height)}px`;
        host.style.width = `${Math.ceil(height * aspectRatio)}px`;
      }
    };

    fitPlayer();
    const resizeObserver = new ResizeObserver(fitPlayer);
    resizeObserver.observe(root);
    return () => resizeObserver.disconnect();
  }, [aspectRatio, canMountPlayer, fit]);

  useEffect(() => {
    const host = playerHostRef.current;
    if (!host || !canMountPlayer) return;

    let disposed = false;
    const mount = document.createElement("div");
    host.replaceChildren(mount);

    void loadYouTubeApi()
      .then((api) => {
        if (disposed) return;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        playerRef.current = new api.Player(mount, {
          videoId: youtubeId,
          playerVars: {
            autoplay: 0,
            cc_load_policy: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            iv_load_policy: 3,
            mute: 1,
            origin: window.location.origin,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              if (disposed) return;
              const iframe = typeof event.target.getIframe === "function"
                ? event.target.getIframe()
                : null;
              if (iframe) iframe.loading = "lazy";
              mutePlayer(event.target);
              hideCaptions(event.target);
              setIsReady(true);
              if (!reduceMotion && !document.hidden && visibleRef.current && autoplayRef.current) {
                playPlayer(event.target);
              }
            },
            onStateChange: (event) => {
              if (disposed) return;
              if (event.data === api.PlayerState.ENDED) {
                if (visibleRef.current && autoplayRef.current) {
                  playPlayer(event.target);
                  return;
                }
                setIsPlaying(false);
                pausePlayer(event.target);
                return;
              }

              if (event.data === api.PlayerState.PLAYING) {
                // Playback can pull the caption module back in, so drop it again.
                hideCaptions(event.target);
                if (visibleRef.current && autoplayRef.current) {
                  setIsPlaying(true);
                  return;
                }
                pausePlayer(event.target);
                setIsPlaying(false);
                return;
              }

              if (event.data === api.PlayerState.PAUSED) {
                setIsPlaying(false);
              }
            },
            onAutoplayBlocked: () => {
              if (disposed) return;
              setIsPlaying(false);
            },
            onError: () => {
              if (disposed) return;
              setHasError(true);
              setIsReady(false);
              setIsPlaying(false);
            },
          },
        });
      })
      .catch(() => setHasError(true));

    return () => {
      disposed = true;
      destroyPlayer(playerRef.current);
      playerRef.current = null;
      host.replaceChildren();
      setIsReady(false);
      setIsPlaying(false);
    };
  }, [canMountPlayer, youtubeId]);

  useEffect(() => {
    const handleVisibility = () => {
      const player = playerRef.current;
      if (!player || !isReady) return;
      if (document.hidden || !isVisible || !autoplay) {
        pausePlayer(player);
        setIsPlaying(false);
      }
      else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        mutePlayer(player);
        playPlayer(player);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    handleVisibility();
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [autoplay, isVisible, isReady]);

  const togglePlayback = () => {
    const player = playerRef.current;
    if (!player || !isReady) return;
    if (isPlaying) {
      pausePlayer(player);
    }
    else {
      mutePlayer(player);
      playPlayer(player);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.portfolioVideo} ${fit === "contain" ? styles.videoContain : ""} ${isPlaying ? styles.videoReady : ""} ${className}`}
      role="group"
      aria-label={title}
    >
      {/* Local video posters are already compressed and do not need Next Image processing. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.videoPoster}
        src={posterSrc}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <div ref={playerHostRef} className={styles.youtubeApiMount} aria-hidden="true" />
      {showLoader && isVisible && !isReady && !hasError ? (
        <span className={styles.videoLoader} aria-hidden="true" />
      ) : null}
      {interactive ? (
        <button
          className={`${styles.videoToggle} ${isPlaying ? styles.videoPause : styles.videoPlay}`}
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? `Поставить «${title}» на паузу` : `Воспроизвести «${title}»`}
        >
          <span aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
