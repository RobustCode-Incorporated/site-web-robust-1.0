# Newsletter Integration

## Current state (since 2026-10-29)

The newsletter form (rendered by `newsletterCTA()` in `scripts/build-content.mjs`, on every article, tool and product page) is **live, with double opt-in**:

1. The form posts JSON to `/api/newsletter` (`assets/js/analytics-events.js`).
2. `api/newsletter.js` stores the address in Neon (`newsletter_subscribers`, status `pending`, created on first use) and sends a confirmation e-mail through Resend.
3. The subscriber clicks the link (`/api/newsletter?confirm=TOKEN`) -> status `confirmed`, `confirmed_at` set, owner notified at contact@robust-code.com.
4. Every e-mail carries `/api/newsletter?unsubscribe=TOKEN` -> status `unsubscribed`.

Nobody counts as subscribed until they confirm from their own inbox. Bots: honeypot field `company_website` + minimum time on page; both get a silent fake success.

## Environment (Vercel Project Settings, never in the repo)

- `DATABASE_URL` (Neon, project "ROBUST STORE"), `RESEND_API_KEY` — required.
- `NEWSLETTER_FROM` — optional sender, default `Robust Code Insights <insights@robust-code.com>`.
- `NEWSLETTER_NOTIFY` — optional owner address (default contact@robust-code.com, `off` to disable).
- `RESEND_AUDIENCE_ID` — optional. Confirmed subscribers are also added to this Resend audience so each issue can be sent as a Resend broadcast (which handles unsubscribes too).

## Sending an issue

Confirmed list, in the Neon SQL Editor:

```sql
SELECT email, lang FROM newsletter_subscribers WHERE status = 'confirmed' ORDER BY confirmed_at;
```

Send through a Resend broadcast (preferred: set `RESEND_AUDIENCE_ID`) or any tool that includes the unsubscribe link.
