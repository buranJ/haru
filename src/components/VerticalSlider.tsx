import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ledSlides } from "../data/portfolio";
import { PortfolioVideo } from "./PortfolioVideo";
import styles from "../styles/portfolio.module.css";

export function VerticalSlider() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const sliderRef = useRef<HTMLDivElement>(null);
  const lockedUntil = useRef(0);
  const wheelDelta = useRef(0);
  const pointerStart = useRef<number | null>(null);

  const move = useCallback((delta: number) => {
    setDirection(delta);
    setActive((current) => (current + delta + ledSlides.length) % ledSlides.length);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      event.preventDefault();
      event.stopPropagation();

      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;
      if (Math.abs(delta) < 1) return;

      if (Date.now() < lockedUntil.current) {
        wheelDelta.current = 0;
        return;
      }

      wheelDelta.current += delta;
      if (Math.abs(wheelDelta.current) < 42) return;

      const nextDirection = wheelDelta.current > 0 ? 1 : -1;
      wheelDelta.current = 0;
      lockedUntil.current = Date.now() + 680;
      move(nextDirection);
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, [move]);

  return (
    <div
      ref={sliderRef}
      className={styles.verticalSlider}
      role="region"
      aria-label="LED Visuals Showcase. Вертикальный слайдер"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowUp" || event.key === "PageUp") {
          event.preventDefault();
          move(-1);
        }
        if (event.key === "ArrowDown" || event.key === "PageDown") {
          event.preventDefault();
          move(1);
        }
      }}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("button")) return;
        pointerStart.current = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const delta = pointerStart.current - event.clientY;
        if (Math.abs(delta) > 30) move(delta > 0 ? 1 : -1);
        pointerStart.current = null;
      }}
      onPointerCancel={() => { pointerStart.current = null; }}
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
            <PortfolioVideo
              src={ledSlides[active].videoSrc}
              title={ledSlides[active].title}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.sliderControls}>
        <button type="button" aria-label="Предыдущий LED-визуал" onClick={() => move(-1)}>↑</button>
        <span aria-live="polite">
          {String(active + 1).padStart(2, "0")}<i />{String(ledSlides.length).padStart(2, "0")}
        </span>
        <button type="button" aria-label="Следующий LED-визуал" onClick={() => move(1)}>↓</button>
      </div>
    </div>
  );
}
