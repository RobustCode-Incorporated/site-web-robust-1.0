# Product Creation Workflow (Website Side)

This is the *website* workflow — how a product goes from an idea to a live page. For the *product content* workflow (writing the actual system), see `docs/digital-products/PRODUCT_DEVELOPMENT_FRAMEWORK.md`. The two run in parallel: a product isn't ready for either until both are done.

1. **Develop the product content** in `digital-products/<slug>/` following `PRODUCT_DEVELOPMENT_FRAMEWORK.md`. Do this before writing the website page — the page describes a real, finished (or at least reviewed-draft) system, not a promise.
2. **Create the frontmatter file** at `content/products/<category>/<slug>.md` following `PRODUCT_FRONTMATTER.md`. Set `status: draft` — always start here.
3. **Write the page body** (problem, includes, howItWorks, audience, outcome, faq) honestly, per `docs/digital-products/PRODUCT_QUALITY_STANDARD.md` — no fabricated claims, no fake urgency, no invented testimonials.
4. **Set `relatedArticles` / `relatedTools`** to real, already-published slugs. Verify the slugs exist — `npm run build:content:check` will not catch a typo'd related-content slug (it only validates required fields and internal link resolution on generated pages), so check by hand against `content/insights/` and `content/tools.json`.
5. **Run `npm run build:content`** and review the generated page locally. A draft product still renders to disk during a local dry run only if you temporarily flip `status` — don't commit that flip until step 7.
6. **Human review** — required, no exceptions, especially for price, license terms, and any claim. This is not a formality; it's the entire reason `status` defaults to `draft`.
7. **Set `status: published`** and a real `publishedAt` date (today, or a future date to schedule it — the existing `content-scheduled-publish.yml` GitHub Action already picks up scheduled *articles* daily; it currently does not check products, so add products to that workflow's scope if you rely on scheduled publish dates rather than same-day publishing).
8. **Configure checkout** (`CHECKOUT_ARCHITECTURE.md`) before or immediately after publishing — a published product with no checkout configured still shows the honest "coming soon" button, which is acceptable as a short transitional state but shouldn't be the permanent one.
9. **Commit and push** — `main` deploys automatically via the existing Vercel integration, exactly like every other content change on this site.

## Adding a new category

If a product doesn't fit `business | ai | operations | sales | finance | projects | productivity | templates | bundles`, add the new key + display name to `PRODUCT_CATEGORIES` in `scripts/build-content.mjs`. The category page is generated automatically once at least one published product uses it — no other change needed.
