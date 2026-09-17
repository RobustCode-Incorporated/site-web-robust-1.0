import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// Reads from the SAME content/ directory Track A (the static build script,
// scripts/build-content.mjs at the repo root) uses — one content source for
// both stacks, authored once. web-next/ lives inside the same repo, so this
// is simply one level up.
const CONTENT_DIR = path.join(process.cwd(), "..", "content", "insights");
const TOOLS_JSON = path.join(process.cwd(), "..", "content", "tools.json");

export const CATEGORIES: Record<string, string> = {
  belgium: "Belgium",
  business: "Business",
  ai: "AI",
  automation: "Automation",
  operations: "Operations",
  "case-studies": "Case Studies",
};

export type Article = {
  slug: string;
  category: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  author: { name: string; role?: string };
  tags: string[];
  featured: boolean;
  readingTime: number;
  bodyHtml: string;
  seo: { title?: string; description?: string; canonical?: string };
  relatedArticles: string[];
  relatedTools: string[];
  cta: { title: string; description: string; href: string } | null;
};

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (entry.name.endsWith(".md")) return [full];
    return [];
  });
}

function readingTime(md: string) {
  const words = md.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

let cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (cache) return cache;
  const today = new Date().toISOString().slice(0, 10);
  const files = walk(CONTENT_DIR);
  const articles: Article[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf-8");
    const { data, content } = matter(raw);
    const isFuture = data.publishedAt && data.publishedAt > today;
    if (data.draft || isFuture) continue; // same rule as the static build: never emit drafts/scheduled

    articles.push({
      slug: path.basename(file, ".md"),
      category: data.category,
      title: data.title,
      description: data.description,
      excerpt: data.excerpt || data.description,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt || data.publishedAt,
      author: data.author || { name: "Robust Code" },
      tags: data.tags || [],
      featured: Boolean(data.featured),
      readingTime: readingTime(content),
      bodyHtml: marked.parse(content) as string,
      seo: data.seo || {},
      relatedArticles: data.relatedArticles || [],
      relatedTools: data.relatedTools || [],
      cta: data.cta || null,
    });
  }

  cache = articles.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return cache;
}

export function getArticle(category: string, slug: string): Article | undefined {
  return getAllArticles().find((a) => a.category === category && a.slug === slug);
}

export function getTools(): { slug: string; title: string; description: string; category: string }[] {
  return JSON.parse(fs.readFileSync(TOOLS_JSON, "utf-8"));
}
