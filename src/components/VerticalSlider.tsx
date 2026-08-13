import { motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ledSlides } from "../data/portfolio";
import { PortfolioVideo } from "./PortfolioVideo";
import styles from "../styles/portfolio.module.css";

const SLIDE_COUNT = ledSlides.length;

// Three copies of the reel let the stack run past either end and be re-centred
// silently, so the loop never shows a rewind. The pointer lives in the middle copy.
const LOOP = [...ledSlides, ...ledSlides, ...ledSlides];

// How far from the active slide a frame still gets mounted. Two keeps the
// peeking neighbours filled while a move is animating.
const MOUNT_RANGE = 2;

export function VerticalSlider() {
  const [position, setPosition] = useState(SLIDE_COUNT);
  // Set whenever the stack has to jump rather than travel: the first measured
  // layout, a resize, or the silent hop back into the middle copy.
  const [isInstant, setIsInstant] = useState(true);
  const [metrics, setMetrics] = useState({ slide: 0, stride: 0 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lockedUntil = useRef(0);
  const wheelDelta = useRef(0);
  const pointerStart = useRef<number | null>(null);

  const active = ((position % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;

  const move = useCallback((delta: number) => {
    setIsInstant(false);
    setPosition((current) => current + delta);
  }, []);

  // The stack is offset in pixels, so the slide height has to be measured
  // rather than assumed — the column is fluid.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const slide = track.firstElementChild;
      if (!slide) return;
      const height = slide.getBoundingClientRect().height;
      const gap = Number.parseFloat(window.getComputedStyle(track).rowGap) || 0;
      setIsInstant(true);
      setMetrics({ slide: height, stride: height + gap });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Drop back into the middle copy once a move settles outside it.
  const recenter = () => {
    if (position >= SLIDE_COUNT && position < SLIDE_COUNT * 2) return;
    setIsInstant(true);
    setPosition((current) => (current < SLIDE_COUNT ? current + SLIDE_COUNT : current - SLIDE_COUNT));
  };

  useEffect(() => {
    if (!isInstant) return;
    const frame = window.requestAnimationFrame(() => setIsInstant(false));
    return () => window.cancelAnimationFrame(frame);
  }, [isInstant, position, metrics]);

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
        <motion.div
          ref={trackRef}
          className={styles.verticalTrack}
          animate={{ y: -(position * metrics.stride + metrics.slide / 2) }}
          transition={isInstant
            ? { duration: 0 }
            : { duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={recenter}
        >
          {LOOP.map((slide, index) => {
            const isActive = index === position;

            return (
              <div
                key={`${slide.title}-${index}`}
                className={`${styles.verticalSlide} ${isActive ? styles.verticalSlideActive : ""}`}
                aria-hidden={!isActive}
              >
                {Math.abs(index - position) <= MOUNT_RANGE ? (
                  <PortfolioVideo
                    youtubeId={slide.youtubeId}
                    posterSrc={slide.posterSrc}
                    aspectRatio={slide.videoAspect}
                    title={slide.title}
                    fit="contain"
                    enabled={isActive}
                    autoplay={isActive}
                    interactive={isActive}
                    showLoader={isActive}
                  />
                ) : null}
              </div>
            );
          })}
        </motion.div>
      </div>
      <div className={styles.sliderControls}>
        <button type="button" aria-label="Предыдущий LED-визуал" onClick={() => move(-1)}>↑</button>
        <i className={styles.sliderDivider} aria-hidden="true" />
        <button type="button" aria-label="Следующий LED-визуал" onClick={() => move(1)}>↓</button>
        <span className={styles.visuallyHidden} aria-live="polite">
          Визуал {active + 1} из {SLIDE_COUNT}
        </span>
      </div>
    </div>
  );
}
