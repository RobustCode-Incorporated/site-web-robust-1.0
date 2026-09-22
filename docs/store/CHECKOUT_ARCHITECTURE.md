# Checkout Architecture

## What exists today

Every product has a `checkout` object in its frontmatter:

```yaml
checkout:
  provider: null
  productId: null
  url: null
```

`scripts/build-content.mjs`'s `checkoutCTA()` function checks this at build time:

- **If `provider` and `url` are both set** → renders a real `<a>` link (styled as the primary CTA) pointing at `checkout.url`, tagged `data-cta="checkout_click"` for analytics. This is expected to be a **hosted checkout page** (e.g., a Stripe Payment Link, Gumroad, Lemon Squeezy checkout URL) — not a form this site posts to.
- **If either is missing** → renders a visibly disabled button (`.checkout-cta.is-disabled`, `disabled`, `aria-disabled="true"`) reading "€price — Coming soon — checkout not yet configured". It is not a link, not clickable, and fires no analytics event. This is the current state for every product, including ROBUST PROJECT OS.

This satisfies the explicit requirement: **never fake a working checkout.**

## Why no payment backend was built

This repository is a static site with no server component and no deployment pipeline for one (see `docs/content/` for the equivalent reasoning about the content engine generally). Building custom payment handling here would mean:

- Storing or proxying card data (a PCI-DSS liability this project has no infrastructure to support responsibly).
- Inventing a webhook receiver with nowhere for it to run.
- Introducing exactly the kind of framework/backend dependency the brief explicitly rules out.

## The intended future integration

When a checkout provider is chosen, the change is additive and small:

1. Pick a **hosted checkout** provider that requires no backend code on this site: Stripe Payment Links, Gumroad, or Lemon Squeezy are the three that fit a static site cleanly.
2. Create the product on that provider's dashboard (this is where the real price, tax handling, and payment methods are configured — not in this repository).
3. Set `checkout.provider` (e.g. `"stripe"`), `checkout.productId` (the provider's product/price ID, for reference and future reconciliation), and `checkout.url` (the hosted checkout link) in the product's frontmatter.
4. Rebuild (`npm run build:content`) — the product page now shows a real, working "Get the system" button. No other code changes needed.

## Secrets

No API key, secret, or webhook signing secret should ever be committed to this repository. A hosted checkout **link** is not a secret (it's meant to be public), which is exactly why this approach needs zero secret management on the static site's side. If a future phase needs to *verify* a purchase (for automated delivery — see `DIGITAL_DELIVERY.md`), that verification must live in a separate, small backend (e.g., a Vercel Serverless Function or a provider's built-in post-purchase automation), never in this static repository.

## Update: a real webhook now exists, for one specific purpose

For physical (`productType: "physical"`) products, a real Stripe integration exists: `api/stripe-webhook.js`, a Vercel Serverless Function — the only backend code in this repository. It does not process payments itself (Stripe's hosted Payment Link handles that entirely); it only listens for the `checkout.session.completed` event afterward and notifies a human to fulfill the order. See `docs/store/PHYSICAL_PRODUCTS_FULFILLMENT.md` for the full setup. This does not change anything above for digital products, which still use the fully inert `checkout.provider/url` placeholder until a provider is configured for them too.

## What still requires configuration (explicit, not implied)

- No digital product has a checkout provider configured yet.
- For physical products: the Stripe Payment Link, webhook endpoint, and all environment variables (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `AMAZON_SOURCING_MAP`, `FULFILLMENT_NOTIFY_WEBHOOK_URL`) must be set up per `docs/store/PHYSICAL_PRODUCTS_FULFILLMENT.md` before any real sale.
- No real price has been charged or is chargeable today.
