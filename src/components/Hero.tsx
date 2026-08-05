import { motion } from "framer-motion";
import styles from "../styles/portfolio.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <motion.h1
        id="hero-title"
        className={styles.defaultHeroName}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        Николь<br />Назаркулова
      </motion.h1>

      <motion.div
        className={styles.showreelTitle}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Work<br />Showreel<br />2021-2026
      </motion.div>

      <motion.div
        className={styles.defaultHeroBio}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>*(haruv00y)</span>
        <p>
          Motion Designer &amp; Director<br />
          опыт более 7+ лет в сфере дизайна,<br />
          анимации и пост-продакшена
        </p>
      </motion.div>
    </section>
  );
}
