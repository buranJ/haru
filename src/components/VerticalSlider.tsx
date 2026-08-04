import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { ledSlides } from "../data/portfolio";
import { ReferenceMedia } from "./ReferenceMedia";
import styles from "../styles/portfolio.module.css";

export function VerticalSlider() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const lockedUntil = useRef(0);
  const pointerStart = useRef<number | null>(null);

  const move = (delta: number) => {
    setDirection(delta);
    setActive((current) => (current + delta + ledSlides.length) % ledSlides.length);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) < 12 || Date.now() < lockedUntil.current) return;
    lockedUntil.current = Date.now() + 600;
    move(event.deltaY > 0 ? 1 : -1);
  };

  return (
    <div
      className={styles.verticalSlider}
      onWheel={handleWheel}
      onPointerDown={(event) => { pointerStart.current = event.clientY; }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const delta = pointerStart.current - event.clientY;
        if (Math.abs(delta) > 30) move(delta > 0 ? 1 : -1);
        pointerStart.current = null;
      }}
    >
      <div className={styles.verticalViewport}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={active}
            className={styles.verticalSlide}
            custom={direction}
            variants={{
              enter: (value: number) => ({ y: value > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { y: 0, opacity: 1 },
              exit: (value: number) => ({ y: value > 0 ? "-100%" : "100%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <ReferenceMedia crop={ledSlides[active].crop} label={ledSlides[active].title} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.sliderControls}>
        <button type="button" aria-label="Предыдущий LED-визуал" onClick={() => move(-1)}>↑</button>
        <span>{String(active + 1).padStart(2, "0")} / {String(ledSlides.length).padStart(2, "0")}</span>
        <button type="button" aria-label="Следующий LED-визуал" onClick={() => move(1)}>↓</button>
      </div>
    </div>
  );
}
