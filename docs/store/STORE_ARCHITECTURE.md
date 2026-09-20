# Store Architecture

## Summary

The Store extends the existing static content engine (`scripts/build-content.mjs`) exactly the way Insights and Tools do — no new framework, no server, no database. Products are Markdown + frontmatter files under `content/products/<category>/<slug>.md`; the build script parses, filters (draft/scheduled excluded), and renders them to static HTML under `store/`.

## Why this design

The Phase 1 content engine already solved every hard problem the Store needs: draft/scheduled filtering, category pages that only exist when non-empty, a generated search index, sitemap integration, JSON-LD generation, and a shared page shell that guarantees visual parity with the rest of the site. Building the Store as a second content type inside the same script — rather than a separate system — means one build command, one validation command, and zero new deployment surface.

## Data flow

```
content/products/<category>/<slug>.md
        │  (gray-matter frontmatter + markdown body)
        ▼
loadProducts() in scripts/build-content.mjs
        │  filters: status === "published" AND publishedAt <= today
        ▼
publishedProducts[]
        │
        ├── renderProductPages()   → store/<category>/<slug>/index.html
        ├── renderStoreSection()   → store/index.html, store/<category>/index.html, store/index.json
        └── sitemapUrls            → sitemap.xml (published products only)
```

Draft or future-dated products are loaded (so validation can still catch frontmatter errors in them) but **never written to disk** — there is no HTML file to accidentally expose, no URL to leak, nothing to remember to `noindex`.

## Routes

- `/store/` — landing page. Renders a real product grid once products are published; renders an honest "coming soon" state (linking to Insights/Tools) when `publishedProducts.length === 0`, which is the case as of this phase (the first product, ROBUST PROJECT OS, is a draft).
- `/store/<category>/` — only generated for categories with at least one published product. Categories: `business`, `ai`, `operations`, `sales`, `finance`, `projects`, `productivity`, `templates`, `bundles` (see `PRODUCT_CATEGORIES` in `scripts/build-content.mjs`).
- `/store/<category>/<slug>/` — one product page. See `PRODUCT_FRONTMATTER.md` for the schema and `PRODUCT_CREATION_WORKFLOW.md` for how a new one gets added.
- `/store/index.json` — generated search index consumed by `assets/js/store-search.js` (same pattern as `assets/js/insights-search.js`).

## Design system reuse

No new visual language. Product pages reuse: `.section` / `.container` / `.eyebrow` / `.btn` / `.btn-primary` from `assets/css/styles.css`, and the Insights-era `.article-card` / `.article-grid` / `.breadcrumbs` / `.related-*` classes from `assets/css/insights.css`. Store-specific additions (`.product-page`, `.checkout-cta`, `.product-faq`, `.store-empty-state`, etc.) live in the same `insights.css` file rather than a new stylesheet, since every generated page already loads it.

## Bilingual scope (deliberate limitation)

Products are **English only** in this phase. The `.fr.md` companion-file pattern that powers bilingual Insights articles would extend cleanly to products later (see `docs/store/STORE_ROADMAP.md`), but no French product content exists yet, so none is faked. The store-wide EN/FR header pill falls back to linking to `/fr/insights/` from any English-only store page, rather than doing nothing (see the fix in `scripts/build-content.mjs`'s `renderPage` — the pill navigates to a real counterpart URL or a sane fallback, never a silent no-op).

## What is NOT built in this phase

- Real payment processing — see `CHECKOUT_ARCHITECTURE.md`.
- Automated file delivery to buyers — see `DIGITAL_DELIVERY.md`.
- Any published product — ROBUST PROJECT OS ships as `status: draft` intentionally.
- Bundle pricing logic beyond a static "this bundle includes" list — no bundle exists yet to price.
