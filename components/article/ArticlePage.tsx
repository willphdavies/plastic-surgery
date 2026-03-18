import Link from "next/link";
import type { Article } from "@/types/content";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import { WidgetRenderer } from "@/widgets/WidgetRenderer";
import styles from "./ArticlePage.module.css";

type ArticlePageProps = {
  article: Article;
};

export function ArticlePage({ article }: ArticlePageProps) {
  return (
    <article className={styles.deArticlePage}>
      <header className={`${styles.deHero} ${article.heroImages[0] ? styles.deHeroSplit : ""}`}>
        <div className={styles.deHeroCopy}>
          <h1 className={styles.deTitle}>{article.title}</h1>
          <p className={styles.deSummary}>{article.summary}</p>
        </div>

        {article.heroImages[0] ? (
          <div className={styles.deHeroMedia}>
            <div className={styles.deHeroImage}>
              <img className={styles.deImage} src={article.heroImages[0]} alt={article.title} />
            </div>
          </div>
        ) : null}
      </header>

      <div className={styles.deBody}>
        <section className={styles.dePanel}>
          <MarkdownContent content={article.content} />
        </section>

        <aside className={styles.deSidebar}>
          {article.widgets.map((widgetId) => (
            <div key={widgetId}>
              <WidgetRenderer widgetId={widgetId} />
            </div>
          ))}

          {article.relatedContent.length > 0 ? (
            <section className={styles.dePanel}>
              <h2>Related Content</h2>
              <div className={styles.deRelatedList}>
                {article.relatedContent.map((item) => (
                  <Link key={item.href} className={styles.deRelatedLink} href={item.href}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
