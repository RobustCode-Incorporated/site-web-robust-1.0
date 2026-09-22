// Vercel Serverless Function — the ONLY backend code in this otherwise
// static repository. Receives Stripe webhook events for the semi-automated
// physical-product fulfillment workflow described in
// docs/store/PHYSICAL_PRODUCTS_FULFILLMENT.md.
//
// What this does: verifies the event really came from Stripe, and for a
// completed checkout, notifies a human with everything they need to place
// the matching order with the real supplier (e.g. Amazon) by hand — it
// NEVER places that order automatically. See the doc above for why.
//
// Required environment variables (set in Vercel Project Settings, never in
// this repo):
//   STRIPE_SECRET_KEY        — Stripe secret key (starts with sk_)
//   STRIPE_WEBHOOK_SECRET    — signing secret for this specific endpoint
//                              (Stripe Dashboard -> Developers -> Webhooks)
//   AMAZON_SOURCING_MAP      — JSON string, e.g.
//     {"example-physical-product": {"sourceUrl": "https://amazon...", "costPrice": 18.50}}
//     Keyed by the product's content/products/... slug. This is the ONLY
//     place sourcing/cost data lives — never in the git repo.
//   FULFILLMENT_NOTIFY_WEBHOOK_URL — optional. A Slack/Discord/Zapier/Make
//     incoming webhook URL. If unset, order details still land in Vercel's
//     function logs (Project -> Deployments -> Functions), just not pushed
//     anywhere in real time.
//
// This file is plain Node.js (no framework) using Vercel's Node.js request/
// response objects. Signature verification needs the RAW request body, so
// automatic body parsing is disabled below and the body is read manually.

import Stripe from "stripe";

export const config = {
  api: { bodyParser: false },
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function notify(message) {
  console.log("[stripe-webhook] order notification:\n" + message);
  const url = process.env.FULFILLMENT_NOTIFY_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: message, content: message }),
    });
  } catch (err) {
    console.error("[stripe-webhook] failed to POST to FULFILLMENT_NOTIFY_WEBHOOK_URL:", err);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("[stripe-webhook] STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET is not configured");
    res.status(500).send("Webhook not configured");
    return;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const rawBody = await readRawBody(req);
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed:", err.message);
    res.status(400).send(`Webhook signature verification failed: ${err.message}`);
    return;
  }

  // Always acknowledge quickly once verified — Stripe retries on non-2xx.
  if (event.type !== "checkout.session.completed") {
    res.status(200).json({ received: true, ignored: event.type });
    return;
  }

  try {
    const session = event.data.object;
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    const slug = fullSession.metadata?.slug || fullSession.line_items?.data?.[0]?.price?.product?.metadata?.slug || null;

    let sourcing = null;
    if (slug && process.env.AMAZON_SOURCING_MAP) {
      try {
        const map = JSON.parse(process.env.AMAZON_SOURCING_MAP);
        sourcing = map[slug] || null;
      } catch (err) {
        console.error("[stripe-webhook] AMAZON_SOURCING_MAP is not valid JSON:", err);
      }
    }

    const shipping = fullSession.shipping_details || fullSession.customer_details;
    const lines = (fullSession.line_items?.data || [])
      .map((li) => `  - ${li.description} x${li.quantity} (${(li.amount_total / 100).toFixed(2)} ${fullSession.currency?.toUpperCase()})`)
      .join("\n");

    const message = [
      `NEW ORDER — action required: place the matching order with the supplier by hand.`,
      `Stripe session: ${fullSession.id}`,
      `Product slug: ${slug || "(not set — add metadata.slug to the Payment Link)"}`,
      `Customer email: ${fullSession.customer_details?.email || "(none)"}`,
      `Shipping address: ${shipping?.address ? JSON.stringify(shipping.address) : "(not collected)"}`,
      `Shipping name: ${shipping?.name || "(none)"}`,
      `Amount paid: ${(fullSession.amount_total / 100).toFixed(2)} ${fullSession.currency?.toUpperCase()}`,
      `Line items:\n${lines || "  (none)"}`,
      sourcing
        ? `Supplier link: ${sourcing.sourceUrl || "(missing in AMAZON_SOURCING_MAP)"}\nCost price: ${sourcing.costPrice ?? "(missing)"}`
        : `No sourcing entry found for slug "${slug}" in AMAZON_SOURCING_MAP — look it up manually before ordering.`,
    ].join("\n");

    await notify(message);
    res.status(200).json({ received: true });
  } catch (err) {
    // The event was genuinely from Stripe (signature already verified) —
    // don't make Stripe retry forever over a bug on our side; log loudly
    // and still return 200, since this is a notification failure, not a
    // payment failure — the charge already succeeded on Stripe's side.
    console.error("[stripe-webhook] error while processing checkout.session.completed:", err);
    res.status(200).json({ received: true, error: "processing_failed_see_logs" });
  }
}
