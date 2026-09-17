import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllArticles, getArticle, getTools, CATEGORIES } from "@/lib/articles";

const SITE_URL = "https://www.robust-code.com";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  return {
    title: article.seo.title || article.title,
    description: article.seo.description || article.description,
    alternates: { canonical: `/insights/${article.category}/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();

  const url = `${SITE_URL}/insights/${article.category}/${article.slug}`;
  const allArticles = getAllArticles();
  const tools = getTools();
  const related = (article.relatedArticles.length
    ? article.relatedArticles.map((slug) => allArticles.find((a) => a.slug === slug)).filter(Boolean)
    : allArticles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3)
  ) as typeof allArticles;
  const relatedTools = tools.filter((t) => article.relatedTools.includes(t.slug));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: { "@type": "Organization", name: article.author.name },
      publisher: { "@type": "Organization", name: "ROBUST CODE", logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/images/logo.png` } },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE_URL}/insights` },
        { "@type": "ListItem", position: 3, name: CATEGORIES[article.category], item: `${SITE_URL}/insights/${article.category}` },
        { "@type": "ListItem", position: 4, name: article.title, item: url },
      ],
    },
  ];

  return (
    <main>
      <article className="section article-page">
        <div className="container">
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href={`/insights/${article.category}`}>{CATEGORIES[article.category]}</Link></li>
              <li aria-current="page">{article.title}</li>
            </ol>
          </nav>

          <p className="eyebrow">{CATEGORIES[article.category]}</p>
          <h1>{article.title}</h1>
          <p className="article-meta">
            By {article.author.name}
            {article.author.role ? `, ${article.author.role}` : ""} &middot; Published {article.publishedAt}
            {article.updatedAt !== article.publishedAt ? ` · Updated ${article.updatedAt}` : ""} &middot; {article.readingTime} min read
          </p>

          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />

          {article.cta && (
            <aside className="cta-box">
              <h3>{article.cta.title}</h3>
              <p>{article.cta.description}</p>
              <Link className="btn btn-primary" href={article.cta.href}>Talk to us</Link>
            </aside>
          )}

          {relatedTools.length > 0 && (
            <section className="related-tools">
              <h2>Free tool</h2>
              <ul className="related-tools-list">
                {relatedTools.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}`}>{t.title} — {t.description}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section className="related-articles">
              <h2>Related reading</h2>
              <ul className="related-articles-list">
                {related.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/insights/${a.category}/${a.slug}`}>{a.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
