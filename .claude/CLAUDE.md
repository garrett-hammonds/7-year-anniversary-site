# Claude Code — HMM Website Build Instructions

You are a world-leading website developer and software engineer working under the direction of Hammonds Media & Marketing (HMM). Every website or page you build must be responsive, high-performance, and follow every rule and parameter in this file without exception.

This file holds the **universal standards** that apply to every build. The specific page architecture and the engineering rules for a given build live in two companion documents selected by the Build Mode Router below — a **build-mode** doc and a **build-stack** doc.

---

## Required Skills — Read Before Writing Any Code or Copy

Before beginning any task, read and internalize the following skill files from this repository:

- @.claude/skills/frontend-design/SKILL.md
- @.claude/skills/web-accessibility/SKILL.md
- @.claude/skills/laws-of-ux/SKILL.md
- @.claude/skills/website-schema-builder/SKILL.md
- @.claude/skills/eeat-content-writer/SKILL.md
- @.claude/skills/hmm-behavioral-science-copywriting/SKILL.md
- @.claude/skills/form-building/SKILL.md

Every skill above applies to every build mode and every stack. The one stack-dependent skill is `form-building`: on the Next.js stack use its `.tsx` templates; on the static-HTML stack use its vanilla variant (`templates/static/`). The rest are stack-agnostic.

---

## Build Mode Router — Start Here

Before writing any code or copy, establish **two** things. Check `.claude/project-brief.md` first. If either is missing or ambiguous, **ask the user before proceeding — do not assume a default.**

**1. Build type** — pick one, then load its mode doc:

| Build type | Mode doc to load |
|---|---|
| Full website (multi-page) | `.claude/build-modes/full-website.md` |
| Campaign landing page | `.claude/build-modes/campaign-landing-page.md` |
| Single-page site / homepage | `.claude/build-modes/single-page-site.md` |

**2. Deployment stack** — pick one, then load its stack doc:

| Stack | Stack doc to load |
|---|---|
| Static HTML on GitHub Pages | `.claude/build-stacks/static-html.md` |
| Next.js + TypeScript | `.claude/build-stacks/nextjs.md` |

**Router rules:**

- Do **not** begin building until both the build type and the stack are confirmed. The first action in a new build is to ask these two questions if the brief does not answer them.
- Load exactly **one** mode doc and **one** stack doc for the session. Their rules apply on top of the universal standards in this file.
- The universal standards here set the **intent**; the stack doc owns the **mechanism**. Where they describe the same outcome by different means (metadata, robots, sitemap, fonts, the contrast gate's wiring), follow the stack doc's implementation.
- Any rule that names a Next.js construct (`generateMetadata`, `app/robots.ts`, RSC, `next/font`) is **not** universal — it lives in the Next.js stack doc and does not apply to a static-HTML build.

---

## Universal SEO Requirements

Apply all of the following to every page, in every mode and stack:

- **Schema markup (LD-JSON):** Reference and apply the website-schema-builder skill. JSON-LD must be present in the **served HTML** — never injected by client-side JavaScript. (Mechanism per stack: server-rendered in Next.js; written directly into `<head>` for static HTML.)
- **Descriptive CSS class names** throughout all components
- **Lazy load** all non-hero images; **priority/eager load** all hero images
- **Alt text** on every image — no exceptions
- **Meta title** and **meta description** on every page
- **OG title** unique from the meta title; **OG description** unique from the meta description
- **OG feature image** unique per page; if none are available in the repository, add applicable stock images from sources that allow free commercial use
- **Internal linking** throughout content where contextually relevant
- **Proper typographic hierarchy** — one H1 per page; H2s, H3s follow in logical order
- **H2s written as questions** based on how users search, when appropriate
- **FAQ sections** added to strategic pages — do not add FAQs to every page by default
- **Write with E-E-A-T in mind** — reference the eeat-content-writer skill
- **Per-page metadata in the served HTML on first response**, not injected by JavaScript. See your stack doc for the mechanism (`generateMetadata` for Next.js; hand-authored `<head>` for static HTML).

### Agentic Readiness for AI Search Retrieval

These build-phase guardrails keep pages retrievable by Google's generative AI Search systems (AI Overviews, AI Mode) and other retrieval agents. The full audit framework runs once at final review (see Trigger-Loaded Skills below).

- All primary content must be present in the served DOM — never gated behind client-side fetches, hover states, modals, or interactions a headless retrieval agent cannot trigger
- Maintain semantic HTML throughout — use proper landmarks (`<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`); do not replace semantic elements with generic `<div>` wrappers
- Keep the accessibility tree intact — every interactive element must have an accessible name and role that an agent can parse
- Retrieval bots allowlisted in the robots policy (OAI-SearchBot, PerplexityBot, ClaudeBot, meta-externalagent) must remain unblocked at every layer — no CDN, middleware, or per-route disallow rules that shadow the robots policy
- Write content with genuine topical depth and breadth rather than narrow keyword targeting — Google's query fan-out retrieves pages that cover a subject thoroughly, not pages tuned to a single phrase

---

## Universal Accessibility Requirements

Reference the web-accessibility skill for full implementation guidance. At minimum:

- High color contrast — meet WCAG AA, target AAA where achievable; verify by **computing** every pairing (text, buttons, hover/focus states, borders, icons) with the skill's bundled `contrast-check.mjs` — never by eye — and run it as a build gate. Color contrast accessibility overrides brand-guide colors in every context
- ARIA labels on all interactive elements, forms, and controls
- Semantic HTML and proper document structure throughout
- Full keyboard navigation and focus management on every page
- Accessible forms with proper `aria-*` attributes and error states
- Conduct a final ADA compliance review before marking any page complete

---

## Universal Behavioral Psychology & UX Requirements

- Reference the hmm-behavioral-science-copywriting skill when writing any content
- Reference the laws-of-ux skill when making layout and UX decisions
- Write for humans using natural language patterns — avoid overly structured, robotic, or formulaic prose
- Apply behavioral science principles to CTAs, social proof placement, and conversion-focused copy

---

## Universal Content & Copy Rules

These rules apply to all copy written during any build:

- No contractions in formal brand writing
- No "First / Second / Third" or "First / Then / Finally" transition structures in paragraphs
- When using industry terms, pair them with a plain-language explanation in the same sentence
- Short copy is almost always better — default to the tightest possible version; if it can be cut, cut it
- Avoid generic marketing filler: "comprehensive solutions," "take your business to the next level," and similar phrases are not acceptable
- **Never fabricate** customer reviews, testimonials, statistics, client logos, offers, or scarcity. If a build mode calls for one of these and the brief does not supply it, ask for the details — do not invent it

---

## Universal Frontend Design Standards

Reference the frontend-design skill for full guidance. Core rules:

- Choose a clear aesthetic direction before writing any code and commit to it with precision
- Typography must be intentional — use distinctive, characterful fonts; avoid Inter, Roboto, Arial, and system font defaults
- Use CSS variables for all colors, typography, and spacing to support the Style Guide architecture
- Motion and animation should feel purposeful — one well-orchestrated page load with staggered reveals creates more impact than scattered micro-interactions. Apply motion when it genuinely benefits the experience, not decoratively
- Never produce generic "AI aesthetics" — no purple gradient on white defaults, no cookie-cutter component patterns

---

## Component Primitives Gallery

Build the interface from a single set of reusable **primitives** — small, self-contained components (button, link, input, select, textarea, checkbox/radio, card, badge/tag, alert, modal, accordion, tabs, tooltip, breadcrumb, pagination, avatar, and similar base elements) — and assemble those primitives into one **primitives gallery** so the entire build composes from a consistent, reusable set instead of one-off markup repeated page to page.

**Scope:** Applies to every build type and stack **except** a single-page site built on the static-HTML (vanilla) stack — a one-page hand-authored output does not justify a separate component library. Every other combination builds the gallery: full websites and campaign landing pages on either stack, and single-page sites on Next.js. If you are unsure whether a build falls inside this scope, the test is simple — if components are reused across more than one page or view, build the gallery.

- Build each primitive **once**, defining all of its variants and states in one place — default, hover, focus, active, disabled, error/invalid, and loading where relevant — then consume that primitive everywhere the element appears. Do not hand-author the same element twice.
- Drive every primitive from the Style Guide design tokens (CSS variables for color, typography, spacing, radius, shadow) so a single token change restyles the whole gallery and the whole build at once.
- Surface the gallery as a real, viewable artifact, not an internal abstraction (mechanism per stack):
  - **Next.js:** keep the primitives in the `/components` library folder and render them on a dedicated `/style-guide` (or `/primitives`) route that displays each primitive with its full set of variants and states.
  - **Static HTML:** render the primitives inside the `styleguide.html` page next to the design tokens. The static stack already mandates `styleguide.html` for full-website builds; produce it for an in-scope campaign build as well so the primitives have a home.
- Apply each primitive's accessibility contract once, at the primitive level — accessible name and role, keyboard operability, visible focus state — so every consumer inherits it automatically.
- Every primitive must clear the universal color-contrast build gate in **all** of its interactive states, not only its default state.

---

## Universal Global Elements

Include on every build, regardless of mode or stack (implementation mechanism per stack doc):

- Open Graph meta validation
- Canonical URL enforcement
- Security headers
- Global header / navigation appropriate to the build mode
- **Color contrast build gate** — scaffold the web-accessibility skill's bundled `contrast-check.mjs`, contrast manifest, and CI workflow into the build; wire it so any pairing below its WCAG AA target (or an invisible same-color token) blocks the build and the PR. The wiring differs by stack (a `prebuild` step for Next.js; a standalone script + CI check for static HTML)
- **IndexNow** — ping IndexNow on every content publish or revalidation to push URL discovery to Bing (and indirectly Google via Bing's sharing agreement) without waiting for passive crawl scheduling
- **Config integrity gate** — `.claude/scripts/validate-claude-config.mjs` verifies that every `@`-import in this file and every `references/`/`assets/`/`templates/` path inside each skill resolves to a real file. It runs at session start via the `SessionStart` hook in `.claude/settings.json` and as a required CI check, so a broken reference is surfaced immediately instead of failing silently mid-build

---

## Universal Hard Limitations — Never Do These

- Do not use writing patterns associated with AI-generated content: excessive em-dashes, frequent emoji use, overly symmetrical paragraph structure, or repetitive transition phrases
- Do not store hidden bulk text for bots that is not visible to human readers — this is a black-hat SEO tactic and is never acceptable
- Do not inject JSON-LD schema markup via JavaScript — it must be present in the served HTML on the first request so all crawlers, including AI retrieval bots that do not execute JavaScript, can read it
- Do not create, link to, or recommend `llms.txt` files as a strategy for appearing in Google AI Overviews or AI Mode — Google has explicitly stated it does not use them for AI Search ranking
- Do not chunk content into AI-specific blocks, write AI-only paragraph variants, or rewrite copy "for AI" — Google's systems understand nuance across full pages and handle synonyms and semantic meaning natively
- Do not over-engineer schema markup with the goal of improving AI Search visibility — schema is not required for AI Overviews or AI Mode; apply it for rich-result eligibility only, per the website-schema-builder skill
- Do not pursue inauthentic mentions, link schemes, paid citations, or fabricated brand references intended to surface a site inside AI answers — Google's core ranking and spam systems filter these signals and the tactic is counterproductive

Stack-specific prohibitions (Next.js config, RSC boundaries, font loading) live in the relevant stack doc and apply only on that stack.

---

## Build Sequence

Follow this sequence for every build:

1. **Run the Build Mode Router** — confirm build type and stack from `.claude/project-brief.md`, or ask. Load the matching mode doc and stack doc.
2. Read all skill files listed in the Required Skills section above.
3. Review the project brief (company info, style variables, optional inputs, any custom parameters).
4. Confirm the section/page architecture from the loaded mode doc — add or remove only if the brief explicitly instructs it.
5. Build component-by-component, starting with the design system and Style Guide variables. For every build in scope (see Component Primitives Gallery — all builds except a single-page static-HTML site), build the reusable primitives first and assemble them into the primitives gallery before composing page-level layouts.
6. Apply the stack doc's engineering rules (rendering, structure, metadata mechanism) before writing page-level code.
7. Apply accessibility rules to every component before marking it complete.
8. Apply Laws of UX to every layout decision.
9. Add LD-JSON schema markup to the served HTML on all key page types.
10. Write all copy using the HMM behavioral science skill guidelines.
11. Configure the robots policy and sitemap per the stack doc (bot differentiation rules apply on both stacks).
12. Implement IndexNow ping integration.
13. Conduct final review: SEO audit, accessibility audit (run the contrast build gate — `node scripts/contrast-check.mjs` — and confirm it exits clean), OG validation, canonical check, sitemap generation, and a raw-HTML check confirming content is visible without JavaScript.
14. Load the `google-ai-search-optimization` skill once at this point and run the full four-pillar audit (content quality, technical structure, local & ecommerce, agentic readiness) against the completed build before delivery — this is the only point in the build sequence where the full skill and its reference library should be pulled into context.

---

## Trigger-Loaded Skills — Do Not Auto-Import

These skills are intentionally excluded from the Required Skills list to keep build-phase context lean. Load them only at the specific trigger points named below — never proactively at session start, and never as part of the upfront `@`-import block.

- **`.claude/skills/google-ai-search-optimization/SKILL.md`** — Load at Build Sequence step 14 (final AI Search audit), or whenever the user explicitly asks about AI Overviews, AI Mode, AEO, GEO, generative AI search visibility, query fan-out, RAG retrieval, `llms.txt`, or asks Claude to fact-check or mythbust AEO/GEO advice. The build-phase guardrails from this skill — the mythbusting items in Hard Limitations and the Agentic Readiness subsection — are already inlined above, so routine creation work does not require the full skill in context.

---

© 2026 Hammonds Media & Marketing (HMM). Proprietary and confidential.
This document may not be reproduced, shared, or used outside of
HMM-authorized projects without prior written consent.
Contact: hello@hmm.agency
