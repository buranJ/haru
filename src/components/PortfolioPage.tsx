"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { WorkCategory } from "../types/portfolio";
import { AboutDrawer } from "./AboutDrawer";
import { ArtistsSection } from "./ArtistsSection";
import { ClientsSection } from "./ClientsSection";
import { CommercialSection } from "./CommercialSection";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { PostersSection } from "./PostersSection";
import { ReelsShowcase } from "./ReelsShowcase";
import { SkillsSection } from "./SkillsSection";
import { WorkFilters } from "./WorkFilters";
import styles from "../styles/portfolio.module.css";

export function PortfolioPage() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<WorkCategory>("commercial");
  const aboutButtonRef = useRef<HTMLButtonElement>(null);

  const navigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const selectCategory = useCallback((id: WorkCategory) => {
    setActiveCategory(id);
    navigate(id);
  }, [navigate]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-work-section]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const category = visible?.target.getAttribute("data-work-section") as WorkCategory | null;
      if (category) setActiveCategory(category);
    }, { rootMargin: "-22% 0px -58%", threshold: [0.05, 0.2, 0.45] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page}>
      <div id="hero" className={styles.blackStage}>
        <Header
          aboutOpen={aboutOpen}
          aboutButtonRef={aboutButtonRef}
          onAboutToggle={() => setAboutOpen((open) => !open)}
          onNavigate={navigate}
        />
        <Hero />
      </div>

      <WorkFilters active={activeCategory} onSelect={selectCategory} />
      <CommercialSection />
      <WorkFilters active={activeCategory} tone="dark" onSelect={selectCategory} />
      <ArtistsSection />
      <WorkFilters active={activeCategory} onSelect={selectCategory} />
      <ReelsShowcase />
      <WorkFilters active={activeCategory} onSelect={selectCategory} />
      <PostersSection />
      <ClientsSection />
      <SkillsSection />
      <Footer />

      <AboutDrawer
        isOpen={aboutOpen}
        triggerRef={aboutButtonRef}
        onClose={() => setAboutOpen(false)}
      />
    </main>
  );
}
