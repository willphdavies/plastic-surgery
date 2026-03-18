import Link from "next/link";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import type { Article, ArticleCategory } from "@/types/content";
import { WidgetRenderer } from "@/widgets/WidgetRenderer";
import styles from "./CategoryView.module.css";

type DefaultCategoryViewProps = {
  category: ArticleCategory;
  articles: Article[];
};

export function DefaultCategoryView({
  category,
  articles,
}: DefaultCategoryViewProps) {
  return (
    <section className={styles.deCategoryView}>
      <header className={styles.deHero}>
        <h1 className={styles.deTitle}>{category.title}</h1>
        <p className={styles.deSummary}>{category.summary}</p>
      </header>

      <div className={styles.deBody}>
        <section className={styles.dePanel}>
          <MarkdownContent content={category.content} />
        </section>

        <section className={styles.dePanel}>
          <h2>Pages</h2>
          <div className={styles.deList}>
            {articles.map((article) => (
              <article key={article.href} className={styles.deCard}>
                <h3 className={styles.deCardTitle}>{article.title}</h3>
                <p className={styles.deCardText}>{article.summary}</p>
                <Link className={styles.deCardLink} href={article.href}>
                  View Page
                </Link>
              </article>
            ))}
          </div>
        </section>

        {category.widgets.length > 0 ? (
          <aside className={styles.deWidgetRail}>
            {category.widgets.map((widgetId) => (
              <div key={widgetId}>
                <WidgetRenderer widgetId={widgetId} />
              </div>
            ))}
          </aside>
        ) : null}
      </div>
    </section>
  );
}
