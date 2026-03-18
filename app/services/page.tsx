import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/category/CategoryPage";
import { getArticlesByCategorySlug, getCategoryBySlug } from "@/lib/content/content";

export default function Page() {
  const category = getCategoryBySlug("services");

  if (!category) {
    notFound();
  }

  return <CategoryPage category={category} articles={getArticlesByCategorySlug(category.slug)} />;
}
