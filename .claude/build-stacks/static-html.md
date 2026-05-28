# Build Stack — Static HTML on GitHub Pages

Loaded by the Build Mode Router in `CLAUDE.md` when the deployment stack is
static HTML deployed to GitHub Pages. Owns the engineering mechanism for the
universal standards. Applies on top of `CLAUDE.md` and the chosen mode doc.

This stack is hand-authored HTML, CSS, and vanilla JavaScript — no framework, no
build step required. It suits quick capability demos for prospective clients and
lightweight landing pages. Every universal standard still applies; only the
mechanism changes.

---

## Code Stack

- **Markup:** semantic HTML5
- **Styling:** plain CSS with custom properties (CSS variables) for the design system
- **Behavior:** vanilla JavaScript (no framework). Keep JS minimal and progressive — the page must be fully readable and the content fully present with JavaScript disabled.

---

## File Structure

Output the deployable site into a `site/` directory at the repo root (this is
what the Pages workflow publishes):

```
site/
├── index.html
├── <other-pages>.html          (full-website mode only)
├── assets/
│   ├── css/styleguide.css       Design tokens (:root variables) + base styles
│   ├── css/<page>.css
│   ├── js/attribution.js        From the form-building static variant (if a form exists)
│   ├── img/
│   └── fonts/                   Self-hosted fonts (optional)
├── robots.txt
├── sitemap.xml
└── rss.xml                      (full-website mode only)
```

Use **relative asset paths** so the site works from a project-pages subpath
(`username.github.io/repo/`) as well as a custom domain.

---

## `<head>` Metadata Mechanism

All per-page metadata is hand-authored directly in each page's `<head>` — it is
in the served HTML on first response by definition. Every page includes:

- `<title>` (meta title) and `<meta name="description">`
- `<link rel="canonical">` with the absolute URL
- Open Graph: `og:title`, `og:description` (each unique from the meta title/description), `og:image` (unique per page), `og:url`, `og:type`
- Twitter Card tags
- **JSON-LD** in a `<script type="application/ld+json">` block written directly into the HTML — never injected by JavaScript. Use the website-schema-builder skill.

---

## Fonts

Load fonts with a standard `<link>` to the provider (or self-host under
`assets/fonts/`). Add `<link rel="preconnect">` hints for the font origin.

> **Note:** This reverses the Next.js stack's prohibition. The "no Google Fonts
> `<link>`/`@import`" rule exists only because `next/font` manages loading; on
> static HTML the `<link>` is the correct, expected mechanism.

---

## Design System / Style Guide

Define all design tokens as CSS custom properties in `:root` inside
`assets/css/styleguide.css` (colors, typography, spacing). Every other
stylesheet consumes these variables, so editing the tokens restyles the whole
site. For full-website builds, also produce a human-readable `styleguide.html`
that renders the tokens.

---

## Robots Policy — static `robots.txt`

Write a static `site/robots.txt`. Apply the same bot-differentiation content as
the Next.js stack:

- **Allow retrieval and indexing bots** — Googlebot, Bingbot, Slurp, DuckDuckBot, OAI-SearchBot, PerplexityBot, ClaudeBot, meta-externalagent
- **Disallow training scrapers** — GPTBot, CCBot, Google-Extended, Diffbot, Bytespider, FacebookBot, omgili, and any agent whose documented purpose is dataset collection rather than retrieval
- Add a `Sitemap:` line pointing to the absolute `sitemap.xml` URL

This is not cloaking — the same content is served to all agents; only training
data collection is restricted.

---

## Sitemap — static `sitemap.xml`

Write a static `site/sitemap.xml` listing every page with a real `<lastmod>`
date. For multi-page (full-website) builds, include every HTML page and set
`<changefreq>`/`<priority>` per route type. For a single landing page, a
one-entry sitemap is correct.

---

## Images

- Hero images: load eagerly (no `loading` attr, or `loading="eager"`) and mark `fetchpriority="high"`.
- All non-hero images: `loading="lazy"` and `decoding="async"`.
- Alt text on every image — no exceptions.
- Provide explicit `width`/`height` (or `aspect-ratio` in CSS) to avoid layout shift.

---

## Color Contrast Build Gate (static wiring)

The contrast gate is dependency-free and stack-agnostic, so it carries over —
only the trigger differs (there is no `next build`):

- Copy the web-accessibility skill's `assets/contrast-check.mjs` → `scripts/contrast-check.mjs` and `contrast.config.example.json` → `accessibility/contrast.config.json`. Point `cssFiles` at `site/assets/css/styleguide.css`.
- Add an npm script `"contrast": "node scripts/contrast-check.mjs"` (a minimal `package.json` is fine even though the site itself needs no build).
- Copy `accessibility-contrast.yml` → `.github/workflows/` so it runs on every push and PR.
- Run `node scripts/contrast-check.mjs` manually before delivery and confirm it exits clean.

---

## IndexNow

On publish, submit the changed URLs to IndexNow (a simple HTTPS GET/POST with
the site's IndexNow key). Host the key file at `site/<key>.txt`. No server is
required — the ping can be a one-off curl during the publish step.

---

## Deployment — GitHub Pages

Deployment is handled by `.github/workflows/deploy-pages.yml`, which publishes
the `site/` directory via the GitHub Pages Actions flow. Requirements:

- In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
- The workflow skips cleanly until a `site/` directory exists, so it does not fail on an empty template.

---

## Forms

Use the `form-building` skill's **static variant** in `templates/static/`:

- `templates/static/contact-form.html` — a progressively-enhanced form with the honeypot and hidden tracking inputs. Its `action` posts to the form endpoint, so it works even with JavaScript disabled.
- `templates/static/attribution.js` — vanilla port of `AttributionTracker` + the populate/submit logic: captures last-touch UTM/`gclid`/`msclkid`/external-referrer to `localStorage`, populates the hidden inputs, and upgrades submit to an AJAX `fetch` with `Accept: application/json`.

Copy both into `site/`, set the form `action` to the real Formspree (or other)
endpoint from the brief — **ask if it is not supplied** — and include
`attribution.js` with `<script defer>`.
