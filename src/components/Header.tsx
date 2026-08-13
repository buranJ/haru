import type { RefObject } from "react";
import styles from "../styles/portfolio.module.css";

interface HeaderProps {
  aboutOpen: boolean;
  aboutButtonRef: RefObject<HTMLButtonElement | null>;
  onAboutToggle: () => void;
  onNavigate: (id: string) => void;
  tone?: "light" | "dark";
}

export function Header({
  aboutOpen,
  aboutButtonRef,
  onAboutToggle,
  onNavigate,
  tone = "light",
}: HeaderProps) {
  return (
    <header className={`${styles.header} ${tone === "dark" ? styles.headerDark : styles.headerLight}`}>
      <nav className={styles.primaryNav} aria-label="Основная навигация">
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
        <button
          type="button"
          className={!aboutOpen ? styles.navActive : ""}
          onClick={() => onNavigate("commercial")}
        >
          работы
        </button>
        <button type="button" onClick={() => onNavigate("clients")}>клиенты</button>
        <button type="button" onClick={() => onNavigate("skills")}>навыки</button>
      </nav>

      <div className={styles.headerMeta}>
        {tone === "light" ? (
          <a href="https://t.me/haruv00y" target="_blank" rel="noreferrer">
            мой телеграм @haruv00y
          </a>
        ) : (
          <>
            <a href="https://t.me/haruv00y" target="_blank" rel="noreferrer">мой телеграм</a>
            <a href="https://t.me/haruv00y" target="_blank" rel="noreferrer">@haruv00y</a>
          </>
        )}
      </div>
    </header>
  );
}
