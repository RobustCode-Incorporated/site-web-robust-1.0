# Product Creation Meta-Prompt

A reusable prompt for briefing an AI agent (or a human) to develop a new Robust Code digital product from scratch. Paste the block below, filling in `<TOPIC>`, before starting work on a new product.

---

```
You are developing a new Robust Code digital product about: <TOPIC>.

Robust Code sells systems, not prompt collections. A system pairs a real
methodology with the templates, checklists, prompts and examples needed to
actually use it. Do not produce a list of AI prompts and call it a product.

Work through these steps, in order, producing real content at each step —
not placeholders, not "TODO: fill in later":

1. Identify the specific, expensive, or painful problem this solves.
2. Define the buyer: a named role, not "entrepreneurs" in the abstract.
3. Define the desired outcome: what the buyer can concretely do afterward.
4. Design the methodology: why this approach works, not just what to do.
5. Design the workflow: the ordered stages of the system.
6. Build the system: name and describe every component.
7. Write the prompts: only where an AI assistant genuinely accelerates a
   step, each one following the structured Prompt format (see
   docs/digital-products/PRODUCT_TEMPLATE.md) — Purpose, Use when, Inputs,
   Optional context, Prompt, Expected output, Quality check, Next step.
8. Build the templates: actual fillable documents, not descriptions of them.
9. Build the checklists: specific enough that two people would agree
   whether an item is done.
10. Write worked examples: fictional but plausible scenarios, never a real
    identifiable client without permission.
11. Define validation: how a buyer can tell, on their own, whether the
    system worked for them.
12. Package everything into digital-products/<slug>/ following
    docs/digital-products/PRODUCT_TEMPLATE.md's structure.
13. Draft the product page: content/products/<category>/<slug>.md
    frontmatter + body, per docs/store/PRODUCT_FRONTMATTER.md. Set
    status: draft. Never set it to published.
14. Propose a pricing hypothesis using docs/digital-products/
    PRODUCT_PRICING_FRAMEWORK.md — state it as a hypothesis, not a
    final decision.
15. Propose a free lead magnet: a genuinely useful, smaller free resource
    that connects to this product (see the existing Project Success
    Checklist → ROBUST PROJECT OS pairing for the pattern).
16. Propose related SEO content: 1-2 Insights article topics this product
    would naturally support, per docs/content/CONTENT_STRATEGY.md's
    "legitimate progression" rule (problem → education → tool → system).
17. Propose relatedTools and relatedArticles slugs — real, existing ones
    only. Do not invent slugs that don't exist in the repository.
18. Propose one upsell or bundle opportunity, if a genuine one exists.
    Do not force one.
19. Draft LICENSE.md using the baseline in
    docs/digital-products/PRODUCT_TEMPLATE.md.
20. Perform a final quality audit against every question in
    docs/digital-products/PRODUCT_QUALITY_STANDARD.md before declaring
    the draft ready for human review.

Absolutely prohibited, at every step:
- Fabricated claims, statistics, or results.
- Fabricated testimonials, reviews, or user counts.
- Fake data presented as real.
- Fake urgency or scarcity.
- Copied copyrighted material from another creator's course, product, or
  framework.
- Shallow prompt collections presented as a "system."
- Unnecessary complexity that doesn't serve the buyer's actual outcome.

Output two separate deliverables:

PRODUCT/ (digital-products/<slug>/)
  PRODUCT_SPEC.md, README.md, CUSTOMER_GUIDE.md, PROMPTS/, TEMPLATES/,
  CHECKLISTS/, EXAMPLES/, QA/, LICENSE.md, CHANGELOG.md

WEBSITE/ (content/products/<category>/<slug>.md, plus notes)
  product frontmatter, product page copy, SEO metadata, related article
  recommendations, related tool recommendations, CTA copy, pricing
  hypothesis

Stop and flag for human review before setting status to anything other
than draft, and before any claim touching legal, financial, or regulatory
matters is included.
```
