import { useEffect, useRef, useState } from "react";
import { reels } from "../data/portfolio";
import { SectionIntro } from "./SectionIntro";
import styles from "../styles/portfolio.module.css";

export function ReelsShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const move = (direction: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const amount = Math.max(170, scroller.clientWidth / 6);
    const next = scroller.scrollLeft + direction * amount;
    if (next >= scroller.scrollWidth - scroller.clientWidth - 4) scroller.scrollTo({ left: 0, behavior: "smooth" });
    else if (next < 0) scroller.scrollTo({ left: scroller.scrollWidth, behavior: "smooth" });
    else scroller.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => move(1), 3600);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section id="reels" className={`${styles.section} ${styles.reelsSection}`} data-work-section="reels">
      <SectionIntro title="Reels Showcase" subtitle="более 450+" />
      <div
        className={styles.reelsShell}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={scrollerRef}
          className={styles.reelsScroller}
          tabIndex={0}
          aria-label="Слайдер Reels"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") move(-1);
            if (event.key === "ArrowRight") move(1);
          }}
          onWheel={(event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
              event.currentTarget.scrollLeft += event.deltaY;
            }
          }}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
        >
          {reels.map((reel, index) => (
            <button key={reel} className={styles.reelCard} type="button" aria-label={`Открыть ${reel}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div className={styles.horizontalControls}>
          <button type="button" onClick={() => move(-1)} aria-label="Предыдущие Reels">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Следующие Reels">→</button>
        </div>
      </div>
    </section>
  );
}
