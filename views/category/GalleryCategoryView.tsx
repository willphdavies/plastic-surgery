import Link from "next/link";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import type { Article, ArticleCategory } from "@/types/content";
import styles from "./CategoryView.module.css";

type GalleryCategoryViewProps = {
  category: ArticleCategory;
  articles: Article[];
};

export function GalleryCategoryView({
  category,
  articles,
}: GalleryCategoryViewProps) {
  return (
    <section className={styles.deCategoryView}>
      <header className={styles.deHero}>
        <h1 className={styles.deTitle}>{category.title}</h1>
        <p className={styles.deSummary}>{category.summary}</p>
      </header>

      <section className={styles.dePanel}>
        <MarkdownContent content={category.content} />
      </section>

      <section className={styles.dePanel}>
        <h2>Cases and Related Pages</h2>
        <div className={styles.deList}>
          {articles.map((article) => (
            <article key={article.href} className={styles.deCard}>
              <h3 className={styles.deCardTitle}>{article.title}</h3>
              <p className={styles.deCardText}>{article.summary}</p>
              <Link className={styles.deCardLink} href={article.href}>
                Review Related Content
              </Link>
            </article>
            ))}
          </div>
      </section>
    </section>
  );
}
