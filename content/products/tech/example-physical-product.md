---
title: "Example Physical Product (template — replace before use)"
slug: "example-physical-product"
shortDescription: "Placeholder short description — one sentence, what the item is."
description: "Placeholder full description. Replace every field in this file with the real product's information before setting status to \"published\". See docs/store/PHYSICAL_PRODUCTS_FULFILLMENT.md for the full workflow, including where the Amazon sourcing link and cost price actually live (never in this file)."
category: "tech"
productType: "physical"
tags:
  - example
price: 0
currency: "EUR"
status: "draft"
publishedAt: null
featured: false
images: []
shippingEstimate: "5-9 business days"
sku: ""
problem: ""
outcome: ""
audience: []
faq: []
relatedProducts: []
relatedArticles: []
relatedTools: []
seo:
  title: ""
  description: ""
checkout:
  provider: null
  productId: null
  url: null
---

This file is a **template**, not a real product — `status: draft` and `price: 0` on purpose. Copy it to a new slug when a real product is ready, following `docs/store/PHYSICAL_PRODUCTS_FULFILLMENT.md`'s checklist:

1. Fill in every field above with the real product's public-facing information (title, description, price, images, shipping estimate).
2. Create a Stripe Payment Link for this product in the Stripe Dashboard, and put its URL in `checkout.url` (`checkout.provider: "stripe"`).
3. Add the product's **private** sourcing info (Amazon link, cost price) to the `AMAZON_SOURCING_MAP` environment variable in Vercel — never to this file. Key it by this file's `slug`.
4. Set `status: "published"` and a real `publishedAt` date only after the above is done and reviewed.
