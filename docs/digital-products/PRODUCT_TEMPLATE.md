# Product Template

Copy this structure into `digital-products/<slug>/` when starting a new product (see `PRODUCT_DEVELOPMENT_FRAMEWORK.md` for the process this supports).

```
digital-products/<slug>/
├── PRODUCT_SPEC.md       # the 17-stage framework, filled in for this specific product
├── README.md             # internal: what this is, current status, who's working on it
├── PROMPTS/              # one file per prompt, using the Prompt Format below
├── TEMPLATES/            # the actual fillable templates (docs/sheets/Notion exports)
├── CHECKLISTS/            # the actual checklists
├── EXAMPLES/              # worked examples, fictional scenarios only
├── NOTION/                # Notion export/duplicate-link source, if the product ships as Notion
└── LICENSE.md             # the license terms sold with the product (see below)
```

## Prompt format (every file under PROMPTS/)

```
PROMPT NAME
Purpose: <one sentence — what this prompt produces>
Use when: <the specific point in the system where this applies>
Inputs: <what the user must supply — be specific>
Optional context: <what improves the output but isn't required>
Prompt:
<the actual prompt text, ready to paste>
Expected output: <what a good result looks like>
Quality check: <how the user verifies the output before trusting it>
Next step: <what the user does with this output in the system>
```

This structure exists specifically so the product never degenerates into an unstructured prompt dump (see `PRODUCT_DEVELOPMENT_FRAMEWORK.md` stage 07 and `docs/digital-products/PRODUCT_CREATION_PROMPT.md`'s explicit prohibition).

## LICENSE.md baseline

Every product needs an explicit, plain-language license. At minimum, state:

- **Single-user license** (default, per `content/products/.../*.md`'s `license` field): the buyer may use the system for their own business or their own clients' work, but may not resell, redistribute, or republish the system itself.
- What happens on version updates (do buyers get free updates? for how long?).
- That the system does not constitute legal, financial, or professional advice, and the buyer is responsible for adapting it to their own situation and jurisdiction.

## What NOT to include

- No testimonials until real, permissioned ones exist.
- No "as seen in" / social proof that isn't real.
- No countdown timers, fake stock counters, or other manufactured urgency.
