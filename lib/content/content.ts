import { articles, categories, widgetDefinitions } from "@/lib/content/content-data";
import type { Article, ArticleCategory, WidgetDefinition } from "@/types/content";

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticleByHref(href: string): Article | undefined {
  return articles.find((article) => article.href === href);
}

export function getArticlesByCategorySlug(categorySlug: string): Article[] {
  return articles.filter((article) => article.categorySlug === categorySlug);
}

export function getFeaturedArticlesByCategorySlug(categorySlug: string): Article[] {
  return articles.filter(
    (article) => article.categorySlug === categorySlug && article.featured,
  );
}

export function getCategoryBySlug(slug: string): ArticleCategory | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getWidgetById(id: WidgetDefinition["id"]): WidgetDefinition | undefined {
  return widgetDefinitions.find((widget) => widget.id === id);
}

export function getWidgetDefinitions(ids: WidgetDefinition["id"][]): WidgetDefinition[] {
  return ids.map((id) => getWidgetById(id)).filter(Boolean) as WidgetDefinition[];
}

export function getBlogArticleByCategoryAndSlug(categorySlug: string, slug: string) {
  const article = getArticleBySlug(slug);
  if (!article || article.categorySlug !== categorySlug) {
    return undefined;
  }
  return article;
}
