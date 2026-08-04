import { clients } from "../data/portfolio";
import styles from "../styles/portfolio.module.css";

export function ClientsSection() {
  return (
    <section id="clients" className={`${styles.section} ${styles.clientsSection}`}>
      <h2>Клиенты и партнеры</h2>
      <div className={styles.marquee} aria-label="Клиенты и партнеры">
        <div className={styles.marqueeTrack}>
          {[...clients, ...clients].map((client, index) => (
            <span key={`${client}-${index}`} aria-hidden={index >= clients.length}>{client}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
