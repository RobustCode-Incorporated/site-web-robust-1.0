# Product Frontmatter Reference

File location: `content/products/<category>/<slug>.md`. The folder name must match the `category` field (the build script validates this, exactly like Insights articles).

```yaml
---
title: "ROBUST PROJECT OS"          # required
slug: "robust-project-os"           # optional — defaults to the filename
shortDescription: "..."             # required — one sentence, used on cards/breadcrumbs/OG
description: "..."                  # required — used as the meta description fallback
category: "projects"                # required — must be one of PRODUCT_CATEGORIES and match the folder
tags: ["project-management"]        # optional, used by store search
price: 49                           # required — number, no currency symbol
currency: "EUR"                     # required
compareAtPrice: null                # optional — do NOT fabricate a fake "was" price (spec §19)
status: "draft"                     # required — "draft" | "published" (no third state needed yet)
publishedAt: "2026-10-15"           # required once status is "published"; future date = scheduled
updatedAt: "2026-10-15"             # optional, defaults to publishedAt
featured: true                      # optional
coverImage: ""                      # optional, path under /assets/
problem: "..."                      # recommended — renders the "The problem" section
outcome: "..."                      # recommended — renders "What you can achieve"
audience: ["Founders", "..."]       # recommended — renders "Who it's for"
includes: ["Item 1", "Item 2"]      # recommended — renders "What you get" as a checklist
howItWorks: ["Step 1", "Step 2"]    # recommended — renders numbered "How it works"
requirements: ["A spreadsheet"]     # optional
format: ["PDF", "Templates"]        # optional, shown in store search / cards
delivery: "digital"                 # optional, defaults to "digital"
license: "single-user"              # optional, defaults to "single-user"
faq:                                # optional
  - question: "..."
    answer: "..."
bundleProducts: ["slug-a", "slug-b"] # only for category: "bundles" — lists other product slugs included
relatedProducts: ["other-slug"]     # optional — cross-sell, published products only are ever linked
relatedArticles: ["article-slug"]   # optional — must match a real content/insights slug
relatedTools: ["tool-slug"]         # optional — must match a slug in content/tools.json
seo:
  title: "..."                      # optional override
  description: "..."                # optional override
  canonical: "..."                  # optional override
checkout:
  provider: null                    # null until configured — see CHECKOUT_ARCHITECTURE.md
  productId: null
  url: null
---
```

## Validation rules enforced by `scripts/build-content.mjs`

- Required fields: `title`, `shortDescription`, `description`, `category`, `price`, `currency`, `status`.
- `category` must be a known key in `PRODUCT_CATEGORIES` and must match the containing folder.
- Slugs must be unique across the entire `content/products/` tree, not just within a category.
- A product is only ever rendered/sitemapped/JSON-LD'd when `status === "published"` **and** `publishedAt` is today or in the past. Anything else — including a typo'd status — is silently excluded, never partially exposed.

## Physical products (`productType: "physical"`)

Additional/different fields for a physical, supplier-fulfilled item (e.g. `category: "tech"`):

```yaml
productType: "physical"   # default is "digital" if omitted
images: ["/assets/images/..."]   # product photos, public
shippingEstimate: "5-9 business days"
sku: "RC-TECH-001"         # your own internal SKU — not the supplier's
```

`includes`, `howItWorks`, `license`, `delivery` are digital-product concepts and are skipped in the rendered page for `productType: "physical"` — use `problem`, `outcome`, `audience`, `faq` as normal.

**Never add a sourcing/cost field here** (`sourceUrl`, `amazonUrl`, `amazonAsin`, `costPrice`, `cost`, `supplierCost`, `margin`, `supplierUrl`) — `scripts/build-content.mjs` fails the build if it sees one, because this file is committed to a public repository. That data lives only in the `AMAZON_SOURCING_MAP` Vercel environment variable — see `docs/store/PHYSICAL_PRODUCTS_FULFILLMENT.md`.

## Fields intentionally NOT implemented yet

- Localized (`.fr.md`) product content — see `STORE_ROADMAP.md`.
- `bundlePrice` — no bundle exists yet; add it when the first bundle ships, following the same pattern as `price`/`currency`.
