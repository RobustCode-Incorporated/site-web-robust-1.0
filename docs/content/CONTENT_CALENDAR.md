# Robust Code — 12-Month Editorial Calendar

Minimum cadence: 1 article/month (see `content/calendar.json`). Topics below are specific enough to brief directly — each still needs a content brief (`docs/content/ARTICLE_BRIEF_TEMPLATE.md`) and fact verification before writing, especially anything touching law or regulation (re-check dates/status against official sources at write time, not the date this calendar was drafted).

Per `docs/content/CONTENT_STRATEGY.md` §30 (content → commerce strategy), each row also names the free tool and digital product this topic naturally supports — a legitimate problem → education → tool → system progression, not search-volume-only topic selection. "Related product" left blank means no product in the current pipeline (`docs/store/STORE_ROADMAP.md`) fits yet; do not force one.

| Month | Category | Topic | Related free tool | Related digital product | CTA | Status |
|---|---|---|---|---|---|---|
| 1 | Belgium | Belgium's 2026 e-invoicing mandate: a practical guide for SMEs | — | ROBUST SME DIGITALIZATION OS (not started) | Contact | **Published** (`content/insights/belgium/e-invoicing-belgium-smes-2026.md`) |
| 2 | AI | AI & automation for SMEs: a crawl-walk-run adoption framework | Automation ROI Calculator | ROBUST AI AUTOMATION OS (not started) | Contact | **Published** (`content/insights/ai/ai-automation-sme-adoption-framework.md`) |
| 3 | Business | CRM vs ERP for SMEs: what each one actually solves | Automation ROI Calculator | ROBUST OPERATIONS OS (not started) | Contact | **Published** (`content/insights/business/crm-erp-fundamentals-smes.md`) |
| 4 | Operations | Inventory management for small retailers/wholesalers: when to move off spreadsheets | — | ROBUST OPERATIONS OS (not started) | Contact | Planned |
| 5 | Belgium | Peppol e-invoicing, six months in: what actually broke and what to fix before the next VAT-code change | — | ROBUST SME DIGITALIZATION OS (not started) | Contact | Planned — revisit/update Article 1 with real post-launch observations if available |
| 6 | Automation | Automating supplier invoice processing without an enterprise budget | Automation ROI Calculator | ROBUST AI AUTOMATION OS (not started) | Automation ROI Calculator | Planned |
| 7 | Business | Choosing between a custom-built system and off-the-shelf SaaS for a growing SME | — | ROBUST BUSINESS ANALYST OS (not started) | Contact | Planned |
| 8 | AI | Data readiness: what a business needs before any AI project makes sense | Automation ROI Calculator | ROBUST AI AUTOMATION OS (not started) | Contact | Planned |
| 9 | Belgium | GDPR in practice for Belgian SMEs adopting AI tools | — | — | Contact | Planned |
| 10 | Operations | Customer follow-up systems: the most common reason deals go cold | — | ROBUST SALES OS (not started) | Contact | Planned |
| 11 | Case Studies | First Robust Code case study (only if real client data/permission is available — do not force a fabricated one) | — | — | Contact | Conditional |
| 12 | Projects | How to structure a business project so it doesn't quietly fail: the 13 stages most teams skip | Project Success Checklist | **ROBUST PROJECT OS** (draft, in development) | Project Success Checklist → ROBUST PROJECT OS | Planned |

## Notes

- Case study slot (month 11) is intentionally conditional — per spec §12, never fabricate a customer, number, or result. If no real, permissioned case study exists by then, replace with another Business or Operations topic instead of forcing it.
- Month 5 doubles as a scheduled "freshness" update to Article 1 (`updatedAt` bump with genuinely new information), modeling spec §31's monthly operating loop: publish new, revisit old.
- Month 12 is the first article written to directly support a real, already-scaffolded product (ROBUST PROJECT OS) and its live free lead magnet (`tools/project-success-checklist/`) — the clearest example of the content → commerce funnel in this calendar. Once written, add `relatedTools: ["project-success-checklist"]` and, once the product is published, `relatedProducts: ["robust-project-os"]` to its frontmatter.
- Beyond month 12, repeat the pillar rotation (Belgium → AI → Business → Operations → Automation) at whatever frequency capacity allows — see spec §32 on scaling from 1/month to 4/month without redesigning the system. Prioritize topics that pair with whichever product from `docs/store/STORE_ROADMAP.md` is actively in development at the time.
