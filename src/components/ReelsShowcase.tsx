import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { reels } from "../data/portfolio";
import { SectionIntro } from "./SectionIntro";
import styles from "../styles/portfolio.module.css";

const reelGroups = [0, 1, 2];
const autoplaySpeed = 38;

export function ReelsShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const autoplayPausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const pauseAutoplay = useCallback((resumeAfter = 0) => {
    autoplayPausedRef.current = true;

    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }

    if (resumeAfter > 0) {
      resumeTimerRef.current = window.setTimeout(() => {
        autoplayPausedRef.current = false;
        resumeTimerRef.current = null;
      }, resumeAfter);
    }
  }, []);

  const resumeAutoplay = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    autoplayPausedRef.current = false;
  }, []);

  const normalizeLoop = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const groups = scroller.querySelectorAll<HTMLElement>("[data-reel-group]");
    if (groups.length < 3) return;

    const loopWidth = groups[1].offsetLeft - groups[0].offsetLeft;
    if (loopWidth <= 0) return;

    if (scroller.scrollLeft < loopWidth * 0.5) {
      scroller.scrollLeft += loopWidth;
    } else if (scroller.scrollLeft >= loopWidth * 1.5) {
      scroller.scrollLeft -= loopWidth;
    }
  }, []);

  const move = useCallback((direction: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = scroller.querySelectorAll<HTMLElement>("[data-reel-card]");
    const cardStep = cards.length > 1
      ? cards[1].offsetLeft - cards[0].offsetLeft
      : scroller.clientWidth * 0.7;

    pauseAutoplay(1100);
    scroller.scrollBy({ left: direction * cardStep, behavior: "smooth" });
  }, [pauseAutoplay]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const centerOnMiddleGroup = () => {
      const middleGroup = scroller.querySelectorAll<HTMLElement>("[data-reel-group]")[1];
      if (middleGroup) scroller.scrollLeft = middleGroup.offsetLeft;
    };

    const frame = window.requestAnimationFrame(centerOnMiddleGroup);
    const resizeObserver = new ResizeObserver(centerOnMiddleGroup);
    resizeObserver.observe(scroller);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    let previousTime = performance.now();

    const animate = (time: number) => {
      const elapsed = Math.min(time - previousTime, 64);
      previousTime = time;

      if (!autoplayPausedRef.current && !dragRef.current.active && scrollerRef.current) {
        scrollerRef.current.scrollLeft += (elapsed / 1000) * autoplaySpeed;
        normalizeLoop();
      }

      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    };
  }, [normalizeLoop]);

  const finishDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    dragRef.current.active = false;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pauseAutoplay(1200);
  }, [pauseAutoplay]);

  return (
    <section id="reels" className={`${styles.section} ${styles.reelsSection}`} data-work-section="reels">
      <SectionIntro title="Reels Showcase" subtitle="более 450+" />
      <div
        className={styles.reelsShell}
        onMouseEnter={() => pauseAutoplay()}
        onMouseLeave={resumeAutoplay}
        onFocusCapture={() => pauseAutoplay()}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) resumeAutoplay();
        }}
      >
        <div
          ref={scrollerRef}
          className={styles.reelsScroller}
          tabIndex={0}
          aria-label="Бесконечный слайдер Reels"
          onScroll={normalizeLoop}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
          }}
          onWheel={(event) => {
            event.preventDefault();
            const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
              ? event.deltaX
              : event.deltaY;
            event.currentTarget.scrollLeft += delta;
            pauseAutoplay(900);
          }}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            dragRef.current = {
              active: true,
              startX: event.clientX,
              startScrollLeft: event.currentTarget.scrollLeft,
            };
            event.currentTarget.dataset.dragging = "true";
            event.currentTarget.setPointerCapture(event.pointerId);
            pauseAutoplay();
          }}
          onPointerMove={(event) => {
            if (!dragRef.current.active) return;
            event.preventDefault();
            event.currentTarget.scrollLeft = dragRef.current.startScrollLeft
              - (event.clientX - dragRef.current.startX);
          }}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          <div className={styles.reelsTrack}>
            {reelGroups.map((groupIndex) => (
              <div
                key={groupIndex}
                className={styles.reelsGroup}
                data-reel-group
                aria-hidden={groupIndex === 1 ? undefined : true}
              >
                {reels.map((reel, index) => (
                  <button
                    key={`${groupIndex}-${reel}`}
                    className={styles.reelCard}
                    data-reel-card
                    type="button"
                    tabIndex={groupIndex === 1 ? 0 : -1}
                    aria-label={`Открыть ${reel}`}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.horizontalControls} aria-label="Навигация по Reels">
          <button type="button" onClick={() => move(-1)} aria-label="Предыдущий Reel">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Следующий Reel">→</button>
        </div>
      </div>
    </section>
  );
}
