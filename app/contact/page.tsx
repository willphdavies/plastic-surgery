import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article/ArticlePage";
import { getArticleByHref } from "@/lib/content/content";

export default function Page() {
  const article = getArticleByHref("/contact");

  if (!article) {
    notFound();
  }

  return <ArticlePage article={article} />;
}
