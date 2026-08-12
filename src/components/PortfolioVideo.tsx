import { useEffect, useRef, useState } from "react";
import styles from "../styles/portfolio.module.css";

interface YouTubePlayer {
  destroy(): void;
  mute(): void;
  pauseVideo(): void;
  playVideo(): void;
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
  interactive?: boolean;
}

export function PortfolioVideo({
  youtubeId,
  posterSrc,
  aspectRatio,
  title,
  className = "",
  interactive = true,
}: PortfolioVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry.isIntersecting && entry.intersectionRatio >= 0.18;
        setIsVisible(nextVisible);
        if (nextVisible) setHasError(false);
        if (!nextVisible) {
          setIsReady(false);
          setIsPlaying(false);
        }
      },
      { threshold: [0, 0.18, 0.5] },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const host = playerHostRef.current;
    if (!root || !host || !isVisible) return;

    const fitPlayer = () => {
      const { width, height } = root.getBoundingClientRect();
      if (!width || !height) return;
      if (width / height > aspectRatio) {
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
  }, [aspectRatio, isVisible]);

  useEffect(() => {
    const host = playerHostRef.current;
    if (!host || !isVisible) return;

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
            autoplay: reduceMotion ? 0 : 1,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            mute: 1,
            origin: window.location.origin,
            playlist: youtubeId,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              event.target.mute();
              setIsReady(true);
              if (!reduceMotion && !document.hidden) event.target.playVideo();
            },
            onStateChange: (event) => {
              if (event.data === api.PlayerState.ENDED) event.target.playVideo();
              setIsPlaying(event.data === api.PlayerState.PLAYING);
            },
            onAutoplayBlocked: () => setIsPlaying(false),
            onError: () => {
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
      playerRef.current?.destroy();
      playerRef.current = null;
      host.replaceChildren();
    };
  }, [isVisible, youtubeId]);

  useEffect(() => {
    const handleVisibility = () => {
      const player = playerRef.current;
      if (!player || !isVisible) return;
      if (document.hidden) player.pauseVideo();
      else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        player.mute();
        player.playVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isVisible]);

  const togglePlayback = () => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else {
      player.mute();
      player.playVideo();
    }
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.portfolioVideo} ${isPlaying ? styles.videoReady : ""} ${className}`}
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
      {isVisible && !isReady && !hasError ? (
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
