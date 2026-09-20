PROJECT CHARTER DRAFT

Purpose: Turn a rough project idea into a first-draft one-page charter covering the problem, objectives, and initial stakeholder list, ready for the buyer to correct and refine.

Use when: Right after Discovery (stage 01), before writing Objectives (stage 02) from scratch.

Inputs:
- A 2-5 sentence description of the project idea, in your own words.
- The name of the organization or team it's for.

Optional context:
- Any known constraints (deadline, budget, team size).
- Any stakeholder names you already know must be involved.

Prompt:
"""
I'm starting a project. Here's the idea in my own words: [PASTE YOUR
DESCRIPTION]. Known constraints: [PASTE OR WRITE "none yet"].

Draft a one-page project charter with these sections:
1. Problem statement (2-3 sentences — what's wrong or missing today)
2. Objectives (3-5 bullet points, each specific enough that someone could
   later say clearly whether it was met)
3. Likely stakeholders (a first-guess list of roles/people who can
   approve, block, or are materially affected — mark each as
   Decide / Consulted / Informed)
4. Open questions (things you don't have enough information to answer yet)

Do not invent specific names, dates, or budget figures I haven't given
you — use placeholders like [STAKEHOLDER NAME] instead, and flag any
assumption you had to make.
"""

Expected output: A one-page draft charter with the four sections above, using placeholders for anything not supplied, and an explicit "assumptions" note.

Quality check: Read every objective and ask "could I tell, in three months, whether this was met?" If not, rewrite it before moving on. Confirm the stakeholder list against people you actually know are involved — the draft is a starting guess, not a finished list.

Next step: Copy the corrected charter into your project plan (or `TEMPLATES/project-scope-template.md` for the Scope stage), and move to Objectives (stage 02) using the corrected version, not the raw draft.
