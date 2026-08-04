import type { RefObject } from "react";
import styles from "../styles/portfolio.module.css";

interface HeaderProps {
  aboutOpen: boolean;
  aboutButtonRef: RefObject<HTMLButtonElement | null>;
  onAboutToggle: () => void;
  onNavigate: (id: string) => void;
}

export function Header({ aboutOpen, aboutButtonRef, onAboutToggle, onNavigate }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.primaryNav} aria-label="Основная навигация">
        <button type="button" onClick={() => onNavigate("commercial")}>работы</button>
        <button
          ref={aboutButtonRef}
          type="button"
          className={aboutOpen ? styles.navActive : ""}
          aria-expanded={aboutOpen}
          aria-controls="about-drawer"
          onClick={onAboutToggle}
        >
          о себе
        </button>
        <button type="button" onClick={() => onNavigate("clients")}>клиенты</button>
        <button type="button" onClick={() => onNavigate("skills")}>навыки</button>
      </nav>

      <div className={styles.headerMeta}>
        <a href="https://t.me/zeska_" target="_blank" rel="noreferrer">мой телеграм</a>
        <a href="https://t.me/zeska_" target="_blank" rel="noreferrer">by @zeska._</a>
      </div>
    </header>
  );
}
