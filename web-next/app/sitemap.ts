import type { MetadataRoute } from "next";
import { getAllArticles, CATEGORIES } from "@/lib/articles";

const SITE_URL = "https://www.robust-code.com";

// Only lists routes that actually exist on this migration branch (see
// web-next/README.md) — home, one proof-of-concept product page, and the
// natively-built /insights + /tools. The remaining ~21 pages join this list
// as they're migrated; this is Next's native app/sitemap.ts convention,
// replacing the hand-rolled scripts/build-content.mjs sitemap generation
// used by the static stack.
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const categoriesInUse = Object.keys(CATEGORIES).filter((c) => articles.some((a) => a.category === c));

  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/what-we-do/rc-core`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/insights`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/tools`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/tools/roi-calculator`, changeFrequency: "monthly", priority: 0.6 },
    ...categoriesInUse.map((c) => ({ url: `${SITE_URL}/insights/${c}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/insights/${a.category}/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly" as const,
      priority: a.featured ? 0.8 : 0.6,
    })),
  ];
}
