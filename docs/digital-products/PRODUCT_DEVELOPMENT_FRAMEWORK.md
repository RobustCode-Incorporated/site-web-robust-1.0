# Product Development Framework

Every Robust Code digital product goes through these 17 stages before it is offered for sale. This is the content/methodology track — pair it with `docs/store/PRODUCT_CREATION_WORKFLOW.md` for the website-side steps.

01. **Problem** — What specific, expensive, or painful problem does this solve? Write it in one paragraph. If you can't, the product isn't scoped yet.
02. **Audience** — Who specifically needs this, named as a role, not "everyone." (`content/products/.../*.md`'s `audience` field.)
03. **Desired Outcome** — What can the buyer concretely do or produce after using this, that they couldn't before?
04. **Method** — Why does this approach work? What's the underlying logic, not just the steps?
05. **System Design** — Break the method into named stages/components (e.g., ROBUST PROJECT OS's 13 stages).
06. **Components** — List every deliverable file/template/checklist the system needs, mapped to a stage.
07. **Prompts** — For each place an AI assistant genuinely accelerates the work, write a structured prompt (see `PRODUCT_TEMPLATE.md`'s prompt format). Do not add a prompt just to pad the product.
08. **Templates** — Build the actual fillable templates (spreadsheet, document, Notion, whatever fits), not just descriptions of what a template should contain.
09. **Checklists** — Build the actual checklists, each item specific enough that two people would agree whether it's done.
10. **Examples** — At least one fully worked example per major component, using a plausible but clearly fictional scenario (never a real, identifiable client without permission).
11. **Validation** — Define what "this system worked" looks like for a buyer, and build in a self-check (a checklist, a review step) so they can tell without asking you.
12. **Packaging** — Assemble everything into the `digital-products/<slug>/` structure (see its own README for the exact layout).
13. **Product Page** — Write the `content/products/<category>/<slug>.md` frontmatter and body, per `docs/store/PRODUCT_FRONTMATTER.md`. Keep `status: draft`.
14. **Checkout** — Decide pricing (`PRODUCT_PRICING_FRAMEWORK.md`) and, when ready to sell, configure a real provider (`docs/store/CHECKOUT_ARCHITECTURE.md`).
15. **Delivery** — Confirm how the buyer will actually receive the files (`docs/store/DIGITAL_DELIVERY.md`) before taking the first payment, not after.
16. **Feedback** — Decide, before launch, how buyers can report problems or ask questions (e.g., the existing `contact.html` / a support inbox) — don't launch a paid product with no feedback channel.
17. **Updates** — Decide (and write into the product's `CHANGELOG.md`) how version updates will be communicated to past buyers. This is a real commitment once someone has paid — don't skip it.

## Non-negotiables (apply at every stage)

- No fabricated claims, results, testimonials, user counts, or scarcity.
- No guaranteed business outcomes ("this will grow your revenue by X%").
- No copied copyrighted material from other courses/products/frameworks.
- A product is a *method*, not a prompt collection — if stage 07 (Prompts) is the only stage with real content, stop and go back to stage 05.
