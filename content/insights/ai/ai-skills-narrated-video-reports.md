---
title: "Three AI Skills That Turned Our Monthly Report Into a Three-Minute Film"
description: "We replaced our slide-deck status report with a narrated, animated video built from evidence. Here are the three AI skills that made it work, and the one lesson we learned the hard way."
excerpt: "Nobody reads a forty-slide status report to the end. This month we turned ours into a three-minute film, narrated in our own (cloned, consented) voice and built only from verifiable evidence. Three practical AI skills made it possible."
publishedAt: "2026-10-29"
updatedAt: "2026-10-29"
author:
  name: "Robust Code"
  role: "Engineering & Digitalization"
category: "ai"
tags: ["AI", "automation", "reporting", "voice cloning", "AI governance"]
coverImage: "/assets/images/insights/ai-skills-narrated-video-reports.jpg"
featured: true
draft: false
seo:
  title: "Three AI Skills Behind Our Narrated Video Reports"
  description: "Evidence-first reporting, consent-based voice cloning and video as code: how we turned a monthly status report into a three-minute film people actually watch."
relatedArticles: ["ai-automation-sme-adoption-framework"]
relatedTools: ["roi-calculator"]
cta:
  title: "Want your reports to be watched, not skimmed?"
  description: "We set up the same pipeline for companies: connected to your data, narrated in your voice (with your consent), designed in your brand."
  href: "/what-we-do/video-reports.html"
---

<video controls preload="metadata" playsinline poster="/assets/images/insights/ai-skills-narrated-video-reports.jpg" style="width:100%;border-radius:12px;margin:0 0 1.5rem;background:#000">
  <source src="/assets/videos/ai-skills-narrated-video-reports.mp4" type="video/mp4">
</video>

*The narration in this video is an AI-generated voice, cloned from our founder's voice with recorded consent.*

## The short version

Status reports have a reading problem, not a writing problem. People stop reading a long deck early, and the effort that went into it is lost.

This month we tried something different: our monthly report became a **three-minute narrated film**, generated from the same facts we would have put on slides. It took three AI skills:

1. **Evidence before opinions**: AI agents build against a written specification, and every phase has to prove itself with tests and live services. The report collects that evidence instead of describing it.
2. **A voice that is really ours**: a clone of our founder's voice, created with recorded consent, running locally, and always labelled as AI-generated.
3. **Video as code**: no editing timeline. A program draws every frame from the report data, so next month's video is a re-run, not a re-edit.

None of these is magic, and each one has guardrails. That's the point of this article.

## Why a report needs to change format

A typical monthly report is written for the person writing it: complete, defensive, and long. The person reading it wants three answers, *where are we, can I trust it, and what happens next*, and usually has a few minutes, not an hour.

A short video forces the right structure. You cannot narrate forty slides in three minutes, so you are pushed to say only what matters, in the order it matters. And unlike a deck, it gets watched on a phone, between meetings, by people who would never open the attachment.

The risk is obvious: a polished video can make weak work look good. That's why the first skill matters more than the other two.

## Skill 1: Specification before code, evidence before opinions

Every project we run follows our internal framework, the **Robust Specification Driven Development Framework (RSDDF)**. Its lifecycle is deliberately unglamorous: discovery, specification, architecture, design, implementation, validation, deployment, operations, improvement.

AI agents now do a large part of our implementation work. What keeps that safe is not the model, it's the structure around it:

- **A written specification comes first.** The agent works against it, phase by phase, never on a vague prompt.
- **Each phase has to prove itself before the next one starts.** Tests that pass, services that are actually live, numbers anyone can check. Our CRM project alone runs 109 automated tests.
- **The report reads the evidence.** For each project it shows the lifecycle stage, the evidence, and the next milestone, not adjectives like "on track" or "almost done".

This is what makes the video trustworthy. The animation shows a test count because a test suite exists; it shows "live" because a URL answers. If a project has no evidence yet, the report says so.

**What to copy, even without video:** replace status adjectives with one piece of verifiable evidence per project, and one next milestone. It's the single highest-value change you can make to any report.

## Skill 2: A voice that is really ours

The narration is an AI-generated voice, cloned from our founder's voice. Three rules made us comfortable with that:

- **Consent is recorded, not assumed.** The voice profile was created by the person whose voice it is, with a recorded consent statement stored alongside it.
- **It runs locally.** We use an open-source voice-cloning studio running on a laptop. No recording studio, and the voice model never leaves our machine.
- **It is always labelled.** Every video says on screen, and in the description, that the narration is AI-generated. A synthetic voice should never pretend to be a live recording.

In Belgium and the rest of the EU, this is not only good manners. A voice recording is personal data under GDPR, and the EU AI Act introduces transparency obligations for AI-generated or manipulated audio and video. If you clone a voice, even your own CEO's, treat consent, storage and labelling as part of the project, not an afterthought.

**What this is not:** a way to put words in someone's mouth. Every script is written, read and approved by a human before a single second of audio is generated.

## Skill 3: Video as code

There is no editing timeline in our process. Every frame is drawn by a program from the same data as the report:

1. **The script becomes the voice**: each sentence is generated as its own audio clip.
2. **The voice sets the timing**, because we know exactly when each sentence starts, we know when each animation should start.
3. **The timing drives the animation**: counters, lifecycle trackers and captions are scheduled against the narration automatically.

The practical result: our last monthly report, two minutes and forty-two seconds long, rendered in about a minute and a half on a laptop. Next month, we update the data and run it again. The design stays consistent because it lives in code, not in someone's memory of how the last edit was done.

Burned-in captions come for free, too: useful because most people watch social video with the sound off.

## The lesson we learned the hard way

While we were building this, our own storage-cleaning tool moved the voice model into quarantine to free disk space. The narration went silent, and generation hung while it tried to re-download a 2.45 GB model.

Nothing was lost, because the cleaner never deletes anything outright: it moves items to a quarantine they can be restored from. We restored the model in seconds.

The broader point applies to any automation: **speed without guardrails creates new failure modes.** Every automated step in this pipeline, the agents, the voice, the cleanup, has a human-approved input and a way back.

## What this is not

- **Not a replacement for judgment.** The video presents decisions; it doesn't make them.
- **Not a way to dress up weak results.** If the evidence is thin, the video will show thin evidence.
- **Not a reason to clone voices casually.** No consent, no clone. No label, no publication.

## Where Robust Code fits

We now offer this pipeline to companies as an automation: we connect it to your project or business data, set up your voice (with your recorded consent) or a designed voice, and build your brand into the animation once. After that, a narrated report is ready every month, for your managers, partners or clients.

If you want to see whether it fits how your team reports today, [see the service](/what-we-do/video-reports.html). And if you're still deciding where automation should start in your business, our [Automation ROI Calculator](/tools/roi-calculator/) is a good first step.
