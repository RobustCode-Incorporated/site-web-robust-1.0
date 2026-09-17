import type { Metadata } from "next";
import { getAllArticles, CATEGORIES } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical analysis on Belgian digitalization, AI adoption, automation and business operations from ROBUST CODE.",
  alternates: { canonical: "/insights" },
};

export default function InsightsIndexPage() {
  const articles = getAllArticles();
  const featured = articles.find((a) => a.featured);
  const categoriesInUse = Object.entries(CATEGORIES).filter(([slug]) =>
    articles.some((a) => a.category === slug)
  );

  return (
    <main>
      <section className="section insights-index">
        <div className="container">
          <p className="eyebrow">Insights</p>
          <h1>Business, AI &amp; digitalization for Belgian SMEs</h1>
          <p className="text-soft">
            Practical, non-fabricated analysis on operations, automation, AI adoption and Belgian digitalization —
            written for people who run businesses, not for search engines.
          </p>

          <nav className="insights-categories" aria-label="Categories">
            {categoriesInUse.map(([slug, name]) => (
              <Link key={slug} href={`/insights/${slug}`}>
                {name}
              </Link>
            ))}
          </nav>

          {featured && (
            <div className="featured-article">
              <Link href={`/insights/${featured.category}/${featured.slug}`}>
                <p className="eyebrow">Featured &middot; {CATEGORIES[featured.category]}</p>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
              </Link>
            </div>
          )}

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
