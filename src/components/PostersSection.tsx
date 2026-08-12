import type { CSSProperties } from "react";
import { posters } from "../data/portfolio";
import { SectionIntro } from "./SectionIntro";
import { PortfolioVideo } from "./PortfolioVideo";
import styles from "../styles/portfolio.module.css";

export function PostersSection() {
  return (
    <section id="posters" className={`${styles.section} ${styles.postersSection}`} data-work-section="posters">
      <SectionIntro title="Постеры" subtitle="более 10000000000+" />
      <div
        className={styles.posterGallery}
        style={{ "--poster-count": posters.length } as CSSProperties}
      >
        {posters.map((poster, index) => (
          <div key={poster.youtubeId} className={styles.poster}>
            <PortfolioVideo
              youtubeId={poster.youtubeId}
              posterSrc={poster.posterSrc}
              aspectRatio={poster.videoAspect}
              title={poster.title}
            />
            <span className={styles.videoIndex}>{String(index + 1).padStart(2, "0")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
