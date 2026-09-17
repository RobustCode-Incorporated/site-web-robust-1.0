import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, CATEGORIES } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const name = CATEGORIES[category];
  return {
    title: name || "Insights",
    description: `Articles on ${name} for Belgian SMEs, from ROBUST CODE.`,
    alternates: { canonical: `/insights/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const name = CATEGORIES[category];
  if (!name) notFound();
  const articles = getAllArticles().filter((a) => a.category === category);
  if (!articles.length) notFound();

  return (
    <main>
      <section className="section insights-index">
        <div className="container">
          <p className="eyebrow">Insights</p>
          <h1>{name}</h1>
          <ul className="article-grid">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
