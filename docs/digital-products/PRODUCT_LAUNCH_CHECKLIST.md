# Product Launch Checklist

Run through this before flipping any product from `status: draft` to `status: published`.

## Content
- [ ] All 17 stages of `PRODUCT_DEVELOPMENT_FRAMEWORK.md` are genuinely complete, not stubbed.
- [ ] Every deliverable listed in `includes[]` actually exists in `digital-products/<slug>/`.
- [ ] At least one worked example exists per major component.
- [ ] `PRODUCT_QUALITY_STANDARD.md`'s seven questions all have real, specific answers.
- [ ] No fabricated claims, testimonials, scarcity, or guaranteed outcomes anywhere in the product or the page copy.
- [ ] `LICENSE.md` is written and matches the `license` field in frontmatter.

## Website
- [ ] Frontmatter passes `npm run build:content:check` with zero errors.
- [ ] `relatedArticles` / `relatedTools` slugs verified to exist and be published.
- [ ] Product page reviewed locally (`npm run build:content` then open the generated file) for broken sections, missing FAQ, or placeholder text left in.
- [ ] SEO fields (`seo.title`, `seo.description`) reviewed, not left to defaults if the defaults are generic.

## Commerce
- [ ] Checkout provider chosen and configured (`docs/store/CHECKOUT_ARCHITECTURE.md`) — `checkout.provider` and `checkout.url` are real, tested values, OR the team has explicitly decided to launch with the honest "coming soon" state for a defined transition period.
- [ ] Delivery mechanism decided and tested with a real end-to-end purchase (`docs/store/DIGITAL_DELIVERY.md`) before the first real customer pays.
- [ ] Price reviewed against `PRODUCT_PRICING_FRAMEWORK.md`.

## Support
- [ ] A feedback/support channel for buyers is live (existing `contact.html` at minimum).
- [ ] Someone is responsible for responding to buyer questions — named, not assumed.

## Post-launch
- [ ] `CHANGELOG.md` started in `digital-products/<slug>/`, even with just a "1.0 — initial release" entry.
- [ ] Analytics confirmed firing (`product_view`, `checkout_click`) by checking the Vercel Analytics dashboard after a manual test visit.
