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
        <a href="https://t.me/zeska_" target="_blank" rel="noreferrer">tg @haru00y</a>
        <a href="tel:+996706184725">+996 706 184 725</a>
      </div>
    </footer>
  );
}
