# Robust Code — Content Strategy

## Purpose

Turn robust-code.com into a content platform that earns organic traffic and trust from Belgian SMEs, independent of whether a given visitor buys a Robust Code product on their first visit. The blog/insights section is an acquisition layer for the whole business, not an isolated marketing checkbox.

## Target audiences

1. **Belgian SME owners/operators** (10–250 employees) evaluating digitalization, automation, or new business software — the primary audience.
2. **Operations/finance leads** at those SMEs directly affected by regulatory change (e.g., e-invoicing).
3. **Technical decision-makers** (a "tech-adjacent" owner, an internal IT lead) evaluating CRM/ERP/automation vendors, including Robust Code.

We are explicitly not writing for other software agencies or a general "tech blog" audience — every article should be useful to someone who runs or operates a business, first.

## Content pillars

- **Belgium** — regulation, compliance deadlines, local business context (e-invoicing/Peppol, GDPR, sector-specific rules). Highest intent, most differentiated — competitors writing generic "AI for business" content rarely localize to Belgium specifically.
- **Business** — CRM/ERP/software selection, operations, finance, workflows — evergreen, high search volume.
- **AI** — practical adoption frameworks, governance, realistic expectations — deliberately not hype-driven.
- **Automation** — process-level automation, ROI thinking, tooling.
- **Operations** — day-to-day running of an SME: inventory, customer management, productivity.
- **Case Studies** — real Robust Code work only, added once available. Never fabricated.

## Keyword research methodology (lightweight, not tool-dependent)

1. Start from a real question a prospect or client has asked in a sales call, support conversation, or LinkedIn comment — this is the actual search intent, and it's free.
2. Check what currently ranks for that question in Belgium (google.be, French and/or Dutch/English as relevant) — identify the gap: is existing content generic, outdated, or missing Belgian specifics?
3. Confirm the topic maps to a content pillar above before writing — if it doesn't, it's not in scope yet.
4. Only then consider a keyword tool for volume/difficulty confirmation — a nice-to-have check, not the starting point.

## Article structure (standard shape)

1. **Short version / TL;DR** — answer the core question in the first 2–3 paragraphs. Readers (and search engines) should get value even if they stop there.
2. **Context** — why this matters now, who it affects.
3. **Depth sections** (H2/H3) — the actual substance: frameworks, checklists, worked examples.
4. **What this is not** — pre-empt the obvious wrong takeaway (e.g., "this is not a reason to rip out your ERP").
5. **Where Robust Code fits** — one honest paragraph, not a sales pitch, linking to the relevant product/contact page.

## Internal linking strategy

- Every article links to: 1–3 related articles (same category or tag overlap), a relevant free tool if one exists, and one relevant CTA (product page or contact).
- The footer "Insights" and "Tools" links (added site-wide) and the primary nav "Insights" link are the main site-wide entry points.
- No random or forced links — see spec constraint: internal links must be genuinely relevant, not inserted purely for link equity.

## Publishing workflow

See `content-validate.yml` and `content-scheduled-publish.yml` under `.github/workflows/`. Human summary:

1. Draft an article as `content/insights/<category>/<slug>.md` with `draft: true`.
2. Open a PR — CI (`content-validate.yml`) checks frontmatter, slugs, and internal links.
3. A human reviews facts, sources, and claims (mandatory for anything citing law, regulation, prices, or current events — see spec §23).
4. Set `draft: false` and a `publishedAt` date (today or a future date), merge to `main`.
5. If `publishedAt` is today or in the past, the next build publishes it immediately. If it's in the future, the daily scheduled-publish workflow picks it up automatically on that date — no manual redeploy needed.

## Monthly calendar

See `docs/content/CONTENT_CALENDAR.md` for the specific 12-month topic roadmap, and `content/calendar.json` for the machine-readable cadence config.

## Monetization strategy (see spec §18 for full detail — summary here)

- **Now:** lead capture architecture (newsletter/consultation CTAs) and free tools, both built but not yet wired to a real ESP/CRM backend.
- **Prepared, inactive:** ad slots (`content/config/ad-slots.json`, all disabled), affiliate link component (disclosure + tracking built in, no partners yet), sponsored-content frontmatter field.
- **Later:** activate ad slots and affiliate partnerships only once traffic justifies it — never at the expense of trust or UX, per spec's explicit SEO/quality principles.

## Quality standards

- No fabricated statistics, customers, testimonials, or case studies.
- Every claim about law, regulation, or current events is verified against an authoritative source before publishing (spec §23) and re-checked on `updatedAt` if the article is revised.
- Original analysis or a practical framework in every piece — not a rewrite of what already ranks.
- Belgian context included wherever genuinely relevant, not forced.
