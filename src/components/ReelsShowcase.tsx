import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { reels } from "../data/portfolio";
import { SectionIntro } from "./SectionIntro";
import { PortfolioVideo } from "./PortfolioVideo";
import styles from "../styles/portfolio.module.css";

const reelGroups = [0, 1, 2];
export function ReelsShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeReelKey, setActiveReelKey] = useState(`1-${reels[0].youtubeId}`);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
    suppressClick: false,
  });

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

    scroller.scrollBy({ left: direction * cardStep, behavior: "smooth" });
  }, []);

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
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-reel-card]"),
    );
    const visibleCards = new Set<HTMLElement>();

    const selectClosestCard = () => {
      const viewportCenter = window.innerWidth / 2;
      let closestCard: HTMLElement | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const card of visibleCards) {
        const rect = card.getBoundingClientRect();
        const visibleWidth = Math.max(
          0,
          Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0),
        );
        if (visibleWidth < rect.width * 0.32) continue;

        const distance = Math.abs(rect.left + rect.width / 2 - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestCard = card;
        }
      }

      const nextKey = closestCard?.dataset.reelKey;
      if (nextKey) setActiveReelKey((current) => current === nextKey ? current : nextKey);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          if (entry.isIntersecting) visibleCards.add(card);
          else visibleCards.delete(card);
        });
        selectClosestCard();
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const finishDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    dragRef.current.active = false;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  return (
    <section id="reels" className={`${styles.section} ${styles.reelsSection}`} data-work-section="reels">
      <SectionIntro title="Reels Showcase" subtitle="более 450+" />
      <div className={styles.reelsShell}>
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
          }}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            dragRef.current = {
              active: true,
              startX: event.clientX,
              startScrollLeft: event.currentTarget.scrollLeft,
              moved: false,
              suppressClick: false,
            };
            event.currentTarget.dataset.dragging = "true";
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!dragRef.current.active) return;
            event.preventDefault();
            if (Math.abs(event.clientX - dragRef.current.startX) > 6) {
              dragRef.current.moved = true;
              dragRef.current.suppressClick = true;
            }
            event.currentTarget.scrollLeft = dragRef.current.startScrollLeft
              - (event.clientX - dragRef.current.startX);
          }}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onClickCapture={(event) => {
            if (!dragRef.current.suppressClick) return;
            event.preventDefault();
            event.stopPropagation();
            dragRef.current.suppressClick = false;
          }}
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
                  <div
                    key={`${groupIndex}-${reel.youtubeId}`}
                    className={styles.reelCard}
                    data-reel-card
                    data-reel-key={`${groupIndex}-${reel.youtubeId}`}
                  >
                    <PortfolioVideo
                      youtubeId={reel.youtubeId}
                      posterSrc={reel.posterSrc}
                      aspectRatio={reel.videoAspect}
                      title={reel.title}
                      interactive={false}
                      autoplay={activeReelKey === `${groupIndex}-${reel.youtubeId}`}
                      preloadMargin="0px 70% 0px 12%"
                      unloadDelay={groupIndex === 1 && index < 2 ? 48000 : 9000}
                      showLoader={false}
                    />
                    <span className={styles.videoIndex}>{String(index + 1).padStart(2, "0")}</span>
                  </div>
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
