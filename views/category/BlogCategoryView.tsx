import Link from "next/link";
import type { Article, ArticleCategory } from "@/types/content";
import styles from "./CategoryView.module.css";

type BlogCategoryViewProps = {
  category: ArticleCategory;
  articles: Article[];
};

export function BlogCategoryView({
  category,
  articles,
}: BlogCategoryViewProps) {
  return (
    <section className={styles.deCategoryView}>
      <header className={styles.deHero}>
        <h1 className={styles.deTitle}>{category.title}</h1>
        <p className={styles.deSummary}>{category.summary}</p>
      </header>

      <section className={styles.dePanel}>
        <div className={styles.deList}>
          {articles.map((article) => (
            <article key={article.href} className={styles.deCard}>
              <h2 className={styles.deCardTitle}>{article.title}</h2>
              <p className={styles.deCardText}>{article.summary}</p>
              <Link className={styles.deCardLink} href={article.href}>
                Read Article
              </Link>
            </article>
            ))}
          </div>
      </section>
    </section>
  );
}
