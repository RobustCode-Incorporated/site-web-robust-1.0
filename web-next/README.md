# Robust Code — Next.js migration (proof of concept, not deployed)

This is a standalone Next.js 15 (App Router, TypeScript) rebuild of the Robust Code marketing site, living on the `feat/nextjs-migration` branch only. It is **not connected to robust-code.com, not deployed anywhere, and not linked from `main`**. It exists so the team can evaluate a modern-stack migration on its own timeline, without any pressure on or risk to the production static site (which ships the content engine independently — see the repo root `docs/content/`).

## What's actually done here (be precise about this — don't oversell it)

- Full app scaffold: Next 15 App Router, TypeScript, `next.config.mjs`, own `package.json` (independent of the unrelated `ui/` CRM package at the repo root).
- `assets/` (CSS, images, vendor JS, per-page animation scripts) copied verbatim into `public/assets/` — **zero rewrite**, so the design is pixel-identical by construction, not by re-implementation.
- `RootLayout` (`app/layout.tsx`) loads the same stylesheets and vendor/animation scripts as every page on the static site, plus `<Header />`/`<Footer />` React components (real JSX, not a fragment dump — these are the two pieces duplicated 24× on the static site, so porting them properly once was worth doing first).
- `@vercel/analytics/next`'s `<Analytics />` component — the idiomatic React integration, replacing the plain `<script>` tag the static site uses.
- **Two migrated pages** as the proof of pattern:
  - `/` (home)
  - `/what-we-do/rc-core`
  
  Both use a `LegacyFragment` component that renders the original page's `<main>` markup (asset/link paths already rewritten to absolute routes) via `dangerouslySetInnerHTML`, rather than a hand-converted JSX rewrite. **This is a deliberate, documented tradeoff**: hand-converting ~400 lines of dense, animation-dependent markup (inline SVGs, exact class names GSAP/ScrollTrigger select against) per page is real, error-prone work with genuine regression risk; verbatim-porting it first proves visual/functional parity with zero risk, and each section can be refactored into real components incrementally afterward, one at a time, with an easy visual diff against the working version. Don't mistake this for a finished idiomatic-React migration — it isn't one yet.
- `/insights` and `/tools` are **natively built** (real JSX, `generateMetadata`, JSON-LD, `generateStaticParams`) — no legacy-fragment shortcut here, because there was no legacy version to port from. They read `../content/insights/*.md` and `../content/tools.json` **directly from the repo root** — the exact same content source the static site's `scripts/build-content.mjs` uses. Write an article once; both stacks can serve it.
- `app/sitemap.ts` — Next's native convention, listing only the routes that actually exist here (see below).

## What's NOT done (don't assume otherwise)

- ~21 pages are not migrated: `/about`, `/contact`, `/careers`, `/news`, `/our-work`, `/what-we-do` (index) + its other 3 product pages (`rc-data`, `rc-studio`, `rc-xp`), all `/legal/*`, all `/trust/*`. Following `rc-core`'s pattern (extract `<main>` → fix asset/link paths → `LegacyFragment` → per-page `<Script>` tags for that page's specific animation JS) is mechanical, roughly 15–30 minutes each — no new architecture needed.
- i18n (`assets/js/i18n.js`) is loaded and will still run client-side exactly as before, but hasn't been ported to a React-idiomatic pattern (e.g. next-intl) — it's the same DOM-attribute-driven approach as the static site for now.
- No build/deploy pipeline, no Vercel project, no domain connection. Intentionally.

## Running it

```bash
cd web-next
npm install
npm run dev   # http://localhost:3000
```

`npm run build` should also succeed — that's the real test of whether this holds together, not just `dev`.

## If/when this gets cut over

1. Finish the remaining page migrations (mechanical, see above).
2. Decide on i18n: keep the DOM-attribute approach or move to next-intl/similar.
3. Point a *new* Vercel project at this folder (`root directory: web-next`), verify on a `*.vercel.app` preview URL first.
4. Only then repoint the `robust-code.com`/`www` DNS — following the same GoDaddy → Vercel domain process already done for the static site, pointed at the new project instead.
5. Decommission the static site's build script once the cutover is confirmed stable — don't run both indefinitely.
