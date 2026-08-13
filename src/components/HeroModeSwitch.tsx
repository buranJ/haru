import { forwardRef } from "react";
import styles from "../styles/portfolio.module.css";

interface HeroModeSwitchProps {
  mode: "about" | "work";
  onClick: () => void;
}

export const HeroModeSwitch = forwardRef<HTMLButtonElement, HeroModeSwitchProps>(
  function HeroModeSwitch({ mode, onClick }, ref) {
    const opensAbout = mode === "about";

    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.heroModeSwitch} ${opensAbout ? styles.modeSwitchLight : styles.modeSwitchDark}`}
        aria-expanded={!opensAbout}
        aria-controls="about-drawer"
        aria-label={opensAbout ? "Открыть экран «Обо мне»" : "Вернуться к экрану работ"}
        onClick={onClick}
      >
        <span className={styles.modeArrow} aria-hidden="true">
          <span className={styles.modeArrowShaft} />
          <span className={`${styles.modeArrowWing} ${styles.modeArrowWingTop}`} />
          <span className={`${styles.modeArrowWing} ${styles.modeArrowWingBottom}`} />
        </span>
      </button>
    );
  },
);
