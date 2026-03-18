import type { ComponentType } from "react";
import type { Article, ArticleCategory, CategoryType } from "@/types/content";
import { BlogCategoryView } from "@/views/category/BlogCategoryView";
import { DefaultCategoryView } from "@/views/category/DefaultCategoryView";
import { GalleryCategoryView } from "@/views/category/GalleryCategoryView";
import { ServiceCategoryView } from "@/views/category/ServiceCategoryView";

type CategoryPageProps = {
  category: ArticleCategory;
  articles: Article[];
};

const viewMap: Record<
  CategoryType,
  ComponentType<{ category: ArticleCategory; articles: Article[] }>
> = {
  service: ServiceCategoryView,
  gallery: GalleryCategoryView,
  blog: BlogCategoryView,
};

export function CategoryPage({ category, articles }: CategoryPageProps) {
  const View = viewMap[category.categoryType] ?? DefaultCategoryView;
  return <View category={category} articles={articles} />;
}
