import { motion } from "framer-motion";
import { artistProjects } from "../data/portfolio";
import { ReferenceMedia } from "./ReferenceMedia";
import { VerticalSlider } from "./VerticalSlider";
import styles from "../styles/portfolio.module.css";

export function ArtistsSection() {
  return (
    <section id="artists" className={`${styles.section} ${styles.artists}`} data-work-section="artists">
      <h2 className={styles.visuallyHidden}>Работы для артистов</h2>
      <div className={styles.artistGrid}>
        {artistProjects.map((project, index) => (
          <motion.article
            key={project.title}
            className={styles.artistCard}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.72, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.mediaClip}>
              <ReferenceMedia crop={project.crop} label={`${project.title}, кадр проекта`} />
            </div>
            <h3>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
            <p className={styles.projectYear}>{project.year}</p>
            <div className={styles.artistMeta}>
              <span>Шоу-визуалы</span>
              <ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        className={styles.ledGrid}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.ledCopy}>
          <h3>LED Visuals Showcase</h3>
          <p>более 30+</p>
          <div className={styles.artistMeta}>
            <span>Разработка концепции</span>
            <ul><li>Отрисовка элементов</li><li>Моушен-дизайн</li><li>Стилизация</li><li>Дизайн</li></ul>
          </div>
        </div>
        <VerticalSlider />
      </motion.div>
    </section>
  );
}
