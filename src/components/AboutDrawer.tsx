import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import styles from "../styles/portfolio.module.css";

interface AboutDrawerProps {
  isOpen: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}

export function AboutDrawer({ isOpen, triggerRef, onClose }: AboutDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpen.current) triggerRef.current?.focus();
      wasOpen.current = false;
      return;
    }

    wasOpen.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.drawerLayer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <button
            className={styles.drawerBackdrop}
            type="button"
            aria-label="Закрыть раздел «О себе»"
            onClick={onClose}
          />
          <motion.aside
            id="about-drawer"
            className={styles.aboutDrawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-title"
            initial={{ x: "110%", opacity: 0, clipPath: "inset(0 0 0 100%)" }}
            animate={{ x: 0, opacity: 1, clipPath: "inset(0 0 0 0%)" }}
            exit={{ x: "110%", opacity: 0, clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 id="about-title" className={styles.visuallyHidden}>О себе</h2>
            <p className={styles.drawerEyebrow}>О себе</p>
            <p className={styles.drawerText}>
              Motion designer, graph designer и VFX-artist. Создаю коммерческие кампании,
              визуалы для артистов и развлекательный контент.
            </p>
            <button ref={closeRef} className={styles.drawerClose} type="button" onClick={onClose}>
              закрыть
            </button>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
