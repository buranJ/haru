import { clients } from "../data/portfolio";
import styles from "../styles/portfolio.module.css";

export function ClientsSection() {
  return (
    <section id="clients" className={`${styles.section} ${styles.clientsSection}`}>
      <h2>Клиенты и партнеры</h2>
      <div className={styles.marquee} aria-label="Клиенты и партнеры">
        <div className={styles.marqueeTrack}>
          {[...clients, ...clients].map((client, index) => (
            <span
              key={`${client.name}-${index}`}
              aria-hidden={index >= clients.length}
            >
              {client.logo ? (
                <img
                  className={styles.clientLogo}
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                client.name
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
