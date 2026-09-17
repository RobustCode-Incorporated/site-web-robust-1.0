#!/usr/bin/env node
/**
 * Robust Code content build.
 *
 * Reads content/insights/**\/*.md (frontmatter + markdown), renders static
 * pages under insights/ and tools/ (English) and fr/insights/ (French, for
 * any article that has a companion <slug>.fr.md file), regenerates
 * sitemap.xml. Zero framework, zero server — output is plain HTML committed
 * like every other page on this site. Run: `npm run build:content` (add
 * --check to also validate).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const ROOT = process.cwd();
const CHECK = process.argv.includes("--check");
const SITE_URL = "https://www.robust-code.com";
const TODAY = new Date().toISOString().slice(0, 10);

const CATEGORIES = {
  en: {
    belgium: "Belgium",
    business: "Business",
    ai: "AI",
    automation: "Automation",
    operations: "Operations",
    "case-studies": "Case Studies",
  },
  fr: {
    belgium: "Belgique",
    business: "Business",
    ai: "IA",
    automation: "Automatisation",
    operations: "Opérations",
    "case-studies": "Études de cas",
  },
};

// Chrome (nav/footer) copy per language. Reuses the exact wording already
// used by assets/js/i18n.js's `fr` dictionary for the strings that overlap,
// so a French insights page reads consistently with the rest of the site.
const NAV = {
  en: {
    home: "Home", whatWeDo: "What We Do", ourWork: "Our Work", insights: "Insights", about: "About",
    tools: "Tools", news: "News", careers: "Careers", contact: "Contact Us",
    company: "Company", trust: "Trust &amp; Security", security: "Security", privacyProtection: "Privacy Protection",
    gdpr: "GDPR", support: "Support", legal: "Legal", legalNotice: "Legal Notice", privacyPolicy: "Privacy Policy",
    cookiePolicy: "Cookie Policy", termsUse: "Terms of Use", termsConditions: "Terms &amp; Conditions",
    rights: "All Rights Reserved", tagline: "Innovation at your fingertips",
  },
  fr: {
    home: "Accueil", whatWeDo: "Ce Que Nous Faisons", ourWork: "Nos Réalisations", insights: "Analyses", about: "À Propos",
    tools: "Outils", news: "Actualités", careers: "Carrières", contact: "Contactez-nous",
    company: "Entreprise", trust: "Confiance et Sécurité", security: "Sécurité", privacyProtection: "Protection de la vie privée",
    gdpr: "RGPD", support: "Support", legal: "Juridique", legalNotice: "Mentions légales", privacyPolicy: "Politique de confidentialité",
    cookiePolicy: "Politique de cookies", termsUse: "Conditions d'utilisation", termsConditions: "Conditions générales",
    rights: "Tous droits réservés", tagline: "L'innovation à portée de main",
  },
};

// Static in-page strings (not chrome) that need a French version.
const T = {
  en: {
    insightsEyebrow: "Insights",
    insightsHeading: "Business, AI &amp; digitalization for Belgian SMEs",
    insightsSubtitle: "Practical, non-fabricated analysis on operations, automation, AI adoption and Belgian digitalization &mdash; written for people who run businesses, not for search engines.",
    searchPlaceholder: "Search articles&hellip;",
    featured: "Featured",
    by: "By", published: "Published", updated: "Updated", minRead: "min read",
    relatedReading: "Related reading", freeTool: "Free tool",
    share: "Share:",
    newsletterTitle: "Get the next article by email",
    newsletterBody: "One practical piece a month on Belgian digitalization, AI adoption, and business operations. No spam, unsubscribe anytime.",
    newsletterNote: "Not wired to an email provider yet — this form does not send anywhere.",
    subscribe: "Subscribe",
    talkToUs: "Talk to us",
    readInFr: "Lire en français",
    readInEn: "Read in English",
    toolsEyebrow: "Tools", toolsHeading: "Free business tools",
    toolsSubtitle: "Useful on their own, no email required. Built by the same team that builds Robust Code products.",
  },
  fr: {
    insightsEyebrow: "Analyses",
    insightsHeading: "Business, IA et digitalisation pour les PME belges",
    insightsSubtitle: "Analyses pratiques et non fabriquées sur les opérations, l'automatisation, l'adoption de l'IA et la digitalisation en Belgique &mdash; écrites pour ceux qui dirigent des entreprises, pas pour les moteurs de recherche.",
    searchPlaceholder: "Rechercher des articles&hellip;",
    featured: "À la une",
    by: "Par", published: "Publié le", updated: "Mis à jour le", minRead: "min de lecture",
    relatedReading: "À lire aussi", freeTool: "Outil gratuit",
    share: "Partager :",
    newsletterTitle: "Recevez le prochain article par e-mail",
    newsletterBody: "Un article pratique par mois sur la digitalisation en Belgique, l'adoption de l'IA et les opérations d'entreprise. Pas de spam, désabonnement à tout moment.",
    newsletterNote: "Pas encore connecté à un fournisseur d'e-mail — ce formulaire n'envoie rien.",
    subscribe: "S'abonner",
    talkToUs: "Contactez-nous",
    readInFr: "Lire en français",
    readInEn: "Read in English",
    toolsEyebrow: "Outils", toolsHeading: "Outils gratuits pour entreprises",
    toolsSubtitle: "Utiles par eux-mêmes, sans inscription. Conçus par l'équipe qui construit les produits Robust Code.",
  },
};

const errors = [];
const fail = (msg) => errors.push(msg);

// ---------------------------------------------------------------------------
// Existing hand-maintained static pages (kept in sync with sitemap.xml as of
// this build system's introduction). Update this list if a new static page
// is added by hand outside the content engine.
// ---------------------------------------------------------------------------
const STATIC_PAGES = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/what-we-do.html", changefreq: "monthly", priority: "0.9" },
  { loc: "/our-work.html", changefreq: "monthly", priority: "0.9" },
  { loc: "/about.html", changefreq: "monthly", priority: "0.8" },
  { loc: "/news.html", changefreq: "weekly", priority: "0.7" },
  { loc: "/blog.html", changefreq: "monthly", priority: "0.4" },
  { loc: "/careers.html", changefreq: "monthly", priority: "0.6" },
  { loc: "/contact.html", changefreq: "monthly", priority: "0.8" },
  { loc: "/what-we-do/rc-core.html", changefreq: "monthly", priority: "0.7" },
  { loc: "/what-we-do/rc-data.html", changefreq: "monthly", priority: "0.7" },
  { loc: "/what-we-do/rc-xp.html", changefreq: "monthly", priority: "0.7" },
  { loc: "/what-we-do/rc-studio.html", changefreq: "monthly", priority: "0.7" },
  { loc: "/legal/notice.html", changefreq: "yearly", priority: "0.3" },
  { loc: "/legal/privacy-policy.html", changefreq: "yearly", priority: "0.3" },
  { loc: "/legal/terms-conditions.html", changefreq: "yearly", priority: "0.3" },
  { loc: "/legal/terms-use.html", changefreq: "yearly", priority: "0.3" },
  { loc: "/legal/cookie-policy.html", changefreq: "yearly", priority: "0.3" },
  { loc: "/trust/gdpr.html", changefreq: "yearly", priority: "0.3" },
  { loc: "/trust/privacy-protection.html", changefreq: "yearly", priority: "0.3" },
  { loc: "/trust/security.html", changefreq: "yearly", priority: "0.3" },
  { loc: "/trust/support.html", changefreq: "monthly", priority: "0.4" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (entry.name.endsWith(".md")) return [full];
    return [];
  });
}

function readingTime(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function esc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function writeFile(relPath, content) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

// ---------------------------------------------------------------------------
// Shared page shell — mirrors the head/header/menu-overlay/footer markup
// already duplicated across the site's 24 hand-written pages, so generated
// pages are visually and functionally identical (same CSS, same i18n/menu
// JS, same Vercel Analytics script). `depth` is the number of `../` needed
// to reach the repo root from the output file's directory. `lang` ('en' |
// 'fr') picks the nav/footer copy; `alternateLinks` adds hreflang tags.
// ---------------------------------------------------------------------------
function renderPage({ title, description, canonicalPath, ogImage, depth, bodyMain, jsonLd = [], lang = "en", alternateLinks = [] }) {
  const p = "../".repeat(depth);
  const nav = NAV[lang];
  const canonical = `${SITE_URL}${canonicalPath}`;
  const image = ogImage || `${SITE_URL}/assets/images/logo.png`;
  const ldBlocks = jsonLd
    .map((block) => `<script type="application/ld+json">${JSON.stringify(block)}</script>`)
    .join("");
  const hreflangTags = alternateLinks
    .map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${SITE_URL}${a.href}">`)
    .join("");
  const insightsHref = lang === "fr" ? `${p}fr/insights/index.html` : `${p}insights/index.html`;

  return `<!DOCTYPE html>
<html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="${esc(description)}"><title>${esc(title)}</title><link rel="canonical" href="${canonical}">${hreflangTags}<link rel="icon" type="image/png" href="/assets/images/logo.png"><link rel="apple-touch-icon" href="/assets/images/logo.png"><meta property="og:type" content="article"><meta property="og:url" content="${canonical}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${image}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${image}"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet"><script src="https://unpkg.com/lucide@1.34.0" integrity="sha384-TkyaYJPudUfB9a60ZTQjPXXxBGDxeXJy48PDE1DeZnOdKs/QdAs3pP/B9ApNJIH8" crossorigin="anonymous" defer></script><link rel="stylesheet" href="${p}assets/css/styles.css"><link rel="stylesheet" href="${p}assets/css/insights.css"><script defer src="/_vercel/insights/script.js"></script>${ldBlocks}
</head><body><header class="site-header" id="main-header">
    <div class="container nav-wrap">
      <a class="brand nav-logo" href="${p}index.html" aria-label="ROBUST CODE home">
        <img src="${p}assets/images/robust-logo-white.png" alt="ROBUST CODE" class="brand-logo" width="1920" height="1080" fetchpriority="high">
      </a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        <a href="${p}index.html">${nav.home}</a>
        <a href="${p}what-we-do.html">${nav.whatWeDo}</a>
        <a href="${p}our-work.html">${nav.ourWork}</a>
        <a href="${insightsHref}" class="is-active">${nav.insights}</a>
        <a href="${p}about.html">${nav.about}</a>
        <div class="lang-switch" role="group" aria-label="Language">
          <button type="button" class="lang-toggle" aria-haspopup="true" aria-expanded="false" aria-label="Change language">
            <i data-lucide="globe" class="lang-globe-icon"></i>
          </button>
          <div class="lang-options" role="menu">
            <button type="button" class="lang-btn" data-lang-toggle="en" aria-pressed="${lang === "en"}" role="menuitemradio">EN</button>
            <button type="button" class="lang-btn" data-lang-toggle="fr" aria-pressed="${lang === "fr"}" role="menuitemradio">FR</button>
          </div>
        </div>
      </nav>
      <button class="menu-burger" id="menu-burger" aria-label="Toggle menu" aria-expanded="false" aria-controls="menu-overlay">
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>
    </div>
  </header>

  <div class="menu-overlay" id="menu-overlay" aria-hidden="true" inert>
    <span class="menu-overlay-bg" aria-hidden="true"></span>
    <nav class="menu-overlay-nav" aria-label="Mobile navigation">
      <span class="mobile-link-mask"><a class="mobile-link" href="${p}index.html">${nav.home}</a></span>
      <span class="mobile-link-mask"><a class="mobile-link" href="${p}what-we-do.html">${nav.whatWeDo}</a></span>
      <span class="mobile-link-mask"><a class="mobile-link" href="${p}our-work.html">${nav.ourWork}</a></span>
      <span class="mobile-link-mask"><a class="mobile-link" href="${insightsHref}">${nav.insights}</a></span>
      <span class="mobile-link-mask"><a class="mobile-link" href="${p}about.html">${nav.about}</a></span>
    </nav>
    <div class="menu-overlay-footer">
      <div class="lang-switch" role="group" aria-label="Language">
        <button type="button" class="lang-toggle" aria-haspopup="true" aria-expanded="false" aria-label="Change language">
          <i data-lucide="globe" class="lang-globe-icon"></i>
        </button>
        <div class="lang-options" role="menu">
          <button type="button" class="lang-btn" data-lang-toggle="en" aria-pressed="${lang === "en"}" role="menuitemradio">EN</button>
          <button type="button" class="lang-btn" data-lang-toggle="fr" aria-pressed="${lang === "fr"}" role="menuitemradio">FR</button>
        </div>
      </div>
      <div class="menu-overlay-social" aria-label="Social media">
        <a href="https://www.instagram.com/robust_code/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i data-lucide="instagram"></i></a>
        <a href="https://x.com/RobustCode" target="_blank" rel="noopener noreferrer" aria-label="X"><i data-lucide="twitter"></i></a>
        <a href="https://www.linkedin.com/company/robustcodesarl" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i data-lucide="linkedin"></i></a>
      </div>
    </div>
  </div>

  <main>${bodyMain}</main>

  <footer class="site-footer" id="site-footer">
    <span class="footer-top-line" aria-hidden="true"></span>
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="footer-logo" href="${p}index.html" aria-label="ROBUST CODE home">
          <img src="${p}assets/images/robust-logo-white.png" alt="ROBUST CODE" class="brand-logo" width="1920" height="1080" loading="lazy">
        </a>
        <p class="footer-tagline">${nav.tagline}</p>
      </div>
      <div class="footer-column">
        <h2 class="footer-heading">${nav.company}</h2>
        <nav class="footer-nav" aria-label="Footer navigation">
          <a href="${p}news.html">${nav.news}</a>
          <a href="${insightsHref}">${nav.insights}</a>
          <a href="${p}tools/index.html">${nav.tools}</a>
          <a href="${p}careers.html">${nav.careers}</a>
          <a href="${p}contact.html">${nav.contact}</a>
        </nav>
      </div>
      <div class="footer-column">
        <h2 class="footer-heading">${nav.trust}</h2>
        <nav class="footer-nav" aria-label="Trust and security">
          <a href="${p}trust/security.html">${nav.security}</a>
          <a href="${p}trust/privacy-protection.html">${nav.privacyProtection}</a>
          <a href="${p}trust/gdpr.html">${nav.gdpr}</a>
          <a href="${p}trust/support.html">${nav.support}</a>
        </nav>
      </div>
      <div class="footer-column">
        <h2 class="footer-heading">${nav.legal}</h2>
        <nav class="footer-nav" aria-label="Legal">
          <a href="${p}legal/notice.html">${nav.legalNotice}</a>
          <a href="${p}legal/privacy-policy.html">${nav.privacyPolicy}</a>
          <a href="${p}legal/cookie-policy.html">${nav.cookiePolicy}</a>
          <a href="${p}legal/terms-use.html">${nav.termsUse}</a>
          <a href="${p}legal/terms-conditions.html">${nav.termsConditions}</a>
        </nav>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>&copy; 2024&ndash;<span id="year">2026</span> ROBUST CODE S.a.r.l &middot; ${nav.rights}</p>
    </div>
  </footer><script src="${p}assets/js/i18n.js" defer></script><script src="${p}assets/js/main.js" defer></script>
  <script src="${p}assets/js/vendor/gsap.min.js" defer></script>
  <script src="${p}assets/js/vendor/ScrollTrigger.min.js" defer></script>
  <script src="${p}assets/js/footer-animation.js" defer></script>
  <script src="${p}assets/js/nav-menu.js" defer></script>
  <script src="${p}assets/js/analytics-events.js" defer></script>
</body></html>`;
}

// ---------------------------------------------------------------------------
// Reusable content blocks (spec's "components" — plain HTML string builders,
// no framework available on this stack)
// ---------------------------------------------------------------------------
function productCTA(cta, lang) {
  if (!cta) return "";
  return `<aside class="cta-box" data-cta="product">
    <h3>${esc(cta.title)}</h3>
    <p>${esc(cta.description)}</p>
    <a class="btn btn-primary" href="${esc(cta.href)}" data-cta="product_click">${T[lang].talkToUs}</a>
  </aside>`;
}

function newsletterCTA(depth, lang) {
  const t = T[lang];
  return `<aside class="cta-box cta-newsletter" data-cta="newsletter">
    <h3>${t.newsletterTitle}</h3>
    <p>${t.newsletterBody}</p>
    <form class="newsletter-form" data-form-endpoint="" data-analytics="newsletter_signup">
      <label class="visually-hidden" for="newsletter-email">Email address</label>
      <input type="email" id="newsletter-email" name="email" placeholder="you@company.com" required>
      <input type="text" name="company_website" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button type="submit" class="btn btn-primary">${t.subscribe}</button>
    </form>
    <p class="cta-note">${t.newsletterNote}</p>
  </aside>`;
}

function langSwitchHtml(lang, counterpartHref) {
  if (!counterpartHref) return "";
  const label = lang === "en" ? T.en.readInFr : T.fr.readInEn;
  return `<p class="lang-switch-inline"><a href="${counterpartHref}">${label}</a></p>`;
}

function relatedArticlesBlock(current, all, depth, lang) {
  const p = "../".repeat(depth);
  const base = lang === "fr" ? "fr/insights" : "insights";
  const related = (current.relatedArticles || [])
    .map((slug) => all.find((a) => a.slug === slug))
    .filter(Boolean);
  const bySameCategory = related.length
    ? related
    : all.filter((a) => a.category === current.category && a.slug !== current.slug).slice(0, 3);
  if (!bySameCategory.length) return "";
  return `<section class="related-articles">
    <h2>${T[lang].relatedReading}</h2>
    <ul class="related-articles-list">
      ${bySameCategory
        .map((a) => `<li><a href="${p}${base}/${a.category}/${a.slug}/index.html">${esc(a.title)}</a></li>`)
        .join("")}
    </ul>
  </section>`;
}

function relatedToolsBlock(current, tools, depth, lang) {
  const p = "../".repeat(depth);
  const slugs = current.relatedTools || [];
  const matches = tools.filter((t) => slugs.includes(t.slug));
  if (!matches.length) return "";
  return `<section class="related-tools">
    <h2>${T[lang].freeTool}</h2>
    <ul class="related-tools-list">
      ${matches
        .map((t) => `<li><a href="${p}tools/${t.slug}/index.html" data-cta="cta_click">${esc(t.title)} — ${esc(t.description)}</a></li>`)
        .join("")}
    </ul>
  </section>`;
}

function breadcrumbHtml(items, depth) {
  const p = "../".repeat(depth);
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items
    .map((item, i) =>
      i === items.length - 1
        ? `<li aria-current="page">${esc(item.name)}</li>`
        : `<li><a href="${item.href.startsWith("http") ? item.href : p + item.href}">${esc(item.name)}</a></li>`
    )
    .join("")}</ol></nav>`;
}

// ---------------------------------------------------------------------------
// Load & parse articles (English default files + optional <slug>.fr.md
// companion translations). English and French are validated and filtered
// (draft/scheduled) independently, then rendered into separate URL trees:
// insights/... (English) and fr/insights/... (French).
// ---------------------------------------------------------------------------
function loadArticles(lang) {
  const files = walk(path.join(ROOT, "content/insights")).filter((f) =>
    lang === "fr" ? f.endsWith(".fr.md") : !f.endsWith(".fr.md")
  );
  const cats = CATEGORIES[lang];
  const seenSlugs = new Set();
  const list = [];

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf-8");
    const { data, content } = matter(raw);
    const rel = path.relative(path.join(ROOT, "content/insights"), file);
    const parts = rel.split(path.sep);
    const categoryFromPath = parts[0];
    const slug = lang === "fr" ? path.basename(file, ".fr.md") : path.basename(file, ".md");

    const required = ["title", "description", "publishedAt", "author", "category"];
    for (const field of required) {
      if (!data[field]) fail(`${rel}: missing required frontmatter field "${field}"`);
    }
    if (data.category && !cats[data.category]) {
      fail(`${rel}: unknown category "${data.category}" (expected one of ${Object.keys(cats).join(", ")})`);
    }
    if (data.category && data.category !== categoryFromPath) {
      fail(`${rel}: frontmatter category "${data.category}" does not match folder "${categoryFromPath}"`);
    }
    if (seenSlugs.has(slug)) fail(`Duplicate ${lang} article slug across categories: "${slug}"`);
    seenSlugs.add(slug);

    const isFuture = data.publishedAt && data.publishedAt > TODAY;
    const isDraft = Boolean(data.draft);

    list.push({
      slug,
      category: data.category || categoryFromPath,
      title: data.title,
      description: data.description,
      excerpt: data.excerpt || data.description,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt || data.publishedAt,
      author: data.author || { name: "Robust Code" },
      tags: data.tags || [],
      coverImage: data.coverImage || "",
      featured: Boolean(data.featured),
      published: !isDraft && !isFuture,
      seo: data.seo || {},
      relatedArticles: data.relatedArticles || [],
      relatedTools: data.relatedTools || [],
      cta: data.cta || null,
      readingTime: readingTime(content),
      bodyHtml: marked.parse(content),
    });
  }

  return list;
}

const articlesEnAll = loadArticles("en");
const articlesFrAll = loadArticles("fr");
const publishedEn = articlesEnAll.filter((a) => a.published).sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
const publishedFr = articlesFrAll.filter((a) => a.published).sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
const frBySlug = new Map(publishedFr.map((a) => [a.slug, a]));
const enBySlug = new Map(publishedEn.map((a) => [a.slug, a]));

const tools = JSON.parse(fs.readFileSync(path.join(ROOT, "content/tools.json"), "utf-8"));

// ---------------------------------------------------------------------------
// Render article pages (one language at a time; shared by EN + FR)
// ---------------------------------------------------------------------------
function renderArticlePages(lang, published, allForRelated) {
  const cats = CATEGORIES[lang];
  const base = lang === "fr" ? "fr/insights" : "insights";
  const counterpartMap = lang === "fr" ? enBySlug : frBySlug;
  const counterpartBase = lang === "fr" ? "insights" : "fr/insights";

  for (const article of published) {
    const outRel = `${base}/${article.category}/${article.slug}/index.html`;
    const depth = outRel.split("/").length - 1;
    const canonicalPath = article.seo.canonical || `/${base}/${article.category}/${article.slug}/`;
    const url = `${SITE_URL}${canonicalPath}`;
    const counterpart = counterpartMap.get(article.slug);
    const counterpartPath = counterpart ? `/${counterpartBase}/${counterpart.category}/${counterpart.slug}/` : null;

    const alternateLinks = [{ hreflang: lang, href: canonicalPath }];
    if (counterpart) {
      alternateLinks.push({ hreflang: lang === "fr" ? "en" : "fr", href: counterpartPath });
      alternateLinks.push({ hreflang: "x-default", href: lang === "fr" ? counterpartPath : canonicalPath });
    }

    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: lang,
        author: { "@type": "Organization", name: article.author.name },
        publisher: {
          "@type": "Organization",
          name: "ROBUST CODE",
          logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/images/logo.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: NAV[lang].home, item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: NAV[lang].insights, item: `${SITE_URL}/${base}/` },
          { "@type": "ListItem", position: 3, name: cats[article.category], item: `${SITE_URL}/${base}/${article.category}/` },
          { "@type": "ListItem", position: 4, name: article.title, item: url },
        ],
      },
    ];

    const t = T[lang];
    const bodyMain = `<article class="section article-page">
    <div class="container">
      ${breadcrumbHtml(
        [
          { name: NAV[lang].insights, href: `${base}/index.html` },
          { name: cats[article.category], href: `${base}/${article.category}/index.html` },
          { name: article.title, href: "#" },
        ],
        depth
      )}
      <p class="eyebrow">${esc(cats[article.category])}</p>
      <h1>${esc(article.title)}</h1>
      <p class="article-meta">
        ${t.by} ${esc(article.author.name)}${article.author.role ? `, ${esc(article.author.role)}` : ""}
        &middot; ${t.published} ${esc(article.publishedAt)}
        ${article.updatedAt !== article.publishedAt ? `&middot; ${t.updated} ${esc(article.updatedAt)}` : ""}
        &middot; ${article.readingTime} ${t.minRead}
      </p>
      ${langSwitchHtml(lang, counterpartPath)}
      <div class="article-body" data-analytics-article="${esc(article.slug)}">
        ${article.bodyHtml}
      </div>
      ${productCTA(article.cta, lang)}
      ${relatedToolsBlock(article, tools, depth, lang)}
      ${relatedArticlesBlock(article, allForRelated, depth, lang)}
      ${newsletterCTA(depth, lang)}
      <div class="share-row" data-analytics="article_share">
        <span>${t.share}</span>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer" data-cta="affiliate_click">LinkedIn</a>
        <a href="https://x.com/intent/tweet?url=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer">X</a>
      </div>
    </div>
  </article>`;

    writeFile(
      outRel,
      renderPage({
        title: article.seo.title || `${article.title} | ROBUST CODE Insights`,
        description: article.seo.description || article.description,
        canonicalPath,
        depth,
        bodyMain,
        jsonLd,
        lang,
        alternateLinks,
      })
    );
  }
}

renderArticlePages("en", publishedEn, publishedEn);
renderArticlePages("fr", publishedFr, publishedFr);

// ---------------------------------------------------------------------------
// /insights (+ /fr/insights) index + category pages + search index
// ---------------------------------------------------------------------------
const PAGE_SIZE = 12;
function articleCard(a, depth, lang) {
  const p = "../".repeat(depth);
  const base = lang === "fr" ? "fr/insights" : "insights";
  const cats = CATEGORIES[lang];
  return `<li class="article-card">
    <a href="${p}${base}/${a.category}/${a.slug}/index.html">
      <p class="eyebrow">${esc(cats[a.category])}</p>
      <h3>${esc(a.title)}</h3>
      <p>${esc(a.excerpt)}</p>
      <p class="article-card-meta">${esc(a.publishedAt)} &middot; ${a.readingTime} ${T[lang].minRead}</p>
    </a>
  </li>`;
}

function renderInsightsIndex(pageArticles, allPublished, pageNum, totalPages, depth, categoryFilterLabel, lang) {
  const p = "../".repeat(depth);
  const base = lang === "fr" ? "fr/insights" : "insights";
  const cats = CATEGORIES[lang];
  const t = T[lang];
  const featured = pageNum === 1 && !categoryFilterLabel ? allPublished.find((a) => a.featured) : null;
  const categoryNav = Object.entries(cats)
    .filter(([slug]) => allPublished.some((a) => a.category === slug))
    .map(([slug, name]) => `<a href="${p}${base}/${slug}/index.html">${esc(name)}</a>`)
    .join("");

  return `<section class="section insights-index">
    <div class="container">
      <p class="eyebrow">${t.insightsEyebrow}</p>
      <h1>${categoryFilterLabel ? esc(categoryFilterLabel) : t.insightsHeading}</h1>
      <p class="text-soft">${t.insightsSubtitle}</p>

      <div class="insights-search">
        <label class="visually-hidden" for="insights-search-input">Search articles</label>
        <input type="search" id="insights-search-input" placeholder="${t.searchPlaceholder}" data-insights-index="${p}${base}/index.json" data-insights-base="${p}">
        <ul id="insights-search-results" hidden></ul>
      </div>

      <nav class="insights-categories" aria-label="Categories">${categoryNav}</nav>

      ${
        featured
          ? `<div class="featured-article">
        <a href="${p}${base}/${featured.category}/${featured.slug}/index.html">
          <p class="eyebrow">${t.featured} &middot; ${esc(cats[featured.category])}</p>
          <h2>${esc(featured.title)}</h2>
          <p>${esc(featured.excerpt)}</p>
        </a>
      </div>`
          : ""
      }

      <ul class="article-grid">
        ${pageArticles.map((a) => articleCard(a, depth, lang)).join("")}
      </ul>

      ${
        totalPages > 1
          ? `<nav class="pagination" aria-label="Pagination">
        ${Array.from({ length: totalPages }, (_, i) => i + 1)
          .map((n) =>
            n === pageNum
              ? `<span aria-current="page">${n}</span>`
              : `<a href="${p}${base}/${n === 1 ? "" : `page/${n}/`}index.html">${n}</a>`
          )
          .join("")}
      </nav>`
          : ""
      }
    </div>
  </section>
  <script src="${p}assets/js/insights-search.js" defer></script>`;
}

function renderInsightsSection(lang, published) {
  const base = lang === "fr" ? "fr/insights" : "insights";
  const cats = CATEGORIES[lang];
  const totalPages = Math.max(1, Math.ceil(published.length / PAGE_SIZE));

  for (let n = 1; n <= totalPages; n++) {
    const pageArticles = published.slice((n - 1) * PAGE_SIZE, n * PAGE_SIZE);
    const outRel = n === 1 ? `${base}/index.html` : `${base}/page/${n}/index.html`;
    const depth = outRel.split("/").length - 1;
    writeFile(
      outRel,
      renderPage({
        title: n === 1 ? "Insights | ROBUST CODE" : `Insights — Page ${n} | ROBUST CODE`,
        description: T[lang].insightsSubtitle.replace(/&mdash;/g, "-"),
        canonicalPath: n === 1 ? `/${base}/` : `/${base}/page/${n}/`,
        depth,
        bodyMain: renderInsightsIndex(pageArticles, published, n, totalPages, depth, null, lang),
        jsonLd: [{ "@context": "https://schema.org", "@type": "WebSite", name: "ROBUST CODE Insights", url: `${SITE_URL}/${base}/` }],
        lang,
      })
    );
  }

  for (const [slug, name] of Object.entries(cats)) {
    const inCategory = published.filter((a) => a.category === slug);
    if (!inCategory.length) continue;
    const outRel = `${base}/${slug}/index.html`;
    const depth = outRel.split("/").length - 1;
    writeFile(
      outRel,
      renderPage({
        title: `${name} | ROBUST CODE Insights`,
        description: `${name} — ROBUST CODE Insights`,
        canonicalPath: `/${base}/${slug}/`,
        depth,
        bodyMain: renderInsightsIndex(inCategory, published, 1, 1, depth, name, lang),
        jsonLd: [],
        lang,
      })
    );
  }

  writeFile(
    `${base}/index.json`,
    JSON.stringify(
      published.map((a) => ({
        slug: a.slug,
        category: a.category,
        title: a.title,
        description: a.description,
        tags: a.tags,
        publishedAt: a.publishedAt,
        url: `${base}/${a.category}/${a.slug}/index.html`,
      })),
      null,
      2
    )
  );

  return totalPages;
}

const totalPagesEn = renderInsightsSection("en", publishedEn);
if (publishedFr.length) renderInsightsSection("fr", publishedFr);

// ---------------------------------------------------------------------------
// /tools (English only for now — see docs/content/CONTENT_STRATEGY.md)
// ---------------------------------------------------------------------------
writeFile(
  "tools/index.html",
  renderPage({
    title: "Free Business Tools | ROBUST CODE",
    description: "Free, no-signup-required calculators and assessments for SMEs — starting with the Automation ROI Calculator.",
    canonicalPath: "/tools/",
    depth: 1,
    bodyMain: `<section class="section">
      <div class="container">
        <p class="eyebrow">${T.en.toolsEyebrow}</p>
        <h1>${T.en.toolsHeading}</h1>
        <p class="text-soft">${T.en.toolsSubtitle}</p>
        <ul class="article-grid">
          ${tools
            .map(
              (t) => `<li class="article-card"><a href="tools/${t.slug}/index.html" style="margin-left:-1px"><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p></a></li>`
            )
            .join("")}
        </ul>
      </div>
    </section>`,
    jsonLd: [],
  })
);

writeFile(
  "tools/roi-calculator/index.html",
  renderPage({
    title: "Automation ROI Calculator | ROBUST CODE",
    description: "Estimate the payback period and annual savings of automating a manual, repetitive task in under a minute.",
    canonicalPath: "/tools/roi-calculator/",
    depth: 2,
    bodyMain: `<section class="section tool-page">
      <div class="container">
        <p class="eyebrow">Free tool</p>
        <h1>Automation ROI Calculator</h1>
        <p class="text-soft">Turn a rough estimate of time spent on a manual task into a payback estimate. No data leaves your browser.</p>

        <form id="roi-calculator-form" class="tool-form" data-analytics="tool_start">
          <label>Hours spent per week on the task
            <input type="number" id="roi-hours" min="0" step="0.5" value="5" required>
          </label>
          <label>Fully-loaded hourly cost of that time (&euro;)
            <input type="number" id="roi-hourly-cost" min="0" step="1" value="35" required>
          </label>
          <label>One-time / setup cost of automating it (&euro;)
            <input type="number" id="roi-setup-cost" min="0" step="50" value="1500" required>
          </label>
          <button type="submit" class="btn btn-primary">Calculate</button>
        </form>

        <div id="roi-result" class="tool-result" hidden data-analytics="tool_complete">
          <p><strong>Estimated annual savings:</strong> <span id="roi-annual-savings">&euro;0</span></p>
          <p><strong>Estimated payback period:</strong> <span id="roi-payback">&mdash;</span></p>
          <p class="cta-note">Rough estimate for planning purposes, not a guarantee — actual results depend on implementation quality and how consistently the task recurs.</p>
        </div>

        ${productCTA(
          {
            title: "Want help deciding if this is worth building?",
            description: "We'll give you an honest read on whether a given process is worth automating before you spend anything.",
            href: "/contact.html",
          },
          "en"
        )}
        ${newsletterCTA(2, "en")}
      </div>
    </section>
    <script src="../../assets/js/tools/roi-calculator.js" defer></script>`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Automation ROI Calculator",
        applicationCategory: "BusinessApplication",
        url: `${SITE_URL}/tools/roi-calculator/`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      },
    ],
  })
);

// ---------------------------------------------------------------------------
// sitemap.xml
// ---------------------------------------------------------------------------
function insightsSitemapEntries(lang, published) {
  const base = lang === "fr" ? "fr/insights" : "insights";
  const cats = CATEGORIES[lang];
  return [
    { loc: `/${base}/`, changefreq: "weekly", priority: "0.8" },
    ...Object.keys(cats)
      .filter((slug) => published.some((a) => a.category === slug))
      .map((slug) => ({ loc: `/${base}/${slug}/`, changefreq: "weekly", priority: "0.6" })),
    ...published.map((a) => ({
      loc: `/${base}/${a.category}/${a.slug}/`,
      changefreq: "monthly",
      priority: a.featured ? "0.8" : "0.6",
      lastmod: a.updatedAt,
    })),
  ];
}

const sitemapUrls = [
  ...STATIC_PAGES,
  { loc: "/tools/", changefreq: "monthly", priority: "0.7" },
  { loc: "/tools/roi-calculator/", changefreq: "monthly", priority: "0.6" },
  ...insightsSitemapEntries("en", publishedEn),
  ...(publishedFr.length ? insightsSitemapEntries("fr", publishedFr) : []),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ""}    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
writeFile("sitemap.xml", sitemapXml);

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
const draftCountEn = articlesEnAll.length - publishedEn.length;
const draftCountFr = articlesFrAll.length - publishedFr.length;
console.log(
  `Built ${publishedEn.length} EN article page(s) + ${publishedFr.length} FR article page(s), ${totalPagesEn} EN insights index page(s), 1 tool. ${draftCountEn} EN + ${draftCountFr} FR draft/scheduled article(s) excluded.`
);

if (errors.length) {
  console.error(`\n${errors.length} content error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  if (CHECK) process.exit(1);
}

if (CHECK) {
  // Basic internal-link check over generated article/index pages: every
  // relative href pointing at a local .html file must resolve on disk.
  const generated = [
    ...publishedEn.map((a) => path.join(ROOT, `insights/${a.category}/${a.slug}/index.html`)),
    ...publishedFr.map((a) => path.join(ROOT, `fr/insights/${a.category}/${a.slug}/index.html`)),
    path.join(ROOT, "insights/index.html"),
    ...(publishedFr.length ? [path.join(ROOT, "fr/insights/index.html")] : []),
  ];
  let brokenLinks = 0;
  for (const file of generated) {
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf-8");
    const hrefs = [...html.matchAll(/href="([^"]+\.html)"/g)].map((m) => m[1]);
    for (const href of hrefs) {
      if (href.startsWith("http") || href.startsWith("/")) continue;
      const resolved = path.join(path.dirname(file), href);
      if (!fs.existsSync(resolved)) {
        brokenLinks++;
        console.error(`  - broken internal link in ${path.relative(ROOT, file)}: ${href}`);
      }
    }
  }
  if (brokenLinks) {
    console.error(`\n${brokenLinks} broken internal link(s).`);
    process.exit(1);
  }
  console.log("Content check passed.");
}
