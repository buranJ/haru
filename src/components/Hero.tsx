import { motion } from "framer-motion";
import styles from "../styles/portfolio.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <motion.div
        className={styles.heroCopy}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 id="hero-title">Николь<br />Назаркулова</h1>
        <p>
          Motion Design, Graph Design, vfx - Artist<br />
          создаю коммерцию, визуалы для артистов<br />
          и развлекательный контент
        </p>
      </motion.div>

      <motion.div
        className={styles.heroMedia}
        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Медиаблок для showreel"
      >
        <span>SHOWREEL<br />2021—2026</span>
      </motion.div>
    </section>
  );
}
