import { adobeTools, skillGroups } from "../data/portfolio";
import styles from "../styles/portfolio.module.css";

export function SkillsSection() {
  return (
    <section id="skills" className={`${styles.section} ${styles.skillsSection}`}>
      <div className={styles.skillsHeader}>
        <div>
          <h2>Ключевые навыки</h2>
          <p>за 7 лет работы</p>
        </div>
        <div className={styles.adobeTools} aria-label="Программы">
          {adobeTools.map((tool) => <span key={tool}>{tool}</span>)}
        </div>
      </div>
      <div className={styles.skillGrid}>
        {skillGroups.map((group, index) => (
          <div key={`${group.heading}-${index}`}>
            <h3>{group.heading}</h3>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
