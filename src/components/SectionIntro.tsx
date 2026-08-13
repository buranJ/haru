import styles from "../styles/portfolio.module.css";

interface SectionIntroProps {
  title: string;
  subtitle: string;
}

export function SectionIntro({ title, subtitle }: SectionIntroProps) {
  return (
    <div className={styles.sectionIntro}>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className={styles.introMeta}>
        <span>Монтаж, цветокоррекция<br />VFX и композитинг<br />Саунд-дизайн<br />AI-интеграции</span>
      </div>
    </div>
  );
}
