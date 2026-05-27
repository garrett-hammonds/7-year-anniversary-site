# HMM Base Repository

The starting point for every website build at **Hammonds Media & Marketing (HMM)**.

This repository is not a finished website. It is the scaffold that every HMM
project is cloned from — a Claude Code configuration plus a library of skills
that encode HMM's standards for engineering, design, accessibility, SEO, and
copywriting. Clone it, drop in a project brief, and Claude Code builds the site
against a fixed set of rules so every deliverable meets the same bar.

---

## How it works

Two pieces drive every build:

1. **`.claude/CLAUDE.md`** — the build contract. It defines the tech stack,
   rendering strategy per route type, React Server Component rules, the default
   page architecture, SEO and accessibility requirements, content and copy
   rules, and the step-by-step build sequence. Claude Code reads it
   automatically at the start of every session and follows it without
   exception.

2. **`.claude/skills/`** — specialized capabilities Claude loads on demand.
   Each skill carries deep, source-grounded guidance for one domain (design,
   accessibility, schema, content, copy, forms, AI Search). Most are imported
   at session start; one is trigger-loaded only at final review to keep
   build-phase context lean.

To start a project: replace the contents of `.claude/project-brief.md` with the
client brief (company info, brand/style variables, any custom parameters), then
open the repository in Claude Code and describe what you want built.

---

## Tech stack produced

Builds target a modern, SEO-first Next.js stack:

- **Framework:** Next.js (App Router, latest stable)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, with a CSS-variable design system driven by a
  Style Guide page

Server Components are the default; `'use client'` is reserved for leaf-level
interactivity. Rendering mode is set per route — static for marketing pages,
ISR for blog content, dynamic for forms.

---

## Repository structure

```
.
├── README.md                  This file
└── .claude/
    ├── CLAUDE.md              Build contract — rules every site must follow
    ├── project-brief.md       Per-project brief (replace before building)
    └── skills/                Skill library (see below)
```

---

## Skill library

| Skill | Purpose |
|---|---|
| `frontend-design` | Distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics |
| `web-accessibility` | ADA/WCAG auditing, remediation, and the color-contrast build gate |
| `laws-of-ux` | UX critique and layout decisions grounded in behavioral heuristics |
| `website-schema-builder` | JSON-LD structured data generation and validation for rich-result eligibility |
| `eeat-content-writer` | Content written and audited to Google's E-E-A-T standard |
| `hmm-behavioral-science-copywriting` | Marketing copy grounded in HMM's behavioral science vault |
| `form-building` | Wires contact forms to a hosted endpoint with anti-spam and UTM attribution capture |
| `google-ai-search-optimization` | Audits pages for AI Overviews / AI Mode retrieval (trigger-loaded at final review) |

---

## Standards enforced on every build

The build contract is strict by design. Highlights:

- **Accessibility as a gate.** WCAG AA is the floor; color contrast is verified
  by computation and wired as a `prebuild` and CI check, not judged by eye.
- **SEO in the server-rendered HTML.** Metadata, canonical URLs, and JSON-LD
  ship in the first response — never injected by client-side JavaScript.
- **Honest crawler policy.** `robots.ts` differentiates retrieval and indexing
  bots from training scrapers; the same content is served to all.
- **Dynamic sitemap and IndexNow.** Routes and CMS data generate the sitemap;
  publishes ping IndexNow for fast URL discovery.
- **Human copy.** No fabricated reviews, no marketing filler, no AI-tell writing
  patterns.

The full set of rules lives in [`.claude/CLAUDE.md`](.claude/CLAUDE.md).

---

© 2026 Hammonds Media & Marketing (HMM). Proprietary and confidential.
Contact: hello@hmm.agency
