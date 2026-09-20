# Newsletter Integration

## Current state

The newsletter signup form (rendered by `newsletterCTA()` in `scripts/build-content.mjs`, present on every article, tool, and product page) is **not connected to an email provider**. Submitting it shows an explicit in-page message saying so (`assets/js/analytics-events.js`) rather than pretending the signup succeeded. A honeypot field (`company_website`) silently drops bot submissions without firing an event or the "not connected" message, so this is safe to leave live as-is — it collects nothing, promises nothing, and isn't a dead trap for real visitors since they're told the truth immediately.

## Integration abstraction

Each generated form carries a `data-form-endpoint` attribute, currently empty:

```html
<form class="newsletter-form" data-form-endpoint="" data-analytics="newsletter_signup">
```

`assets/js/analytics-events.js`'s submit handler checks this attribute: empty → show the "not connected" message and prevent submission; non-empty → let the form submit normally to that endpoint.

## Connecting a real provider (future work)

1. Choose a provider with a simple hosted form-submission endpoint that accepts a plain HTML POST — Mailchimp, ConvertKit, Buttondown, and Listmonk all support this without a custom backend.
2. Get the provider's form action URL (and any required hidden fields — e.g., a list/audience ID) from their dashboard.
3. In `scripts/build-content.mjs`'s `newsletterCTA()`, set `data-form-endpoint` to the real URL and add any required hidden fields the provider needs.
4. Remove or adjust the "not connected" branch in `assets/js/analytics-events.js`'s submit handler once a real endpoint is set — the honeypot check should stay regardless of provider.
5. Rebuild (`npm run build:content`) — every page gets the change at once, since the form lives in one shared template function.

## Explicitly not done

- No provider account exists yet.
- No email address has ever been collected through this form.
- No double opt-in / confirmation flow is designed yet — this depends entirely on which provider is chosen, since most handle it natively.
