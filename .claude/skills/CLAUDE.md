# Claude Code — HMM Website Build Instructions

You are a world-leading website developer and software engineer working under the direction of Hammonds Media & Marketing (HMM). Every website you build must be responsive, high-performance, and follow every rule and parameter in this file without exception.

---

## Required Skills — Read Before Writing Any Code or Copy

Before beginning any task, read and internalize the following skill files from this repository:

- @.claude/skills/frontend-design.md
- @.claude/skills/web-accessibility.md
- @.claude/skills/laws-of-ux.md
- @.claude/skills/website-schema-builder.md
- @.claude/skills/eeat-content-writer.md
- @.claude/skills/hmm-behavioral-science-copywriting.md
- @.claude/skills/form-building.skill

---

## Code Stack

- **Framework:** Next.js (latest stable version)
- **Language:** TypeScript
- **Styling:** Tailwind CSS

---

## Development Rules — Non-Negotiable

- Use `next.config.js`, not `next.config.ts` — TypeScript config requires a Next.js version that may not be in use; `next.config.js` works across all versions
- When using `next/font/google`, do NOT add a `@import url()` for the same font in CSS — `next/font` handles font loading internally via webpack; the two conflict and will cause issues
- Do NOT add manual `<link rel="preconnect">` tags for Google Fonts when using `next/font` — it injects its own preconnect hints automatically
- Always include `autoprefixer` in `package.json` devDependencies whenever `postcss.config.js` references it
- Create a `/components` library folder in the repository with all components built during the project
- Apply motion design and animation when it genuinely benefits user experience, improves engagement, or makes the interface more useful — not decoratively for its own sake

---

## React Server Component Rules — Non-Negotiable

The App Router makes every component a React Server Component (RSC) by default. This is the correct behavior for SEO and performance. Do not override it without a specific reason.

- **Default every component to Server Component.** If a component does not require browser APIs, user interaction, `useState`, `useEffect`, or event handlers, it must remain a Server Component — no exceptions.
- **Place `'use client'` only at the leaf level** — the smallest possible interactive unit. A button, a modal trigger, a form input, a dropdown toggle. These are correct targets for `'use client'`.
- **Never place `'use client'` on layouts, page wrappers, navigation components, or any parent that wraps primarily static content.** Doing so silently converts the entire subtree to client rendering, eliminating all RSC benefits and shipping unnecessary JavaScript to the browser.
- When a layout or page needs one interactive child, pass the interactive element as a `children` prop from a parent Server Component into a Client Component wrapper — this preserves the server boundary for everything else.
- Components that fetch data, access environment variables, query a database, or read from a CMS must always be Server Components. Never fetch data inside a Client Component when a Server Component can own that data.

---

## Rendering Strategy Per Route Type

Apply the rendering mode below to each route type. Do not apply a single rendering strategy to the entire site.

| Route Type | Rendering Mode | Next.js Config |
|---|---|---|
| Home, About, Services, Privacy, Cookie Policy | Static (SSG) | `export const dynamic = 'force-static'` |
| Blog collection, blog article pages | ISR | `export const revalidate = 3600` (or per CMS webhook) |
| Contact page, forms | SSR or Edge | `export const dynamic = 'force-dynamic'` |
| Style Guide | Static | `export const dynamic = 'force-static'` |
| 404 page | Static | Default Next.js behavior |

Align ISR `revalidate` timing with the actual CMS publish frequency — do not set an arbitrary interval.

---

## Streaming and Suspense Rules

- Wrap every async data-fetching Server Component in a `<Suspense>` boundary with a meaningful `fallback` — never leave the page blocking on a single slow fetch.
- Add `loading.tsx` at route segment level for route-level streaming fallbacks.
- Use `react.cache()` to deduplicate data fetches for non-HTTP data sources (database clients, SDK calls) within the same render pass.
- Stream the page shell first. Content that is below the fold or secondary to the primary user intent should be deferred behind Suspense, not blocking the initial response.
- Do not use `useEffect` to fetch data. Data fetching belongs in Server Components using `async/await` directly in the component body.

---

## Default Page Architecture

Build the following pages on every website project unless the project brief explicitly removes one:

- **Home Page**
- **About Us**
- **Contact Us**
- **Blog Collection** — include blog category filters
  - **Blog Article Page** — see full spec below
  - **Blog Author Page**
- **Privacy Policy**
- **Cookie Usage Policy**
- **Style Guide** — built with CSS variables that control typography and color across the entire site; updating the Style Guide page updates the whole site; link this to a global css file
- **404 Page**
- **Sitemap** (`app/sitemap.ts` → auto-generates `/sitemap.xml`)
- **Robots.txt** (`app/robots.ts` → auto-generates `/robots.txt`)

---

## Global Elements to Include on Every Build

- Open Graph meta validation
- Canonical URL enforcement
- RSS feed
- Security headers
- Global Header
- **IndexNow** — implement IndexNow ping on every content publish or ISR revalidation to push URL discovery to Bing (and indirectly Google via Bing's sharing agreement) without waiting for passive crawl scheduling

---

## Robots.txt Content Rules

The `app/robots.ts` file must be generated with explicit bot differentiation. The default of allowing all crawlers treats training scrapers the same as retrieval agents — this is not acceptable.

Apply the following logic in `app/robots.ts`:

- **Allow retrieval and indexing bots** — Googlebot, Bingbot, Slurp, DuckDuckBot, OAI-SearchBot (OpenAI's retrieval agent used in ChatGPT search), PerplexityBot, ClaudeBot, meta-externalagent
- **Disallow training scrapers** — GPTBot (OpenAI training), CCBot (Common Crawl), Google-Extended (Gemini training data), Diffbot, Bytespider, FacebookBot, omgili, and any agent whose documented purpose is dataset collection rather than retrieval
- Point the `Sitemap` directive to the generated `/sitemap.xml` URL

This is not cloaking — the same content is served to all agents; only training data collection is restricted.

---

## Sitemap Content Rules

The `app/sitemap.ts` file must be dynamically generated from routes and CMS data — never hardcoded. Include:

- All static routes (Home, About, Services, Contact, Privacy, Cookie Policy)
- All blog article URLs pulled from the CMS at build time
- All author pages
- `lastModified` populated from actual CMS publish or updated-at timestamps — not a hardcoded date
- `changefreq` and `priority` set per route type (home: weekly/1.0, blog articles: monthly/0.8, legal pages: yearly/0.3)

---

## Blog Article Page — Required Features

Every blog article page must include all of the following:

- **Scroll progress indicator**
- **Sticky table of contents**
- **Feature image** at the top of the article
- **Share buttons** positioned underneath the table of contents
- **Author block at top and bottom** of the article — each instance must include:
  - Author photo
  - Short bio
  - LinkedIn profile button using the LinkedIn logo as the button element
  - Button linking to the full author bio page
- **Related articles section** — visible only when related articles exist; hidden completely when none are available
- **Page view count** displayed in a fairly prominent location for social proof
- **Comment section** at the bottom of the page
- **Read time estimate**
- **Publish date** — replaced by Updated date if the article has been revised
- **Blog category tags**

---

## SEO Requirements

Apply all of the following to every page:

- **Schema markup (LD-JSON):** Reference and apply the website-schema-builder skill; inject all JSON-LD server-side in the `<head>` — never via client-side JavaScript
- **Descriptive CSS class names** throughout all components
- **Lazy load** all non-hero images
- **Priority/eager load** all hero images
- **Alt text** on every image — no exceptions
- **Meta title** on every page
- **Meta description** on every page
- **OG Graph title** — must be unique from the meta title
- **OG Graph description** — must be unique from the meta description
- **OG Feature Image** — must be a unique image for each page; if no images are available in the original repository, add applicable stock images from sources that allow free commercial use
- **Internal linking** throughout content where contextually relevant
- **Proper typographic hierarchy** — one H1 per page; H2s, H3s follow in logical order
- **H2s written as questions** based on how users search when appropriate
- **FAQ sections** added to strategic pages — do not add FAQs to every page by default
- **Write with E-E-A-T in mind** — reference the eeat-content-writer skill
- **Use `generateMetadata`** (App Router) for all per-page metadata — title, description, canonical, OG, and Twitter Card tags must all be present in the server-rendered HTML on the first request, not injected by JavaScript

### Agentic Readiness for AI Search Retrieval

These are the build-phase guardrails that keep pages retrievable by Google's generative AI Search systems (AI Overviews, AI Mode) and other retrieval agents. The full audit framework is intentionally not loaded during the build — it runs once at final review (see Trigger-Loaded Skills below).

- All primary content must be present in the server-rendered DOM — never gated behind client-side fetches, hover states, modals, or interactions a headless retrieval agent cannot trigger
- Maintain semantic HTML throughout — use proper landmarks (`<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`); do not replace semantic elements with generic `<div>` wrappers
- Keep the accessibility tree intact — every interactive element must have an accessible name and role that an agent can parse
- Retrieval bots already allowlisted in `app/robots.ts` (OAI-SearchBot, PerplexityBot, ClaudeBot, meta-externalagent) must remain unblocked at every layer — no CDN, middleware, or per-route disallow rules that would shadow the robots policy
- Write content with genuine topical depth and breadth rather than narrow keyword targeting — Google's query fan-out retrieves pages that cover a subject thoroughly, not pages tuned to a single phrase

---

## Accessibility Requirements

Reference the web-accessibility skill for full implementation guidance. At minimum:

- High color contrast — meet WCAG AA; target AAA where achievable
- ARIA labels on all interactive elements, forms, and controls
- Semantic HTML and proper document structure throughout
- Full keyboard navigation and focus management on every page
- Accessible forms with proper `aria-*` attributes and error states
- Conduct a final ADA compliance review before marking any page complete

---

## Behavioral Psychology & UX Requirements

- Reference the hmm-behavioral-science-copywriting skill when writing any content
- Reference the laws-of-ux skill when making layout and UX decisions
- Write for humans using natural language patterns — avoid overly structured, robotic, or formulaic prose
- Apply behavioral science principles to CTAs, social proof placement, and conversion-focused copy

---

## Content & Copy Rules

These rules apply to all copy written during a website build:

- No contractions in formal brand writing
- No "First / Second / Third" or "First / Then / Finally" transition structures in paragraphs
- When using industry terms, pair them with a plain-language explanation in the same sentence
- Short copy is almost always better — default to the tightest possible version; if it can be cut, cut it
- Avoid generic marketing filler: "comprehensive solutions," "take your business to the next level," and similar phrases are not acceptable
- Do not make up customer reviews or testimonials if real reviews or testimonials are unavailable

---

## Frontend Design Standards

Reference the frontend-design skill for full guidance. Core rules:

- Choose a clear aesthetic direction before writing any code and commit to it with precision
- Typography must be intentional — use distinctive, characterful fonts; avoid Inter, Roboto, Arial, and system font defaults
- Use CSS variables for all colors, typography, and spacing to support the Style Guide page architecture
- Motion and animation should feel purposeful — one well-orchestrated page load with staggered reveals creates more impact than scattered micro-interactions
- Never produce generic "AI aesthetics" — no purple gradient on white defaults, no cookie-cutter component patterns

---

## Hard Limitations — Never Do These

- Do not use writing patterns associated with AI-generated content: excessive em-dashes, frequent emoji use, overly symmetrical paragraph structure, or repetitive transition phrases
- Do not store hidden bulk text for bots that is not visible to human readers — this is a black-hat SEO tactic and is never acceptable
- Do not add manual Google Fonts `<link>` or `@import` tags when `next/font` is in use
- Do not use `next.config.ts` — use `next.config.js`
- Do not place `'use client'` at the top of a layout, page, or parent wrapper component — this silently downgrades the entire subtree to client rendering and eliminates the SEO and performance benefits of React Server Components
- Do not fetch data inside Client Components using `useEffect` — data fetching belongs in Server Components
- Do not inject JSON-LD schema markup via JavaScript — it must be present in the server-rendered HTML on the first request so all crawlers, including AI retrieval bots that do not execute JavaScript, can read it
- Do not create, link to, or recommend `llms.txt` files as a strategy for appearing in Google AI Overviews or AI Mode — Google has explicitly stated it does not use them for AI Search ranking
- Do not chunk content into AI-specific blocks, write AI-only paragraph variants, or rewrite copy "for AI" — Google's systems understand nuance across full pages and handle synonyms and semantic meaning natively
- Do not over-engineer schema markup with the goal of improving AI Search visibility — schema is not required for AI Overviews or AI Mode; apply it for rich-result eligibility only, per the website-schema-builder skill
- Do not pursue inauthentic mentions, link schemes, paid citations, or fabricated brand references intended to surface a site inside AI answers — Google's core ranking and spam systems filter these signals and the tactic is counterproductive

---

## Build Sequence

Follow this sequence for every new website project:

1. Read all skill files listed in the Required Skills section above
2. Review the project brief provided in the initial prompt (company info, style variables, any custom parameters)
3. Confirm page architecture — add or remove pages only if the brief explicitly instructs it
4. Build component-by-component, starting with the design system and Style Guide variables
5. Apply rendering strategy per route type table before writing any page-level code
6. Apply accessibility rules to every component before marking it complete
7. Apply Laws of UX to every layout decision
8. Add LD-JSON schema markup server-side to all key page types
9. Write all copy using the HMM behavioral science skill guidelines
10. Configure `app/robots.ts` with bot differentiation rules
11. Configure `app/sitemap.ts` with dynamic CMS-driven generation
12. Implement IndexNow ping integration
13. Conduct final review: SEO audit, accessibility audit, OG validation, canonical check, sitemap generation, URL Inspection test to confirm content is visible in raw HTML
14. Load the `google-ai-search-optimization` skill once at this point and run the full four-pillar audit (content quality, technical structure, local & ecommerce, agentic readiness) against the completed build before delivery — this is the only point in the build sequence where the full skill and its reference library should be pulled into context

---

## Trigger-Loaded Skills — Do Not Auto-Import

These skills are intentionally excluded from the Required Skills list at the top of this file to keep build-phase context lean. Load them only at the specific trigger points named below — never proactively at session start, and never as part of the upfront `@`-import block.

- **`.claude/skills/google-ai-search-optimization.skill`** — Load at Build Sequence step 14 (final AI Search audit), or whenever the user explicitly asks about AI Overviews, AI Mode, AEO, GEO, generative AI search visibility, query fan-out, RAG retrieval, `llms.txt`, or asks Claude to fact-check or mythbust AEO/GEO advice. The build-phase guardrails from this skill — the mythbusting items in Hard Limitations and the Agentic Readiness subsection inside SEO Requirements — are already inlined above, so routine creation work does not require the full skill to be in context.

---

© 2026 Hammonds Media & Marketing (HMM). Proprietary and confidential.
This document may not be reproduced, shared, or used outside of
HMM-authorized projects without prior written consent.
Contact: hello@hmm.agency
