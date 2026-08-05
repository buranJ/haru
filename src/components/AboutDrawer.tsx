import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { Header } from "./Header";
import styles from "../styles/portfolio.module.css";

interface AboutDrawerProps {
  isOpen: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export function AboutDrawer({ isOpen, triggerRef, onClose, onNavigate }: AboutDrawerProps) {
  const aboutButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpen.current) triggerRef.current?.focus();
      wasOpen.current = false;
      return;
    }

    wasOpen.current = true;
    const frame = window.requestAnimationFrame(() => aboutButtonRef.current?.focus());

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
    window.setTimeout(() => onNavigate(id), 820);
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
          initial={{ x: "100%", clipPath: "inset(0 0 0 100%)" }}
          animate={{ x: 0, clipPath: "inset(0 0 0 0%)" }}
          exit={{ x: "100%", clipPath: "inset(0 0 0 100%)" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <Header
            tone="dark"
            aboutOpen
            aboutButtonRef={aboutButtonRef}
            onAboutToggle={onClose}
            onNavigate={navigateAfterClose}
          />

          <section className={styles.aboutHero}>
            <motion.div
              className={styles.aboutCopy}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 id="about-title">Николь<br />Назаркулова</h2>
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
              transition={{ duration: 0.72, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Медиаблок раздела «О себе»"
            />
          </section>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
