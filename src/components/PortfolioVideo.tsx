import { useEffect, useRef, useState } from "react";
import styles from "../styles/portfolio.module.css";

interface PortfolioVideoProps {
  src: string;
  title: string;
  className?: string;
  interactive?: boolean;
}

function posterFor(src: string) {
  return src.replace(/\.mp4$/, ".jpg");
}

export function PortfolioVideo({
  src,
  title,
  className = "",
  interactive = true,
}: PortfolioVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.01 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isVisible) {
      video.pause();
      video.removeAttribute("src");
      video.load();
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    video.src = src;
    video.load();
    if (!reduceMotion) void video.play().catch(() => setIsPlaying(false));
  }, [isVisible, src]);

  useEffect(() => {
    const handleVisibility = () => {
      const video = videoRef.current;
      if (!video || !isVisible) return;
      if (document.hidden) video.pause();
      else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        void video.play().catch(() => setIsPlaying(false));
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isVisible]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setIsPlaying(false));
    else video.pause();
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.portfolioVideo} ${isReady ? styles.videoReady : ""} ${className}`}
      role="group"
      aria-label={title}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="none"
        poster={posterFor(src)}
        aria-label={title}
        disablePictureInPicture
        onCanPlay={() => {
          setIsReady(true);
          if (isVisible && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            void videoRef.current?.play().catch(() => setIsPlaying(false));
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEmptied={() => setIsReady(false)}
      />
      {isVisible && !isReady ? <span className={styles.videoLoader} aria-hidden="true" /> : null}
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
