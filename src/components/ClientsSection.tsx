import { clients } from "../data/portfolio";
import styles from "../styles/portfolio.module.css";

export function ClientsSection() {
  return (
    <section id="clients" className={`${styles.section} ${styles.clientsSection}`}>
      <h2>Клиенты и партнеры</h2>
      <div className={styles.marquee} aria-label="Клиенты и партнеры">
        <div className={styles.marqueeTrack}>
          {[...clients, ...clients].map((client, index) => {
            // The track is the list twice over; the second pass only exists to
            // make the loop seamless and stays out of the accessibility tree.
            const isRepeat = index >= clients.length;
            const logo = client.logo ? (
              <img
                className={styles.clientLogo}
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
              />
            ) : (
              client.name
            );

            return (
              <span key={`${client.name}-${index}`} aria-hidden={isRepeat}>
                {client.href ? (
                  <a
                    className={styles.clientLink}
                    href={client.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    // aria-hidden alone would still leave the copy tabbable.
                    tabIndex={isRepeat ? -1 : undefined}
                  >
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
