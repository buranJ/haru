import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { Header } from "./Header";
import { HeroModeSwitch } from "./HeroModeSwitch";
import styles from "../styles/portfolio.module.css";

interface AboutDrawerProps {
  isOpen: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export function AboutDrawer({ isOpen, triggerRef, onClose, onNavigate }: AboutDrawerProps) {
  const aboutNavButtonRef = useRef<HTMLButtonElement>(null);
  const returnButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpen.current) triggerRef.current?.focus();
      wasOpen.current = false;
      return;
    }

    wasOpen.current = true;
    const frame = window.requestAnimationFrame(() => returnButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  const navigateAfterClose = (id: string) => {
    onClose();
    window.setTimeout(() => onNavigate(id), 1080);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          ref={dialogRef}
          id="about-drawer"
          className={styles.aboutScreen}
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-title"
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{
            clipPath: "inset(0 0 0 0%)",
            transition: { duration: 0.96, ease: [0.76, 0, 0.24, 1] },
          }}
          exit={{
            clipPath: "inset(0 0 0 100%)",
            transition: { duration: 1.04, delay: 0.08, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <Header
            tone="dark"
            aboutOpen
            aboutButtonRef={aboutNavButtonRef}
            onAboutToggle={onClose}
            onNavigate={navigateAfterClose}
          />

          <section className={styles.aboutHero}>
            <motion.div
              className={styles.aboutCopy}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 26 }}
              transition={{
                opacity: { duration: 0.52 },
                x: { duration: 0.52, ease: [0.76, 0, 0.24, 1] },
                y: { duration: 0.62, delay: 0.34, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <h2 id="about-title">Николь<br />Назаркулова</h2>
              <HeroModeSwitch ref={returnButtonRef} mode="work" onClick={onClose} />
              <p>
                Motion Design, Graph Design, vfx - Artist<br />
                создаю коммерцию, визуалы для артистов<br />
                и развлекательный контент
              </p>
            </motion.div>

            <motion.div
              className={styles.aboutMedia}
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              exit={{ opacity: 0, x: 34 }}
              transition={{
                opacity: { duration: 0.5 },
                x: { duration: 0.58, ease: [0.76, 0, 0.24, 1] },
                clipPath: { duration: 0.72, delay: 0.42, ease: [0.22, 1, 0.36, 1] },
              }}
              role="img"
              aria-label="Николь Назаркулова"
            />

          </section>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
