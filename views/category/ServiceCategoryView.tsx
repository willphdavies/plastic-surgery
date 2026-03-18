import Link from "next/link";
import type { Article, ArticleCategory } from "@/types/content";
import styles from "./CategoryView.module.css";

type ServiceCategoryViewProps = {
  category: ArticleCategory;
  articles: Article[];
};

export function ServiceCategoryView({
  category,
  articles,
}: ServiceCategoryViewProps) {
  return (
    <section className={styles.deCategoryView}>
      <header className={`${styles.deHero} ${styles.deHeroSplit}`}>
        <div className={styles.deHeroCopy}>
          <h1 className={styles.deTitle}>{category.title}</h1>
          <p className={styles.deSummary}>{category.summary}</p>
        </div>

        {category.heroImages[0] ? (
          <div className={styles.deHeroMedia}>
            <div className={styles.deHeroFrame}>
              <img
                className={styles.deHeroImage}
                src={category.heroImages[0]}
                alt={category.title}
              />
            </div>
          </div>
        ) : null}
      </header>

      <section className={styles.dePanel}>
        <div className={styles.deList}>
          {articles.map((article) => (
            <article key={article.href} className={styles.deCard}>
              {article.heroImages[0] ? (
                <div className={styles.deCardMedia}>
                  <img
                    className={styles.deCardImage}
                    src={article.heroImages[0]}
                    alt={article.title}
                  />
                </div>
              ) : null}

              <div className={styles.deCardContent}>
                <h2 className={styles.deCardTitle}>{article.title}</h2>
                <p className={styles.deCardText}>{article.summary}</p>
                <Link className={styles.deCardLink} href={article.href}>
                  Explore Service
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
