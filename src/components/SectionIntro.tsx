import { Fragment } from "react";
import styles from "../styles/portfolio.module.css";

const defaultServices = [
  "Монтаж, цветокоррекция",
  "VFX и композитинг",
  "Саунд-дизайн",
  "AI-интеграции",
];

interface SectionIntroProps {
  title: string;
  subtitle: string;
  services?: string[];
}

export function SectionIntro({ title, subtitle, services = defaultServices }: SectionIntroProps) {
  return (
    <div className={styles.sectionIntro}>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className={styles.introMeta}>
        <span>
          {services.map((service, index) => (
            <Fragment key={service}>
              {index > 0 ? <br /> : null}
              {service}
            </Fragment>
          ))}
        </span>
      </div>
    </div>
  );
}
