# Digital Delivery Architecture

## Current state: not implemented

No customer has ever purchased a Robust Code digital product (no checkout is even configured — see `CHECKOUT_ARCHITECTURE.md`). This document describes the intended future architecture, not something running today.

## Hard rule

**Paid product files must never live in a publicly accessible path on this static site.** Concretely: nothing under `assets/`, nothing at any path this repository serves at `robust-code.com`, ever contains the actual ZIP/PDF/Notion-link/template files a customer pays for. A file reachable by URL is public, full stop, regardless of whether it's linked from anywhere — static hosting has no access control.

The actual product source material lives in `digital-products/` at the repository root (see `PRODUCT_FILE_STRUCTURE` in `docs/digital-products/`), which is committed to this repository (for version history and collaboration) but is **never read by `scripts/build-content.mjs`** and **never copied into any generated output directory**. That is what keeps it non-public: it's source material for a human to package and upload elsewhere, not web content.

## Intended future flow

```
Customer completes checkout (hosted provider — see CHECKOUT_ARCHITECTURE.md)
        │
        ▼
Provider confirms payment (webhook or built-in automation)
        │
        ▼
Delivery mechanism (NOT this static site) grants access:
        │
        ├── Option A: provider-native delivery
        │     (Gumroad/Lemon Squeezy can host and deliver the file directly —
        │      no custom code needed; this is the simplest and default choice)
        │
        └── Option B: custom delivery (only if a provider can't do it)
              A small serverless function verifies the webhook signature,
              then either emails a time-limited signed URL (e.g., an S3/R2
              presigned URL) or grants access to a private Notion page.
              This function does NOT live in this repository.
```

## Recommendation

Use Option A (provider-native delivery) for as long as possible. It requires zero custom backend, zero secret management on Robust Code's side beyond the provider dashboard login, and is the correct match for a static-site-first architecture. Only build Option B if a specific product genuinely needs delivery logic no provider supports (e.g., versioned updates with entitlement checks across multiple past purchases).

## What this phase delivers

- The rule above (no public paid files), enforced structurally by keeping `digital-products/` outside the build script's read path.
- The `digital-products/robust-project-os/` scaffold, so the actual product files have a home before delivery is wired up.
- This document.

## What remains (required before any real sale)

- Choose and configure a checkout provider (`CHECKOUT_ARCHITECTURE.md`).
- Finish and QA the actual ROBUST PROJECT OS deliverables in `digital-products/robust-project-os/`.
- Decide and configure the actual delivery mechanism (Option A recommended above).
- Write a real customer-facing delivery confirmation (email or page) — not drafted here because it depends on the provider chosen.
