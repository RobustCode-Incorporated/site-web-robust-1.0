import Link from "next/link";
import { Article, CATEGORIES } from "@/lib/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <li className="article-card">
      <Link href={`/insights/${article.category}/${article.slug}`}>
        <p className="eyebrow">{CATEGORIES[article.category]}</p>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <p className="article-card-meta">
          {article.publishedAt} &middot; {article.readingTime} min read
        </p>
      </Link>
    </li>
  );
}
