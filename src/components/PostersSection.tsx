import type { CSSProperties } from "react";
import { posters } from "../data/portfolio";
import { SectionIntro } from "./SectionIntro";
import { PortfolioVideo } from "./PortfolioVideo";
import styles from "../styles/portfolio.module.css";

export function PostersSection() {
  return (
    <section id="posters" className={`${styles.section} ${styles.postersSection}`} data-work-section="posters">
      <SectionIntro
        title="Постеры"
        subtitle="более 10000000000+"
        services={["Разработка концепции", "Моушен-дизайн", "Стилизация", "Дизайн"]}
      />
      <div
        className={styles.posterGallery}
        style={{ "--poster-count": posters.length } as CSSProperties}
      >
        {posters.map((poster) => (
          <div key={poster.youtubeId} className={styles.poster}>
            <PortfolioVideo
              youtubeId={poster.youtubeId}
              posterSrc={poster.posterSrc}
              aspectRatio={poster.videoAspect}
              title={poster.title}
              fit="contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
