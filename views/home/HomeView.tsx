import Link from "next/link";
import styles from "./HomeView.module.css";
import { getFeaturedArticlesByCategorySlug } from "@/lib/content/content";
import { WidgetRenderer } from "@/widgets/WidgetRenderer";

export function HomeView() {
  const featuredServices = getFeaturedArticlesByCategorySlug(
    "services",
  );

  return (
    <div className={styles.deHomeView}>
      <section className={styles.deHero}>
        <div className={styles.deHeroCopy}>
          <div className={styles.deEyebrow}>Based in Portland, Oregon</div>

          <h1 className={styles.deTitle}>
            Facial Plastic Surgery in Portland
          </h1>

          <p className={styles.deLead}>
            Dr. Sarah Mitchell is a board-certified head &amp; neck surgeon with
            specialized fellowship training in Facial Plastic &amp; Reconstructive
            Surgery.
          </p>

          <div className={styles.deActions}>
            <Link
              className={`${styles.deButton} ${styles.deButtonPrimary}`}
              href="/services"
            >
              Explore Services
            </Link>
          </div>
        </div>

        <div className={styles.deHeroMedia}>
          <div className={styles.deHeroFrame}>
            <img
              className={styles.deHeroImage}
              src="/doctor.png"
              alt="Dr. Sarah Mitchell portrait"
            />
          </div>
        </div>
      </section>

      <section className={styles.deSection}>
        <div className={styles.deFeaturedSection}>
          <div className={styles.deSectionHeader}>
            <h2 className={styles.deSectionTitle}>Featured Services</h2>
          </div>

          <div className={styles.deFeaturedGrid}>
            {featuredServices.map((service) => (
              <article key={service.href} className={styles.deFeaturedCard}>
                {service.heroImages[0] ? (
                  <div className={styles.deFeaturedMedia}>
                    <img
                      className={styles.deFeaturedImage}
                      src={service.heroImages[0]}
                      alt={service.title}
                    />
                  </div>
                ) : null}

                <div className={styles.deFeaturedContent}>
                  <h3 className={styles.deFeaturedTitle}>{service.title}</h3>
                  <p className={styles.deFeaturedText}>{service.summary}</p>
                  <Link className={styles.deFeaturedLink} href={service.href}>
                    Find Out More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.deSection}>
        <div className={styles.deContactPanel}>
          <h2 className={styles.deSectionTitle}>Contact Us</h2>
          <p className={styles.deSectionText}>
            Contact the practice to ask about
            services and schedule the next step.
          </p>
          <WidgetRenderer widgetId="contact-form" />
        </div>
      </section>
    </div>
  );
}
