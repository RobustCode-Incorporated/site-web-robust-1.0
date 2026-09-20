# Store Roadmap

## Product pipeline (from the original spec — not all built now, by design)

1. **ROBUST PROJECT OS** — draft, in development. First product; see `content/products/projects/robust-project-os.md` and `digital-products/robust-project-os/`.
2. **ROBUST BUSINESS ANALYST OS** — not started.
3. **ROBUST SME DIGITALIZATION OS** — not started. Natural pairing with the existing `content/insights/belgium/e-invoicing-belgium-smes-2026.md` article and a future "SME Digitalization Assessment" tool.
4. **ROBUST AI AUTOMATION OS** — not started. Natural pairing with `content/insights/ai/ai-automation-sme-adoption-framework.md` and the existing Automation ROI Calculator.
5. **ROBUST SALES OS** — not started.
6. **ROBUST OPERATIONS OS** — not started. Natural pairing with `content/insights/business/crm-erp-fundamentals-smes.md`.

Each should follow the same two-track process: `docs/digital-products/PRODUCT_DEVELOPMENT_FRAMEWORK.md` for content, `docs/store/PRODUCT_CREATION_WORKFLOW.md` for the website side.

## Free lead magnets pipeline

- **Project Success Checklist** — live now (`tools/project-success-checklist/`), feeds ROBUST PROJECT OS.
- A "SME Digitalization Assessment" tool would feed ROBUST SME DIGITALIZATION OS the same way the ROI Calculator conceptually feeds ROBUST AI AUTOMATION OS.

## Architectural extensions not yet needed, but designed for

- **Bundles**: `bundleProducts` frontmatter field and rendering already exist (`category: "bundles"`); no bundle exists because fewer than two real products exist yet. Revisit once products 1 and 2 both ship.
- **Localized product pages**: the article `.fr.md` companion-file pattern (see `scripts/build-content.mjs`'s `loadArticles`) would extend to products with the same mechanism — a `<slug>.fr.md` file per product, a `fr/store/` output tree, hreflang tags. Not built because no French product copy exists; do not machine-translate product copy to fill this in artificially.
- **`/store/tech/`**: an extension point for a *future* phase covering affiliate products, branded merchandise, and business equipment (physical inventory commerce). Deliberately not scaffolded as a real route in this phase — an empty, unlinked category page would be exactly the kind of "automatically generated low-value page" the spec prohibits. When physical commerce is actually in scope, add `tech` to `PRODUCT_CATEGORIES` (or a parallel category set, if the physical/digital data models diverge enough to warrant it) the same way any other category is added.
- **Advertising / affiliate / sponsorship layers**: `content/config/ad-slots.json` (from the Phase 1 content engine) and the `AffiliateLink` disclosure pattern already exist and are inert. No change needed until a real partner exists.

## Explicitly out of scope for now

- Multi-currency pricing.
- Tax/VAT calculation (handled by whichever checkout provider is eventually chosen — not this site).
- Customer accounts / order history on this site (a static site has nowhere to store that; a provider's hosted customer portal, if any, covers this instead).
