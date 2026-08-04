import { navigation } from "../data/portfolio";
import type { WorkCategory } from "../types/portfolio";
import styles from "../styles/portfolio.module.css";

interface WorkFiltersProps {
  active: WorkCategory;
  tone?: "light" | "dark";
  onSelect: (id: WorkCategory) => void;
}

export function WorkFilters({ active, tone = "light", onSelect }: WorkFiltersProps) {
  return (
    <nav
      className={`${styles.workFilters} ${tone === "dark" ? styles.filtersDark : ""}`}
      aria-label="Категории работ"
    >
      {navigation.map((item) => (
        <button
          key={item.id}
          type="button"
          className={active === item.id ? styles.filterActive : ""}
          aria-current={active === item.id ? "page" : undefined}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
