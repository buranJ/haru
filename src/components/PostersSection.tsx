import { posters } from "../data/portfolio";
import { SectionIntro } from "./SectionIntro";
import styles from "../styles/portfolio.module.css";

export function PostersSection() {
  return (
    <section id="posters" className={`${styles.section} ${styles.postersSection}`} data-work-section="posters">
      <SectionIntro title="Постеры" subtitle="более 10000000000+" />
      <div className={styles.posterGallery}>
        {posters.map((poster, index) => (
          <button key={poster} className={styles.poster} type="button" aria-label={`Открыть ${poster}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
