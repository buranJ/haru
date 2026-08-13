import styles from "../styles/portfolio.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Николь<br />Назаркулова</p>
      <nav aria-label="Навигация в подвале">
        <a href="#hero">о себе</a>
        <a href="#commercial">работы</a>
      </nav>
      <div>
        <a href="https://t.me/haruv00y" target="_blank" rel="noreferrer">
          мой телеграм @haruv00y
        </a>
      </div>
    </footer>
  );
}
