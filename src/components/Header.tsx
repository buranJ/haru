import type { RefObject } from "react";
import styles from "../styles/portfolio.module.css";

interface HeaderProps {
  activeSection: "about" | "work";
  aboutButtonRef: RefObject<HTMLButtonElement | null>;
  onAboutToggle: () => void;
  onNavigate: (id: string) => void;
  tone?: "light" | "dark";
}

export function Header({
  activeSection,
  aboutButtonRef,
  onAboutToggle,
  onNavigate,
  tone = "light",
}: HeaderProps) {
  const aboutActive = activeSection === "about";
  const workActive = activeSection === "work";

  return (
    <header className={`${styles.header} ${tone === "dark" ? styles.headerDark : styles.headerLight}`}>
      <nav className={styles.primaryNav} aria-label="Основная навигация">
        <button
          ref={aboutButtonRef}
          type="button"
          className={aboutActive ? styles.navActive : ""}
          aria-current={aboutActive ? "page" : undefined}
          aria-expanded={aboutActive}
          aria-controls="about-drawer"
          onClick={onAboutToggle}
        >
          о себе
        </button>
        <button
          type="button"
          className={workActive ? styles.navActive : ""}
          aria-current={workActive ? "page" : undefined}
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
