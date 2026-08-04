import type { CropName } from "../types/portfolio";
import styles from "../styles/portfolio.module.css";

interface ReferenceMediaProps {
  crop: CropName;
  label: string;
  className?: string;
}

export function ReferenceMedia({ crop, label, className = "" }: ReferenceMediaProps) {
  return (
    <div
      className={`${styles.referenceMedia} ${styles[crop]} ${className}`}
      role="img"
      aria-label={label}
    />
  );
}
