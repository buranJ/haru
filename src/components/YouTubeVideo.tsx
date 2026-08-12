import styles from "../styles/portfolio.module.css";

interface YouTubeVideoProps {
  youtubeId: string;
  title: string;
  className?: string;
  tabIndex?: number;
  interactive?: boolean;
}

export function YouTubeVideo({
  youtubeId,
  title,
  className = "",
  tabIndex = 0,
  interactive = true,
}: YouTubeVideoProps) {
  const playerUrl = [
    `https://www.youtube-nocookie.com/embed/${youtubeId}`,
    "?autoplay=1",
    "&mute=1",
    "&loop=1",
    `&playlist=${youtubeId}`,
    "&playsinline=1",
    "&rel=0",
    `&controls=${interactive ? 1 : 0}`,
  ].join("");

  return (
    <div
      className={`${styles.youtubeVideo} ${interactive ? "" : styles.youtubeVideoPassive} ${className}`}
    >
      <iframe
        src={playerUrl}
        title={title}
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture; web-share"
        allowFullScreen={interactive}
        tabIndex={interactive ? tabIndex : -1}
      />
    </div>
  );
}
