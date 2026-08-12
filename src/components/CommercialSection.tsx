import { motion } from "framer-motion";
import { commercialProjects } from "../data/portfolio";
import { YouTubeVideo } from "./YouTubeVideo";
import styles from "../styles/portfolio.module.css";

export function CommercialSection() {
  return (
    <section id="commercial" className={`${styles.section} ${styles.commercial}`} data-work-section="commercial">
      <h2 className={styles.visuallyHidden}>Коммерческие проекты</h2>
      {commercialProjects.map((project, index) => (
        <motion.article
          key={project.title}
          className={styles.commercialCard}
          tabIndex={0}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.projectInfo}>
            <div>
              <h3>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
              <p className={styles.projectYear}>{project.year}</p>
            </div>
            <div className={styles.projectMeta}>
              <span>{project.category}</span>
              <ul>
                {project.services.map((service) => <li key={service}>{service}</li>)}
              </ul>
            </div>
          </div>
          <div className={styles.mediaClip}>
            <YouTubeVideo youtubeId={project.youtubeId} title={project.title.replaceAll("\n", " ")} />
          </div>
        </motion.article>
      ))}
    </section>
  );
}
