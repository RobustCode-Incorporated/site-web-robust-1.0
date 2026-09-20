# Product Pricing Framework

## Starting point

Price against the *outcome and time saved*, not against how long the product took to build or what a "prompt pack" nearby sells for. A system that replaces several hours of a founder's or consultant's time, repeatedly, across every project they run, is priced very differently from a one-off checklist.

## Rough bands (starting hypotheses, not fixed rules)

- **Free lead magnets** (single checklist, single tool): €0 — these exist to demonstrate quality and feed the funnel, not to generate direct revenue.
- **Focused single-system products** (e.g., ROBUST PROJECT OS): €39–€79 — a complete method for one specific job-to-be-done.
- **Comprehensive OS-level products** covering a full function (e.g., a complete Sales OS): €79–€149.
- **Bundles**: priced below the sum of included products' individual prices, but never with a fabricated "compare at" original price that wasn't a real, previously-offered price (`compareAtPrice` must be genuine or left null — see `docs/store/PRODUCT_FRONTMATTER.md`).

## How to pressure-test a price hypothesis

1. Would *you* pay this for the time it would save you on the next project you run? If you hesitate, the buyer will too.
2. Does the price match the depth actually delivered (see `PRODUCT_QUALITY_STANDARD.md`'s Deliverables section)? A checklist and a full system with worked examples should not be priced the same.
3. Is there a free tool or article that makes the paid product's value obvious before asking for payment? (See the funnel: Insights → Tools → Store.) If not, the price will feel unjustified regardless of the number.

## What this framework does not do

It does not set a final price — that's a business decision the team makes per product, informed by this reasoning. `price` in the frontmatter is a **hypothesis** until real buyers confirm it; revisit it after the first real launch using real signal (conversion rate, direct buyer feedback), not before.
