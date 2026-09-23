# Physical Products & Semi-Automated Fulfillment

## Why this exists, and why it's *semi*-automated

Robust Code wants to sell physical items sourced from a third-party retailer (e.g. Amazon) at a markup, shipped to the end customer. The tempting version — "when Stripe gets paid, a bot automatically buys the item on Amazon and ships it to the customer" — is **not implemented, and should not be**, because:

- Amazon's Conditions of Use prohibit automated/bot purchasing on amazon.com without their explicit permission. There is no public Amazon API for placing arbitrary retail orders on behalf of a third party for resale. Building this would put the Amazon account purchasing on it at real risk of suspension.
- It removes the human check that catches price changes, stock-outs, and shipping-address problems before money is spent.

What's actually built is the **semi-automated** version: everything up to and after the human's one manual action (placing the order with the supplier) is automated.

```
Customer pays on Stripe Checkout (hosted, from a Payment Link)
        │
        ▼
Stripe sends a "checkout.session.completed" webhook
        │
        ▼
api/stripe-webhook.js (Vercel Serverless Function — the only backend in this repo)
  - verifies the webhook is really from Stripe
  - looks up the private sourcing info for the product that was bought
  - sends a formatted order notification (Slack/Discord/Zapier/etc. — your choice)
        │
        ▼
A HUMAN places the real order with the supplier (e.g. Amazon), by hand
        │
        ▼
(Not yet built) — marking the order fulfilled + emailing the customer a
tracking number. See "What's NOT built yet" below.
```

## Setup checklist (all of this happens outside this repository)

### 1. Create the product on the website
Copy `content/products/tech/example-physical-product.md` to a new slug, fill in every field with real public-facing info (title, description, price, images, shipping estimate), keep `status: "draft"` until everything below is done. See `docs/store/PRODUCT_FRONTMATTER.md` for field-by-field detail (physical-specific fields: `productType: "physical"`, `images`, `shippingEstimate`, `sku`).

**Never add an Amazon link or cost price to this file.** This repository is public on GitHub — anything committed here is visible to anyone, including customers and competitors. `scripts/build-content.mjs` actively fails the build if it detects a field like `sourceUrl`, `amazonUrl`, `costPrice`, etc. in any product file, specifically to catch this mistake.

### 2. Create a Stripe Payment Link
In the Stripe Dashboard: Payment Links -> New. Set the price to match the frontmatter `price`. Under "Collect customer information," enable shipping address collection. Under "Advanced options" or the API equivalent, **set metadata `slug` = the product's slug** (e.g. `example-physical-product`) — this is how the webhook knows which product was bought and which sourcing entry to use. Copy the resulting payment link URL into the product's `checkout.url` (`checkout.provider: "stripe"`).

### 3. Add the private sourcing entry
In Vercel Project Settings -> Environment Variables, edit `AMAZON_SOURCING_MAP` (create it if it doesn't exist — see format below). Add an entry keyed by the product's slug.

```json
{
  "example-physical-product": {
    "sourceUrl": "https://www.amazon.com/dp/XXXXXXXXXX",
    "costPrice": 18.50
  }
}
```

This variable is only ever read server-side by `api/stripe-webhook.js`. It is never bundled into the static site, never sent to the browser, never committed to git.

### 4. Configure the Stripe webhook endpoint
Stripe Dashboard -> Developers -> Webhooks -> Add endpoint. URL: `https://www.robust-code.com/api/stripe-webhook`. Event to send: `checkout.session.completed`. Stripe will show a signing secret (starts `whsec_`) — put it in Vercel as `STRIPE_WEBHOOK_SECRET`.

### 5. Set the remaining environment variables (Vercel Project Settings)
- `STRIPE_SECRET_KEY` — your Stripe secret key (starts `sk_`). Used only server-side to look up full order details after the webhook fires.
- `FULFILLMENT_NOTIFY_WEBHOOK_URL` — where order notifications get pushed in real time. Any of these work with zero code changes, since the function POSTs a generic JSON payload:
  - A Slack "Incoming Webhook" URL (Slack app settings -> Incoming Webhooks).
  - A Discord channel webhook URL.
  - A Zapier or Make.com "Catch Hook" URL, if you want to chain further automation (e.g., auto-create a task in a project tool) later.
  - Leave unset and rely on Vercel's function logs (Project -> Deployments -> Functions -> Logs) if you don't want a real-time push yet — every order is still logged there.

**Never paste these secret values into a chat, a commit, or any file in this repo.** Set them directly in the Vercel dashboard.

### 6. Test before going live
Use Stripe's test mode and the Stripe CLI (`stripe listen --forward-to https://www.robust-code.com/api/stripe-webhook`, or a local dev URL) to send a test `checkout.session.completed` event and confirm the notification arrives correctly formatted before setting the product's `status` to `"published"` for real.

### 7. Publish
Set `status: "published"` and a real `publishedAt` date, rebuild (`npm run build:content`), commit, push.

## What's NOT built yet (required before real, ongoing sales)

- **Marking an order fulfilled + emailing the customer a tracking number.** Today, after the human places the Amazon order, there's no automated way to send the customer a confirmation with tracking. The next increment: a second small serverless endpoint (protected by a shared secret, not public) that accepts `{sessionId, trackingNumber, carrier}` and emails the customer via whichever provider is chosen (Resend, SendGrid, Postmark all work without much setup) — deliberately not built now because no email provider has been chosen yet, and guessing one would mean writing code against an account that doesn't exist.
- **Refund/chargeback synchronization** between Stripe and whatever was ordered from the supplier — currently manual (if a customer refunds on Stripe, the corresponding Amazon order isn't automatically canceled).
- **Inventory/stock checking** before accepting payment — if the supplier is out of stock, the customer currently finds out after paying, not before. Worth revisiting once order volume justifies it.
- **A real 1200x630 product photography setup** — the example uses the site logo as a placeholder image.

## Order history (optional — Neon Postgres)

If `DATABASE_URL` (a Neon Postgres connection string) is set in Vercel, every completed checkout is also saved as a row in the `orders` table — see `docs/store/orders-schema.sql` for the schema (run it once in Neon's own SQL Editor to create the table; nothing in this repo runs it automatically). This gives a persistent, queryable order history and a place to mark an order `ordered` / `shipped` with a tracking number, directly in Neon's dashboard — no admin UI needed for this volume of orders.

This is entirely additive: if `DATABASE_URL` is unset, the workflow behaves exactly as described above (notify + logs only). The connection string is a real secret — set it only in Vercel Project Settings, never in this repository or in chat.

## Scaling beyond a handful of products

`AMAZON_SOURCING_MAP` as a single environment variable works fine for a handful of products. Once the physical catalog grows past roughly 10-20 items, move the sourcing map to a small private database (Airtable, Google Sheets read via their API, or a proper Postgres instance) that `api/stripe-webhook.js` queries instead of parsing an env var — the rest of the architecture (webhook, notification, human-fulfills-by-hand) doesn't need to change.
