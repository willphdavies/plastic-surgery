import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article/ArticlePage";
import { getArticleByHref } from "@/lib/content/content";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleByHref(`/services/${slug}`);

  if (!article) {
    notFound();
  }

  return <ArticlePage article={article} />;
}
