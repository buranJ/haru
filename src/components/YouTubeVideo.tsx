import { useState } from "react";
import styles from "../styles/portfolio.module.css";

interface YouTubeVideoProps {
  youtubeId: string;
  title: string;
  className?: string;
  tabIndex?: number;
}

export function YouTubeVideo({ youtubeId, title, className = "", tabIndex = 0 }: YouTubeVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`${styles.youtubeVideo} ${className}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0`}
          title={title}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          tabIndex={tabIndex}
        />
      ) : (
        <button
          className={styles.youtubePreview}
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Воспроизвести видео «${title}»`}
          tabIndex={tabIndex}
        >
          {/* YouTube thumbnails are remote runtime assets and are intentionally not processed by Next Image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            draggable={false}
            onError={(event) => {
              if (event.currentTarget.src.endsWith("/hqdefault.jpg")) return;
              event.currentTarget.src = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
            }}
          />
          <span className={styles.youtubePlay} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
