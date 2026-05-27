---
name: web-accessibility
description: ADA/WCAG web accessibility auditing, code review, and remediation for websites and web applications. Use this skill whenever the user asks about web accessibility, ADA compliance, WCAG standards, ARIA attributes, screen reader support, keyboard navigation, color contrast, alt text, accessible forms, or any request to audit, fix, or write accessible HTML/CSS/JS. Also trigger when the user shares code or a URL and asks if it's accessible, mentions "a11y", asks about Title II or Title III ADA requirements, references assistive technology (screen readers, VoiceOver, NVDA, JAWS), or wants to make their Webflow, WordPress, Shopify, or Wix site compliant. Always use this skill — do not rely on general knowledge alone for accessibility tasks.
---
 
# Web Accessibility Skill
**ADA/WCAG Compliance Auditing, Code Review, and Remediation**
 
## Authority Sources (Bundled)
- `references/ada-web-accessibility-checklist.md` — Full WCAG 2.1/2.2 AA developer checklist, organized by POUR principle. Load for audits, compliance questions, and deliverable generation.
- `references/aria-reference-guide.md` — Complete ARIA 1.2 implementation reference with code patterns. Load for any ARIA attribute question, custom widget implementation, or screen reader behavior question.
**Baseline Standard:** WCAG 2.1 Level AA (ADA Title II legal minimum)
**Recommended Target:** WCAG 2.2 Level AA (future-proof)
**Legal Authority:** ADA Title II (gov/education) + Title III (public businesses), DOJ Guidance (2024)
 
> ⚠️ **Critical reminder to always surface:** Overlay widgets (AccessiBe, UserWay, AudioEye) do NOT provide legal compliance and have been cited in ADA lawsuits. All fixes must be in source code. Automated scanning catches only ~30–40% of issues — manual testing is required.
 
---
 
## When to Load Reference Files
 
**Load `ada-web-accessibility-checklist.md` when:**
- Performing a full or partial site audit
- Answering questions about specific WCAG success criteria (e.g., "what's the contrast ratio requirement?")
- Generating an Accessibility Conformance Report (ACR) or Accessibility Statement
- Explaining ADA Title II vs. Title III obligations
- Creating a compliance checklist or project brief for a developer
**Load `aria-reference-guide.md` when:**
- Reviewing or writing HTML/JS with ARIA attributes
- Implementing custom widgets (modals, tabs, accordions, dropdowns, sliders)
- Answering any question that includes: aria-*, role=, tabindex, screen reader, live region, focus management
- Debugging assistive technology behavior
**Load both when:**
- Doing a comprehensive code review
- Answering "is this site ADA compliant?" with code provided
- Building an accessible component from scratch
---
 
## Task Workflows
 
### 1. Code Audit
When the user provides HTML/CSS/JS or a URL to review:
1. Load both reference files
2. Evaluate against all four POUR principles (Perceivable, Operable, Understandable, Robust)
3. Flag issues by WCAG success criterion and severity (Level A = must fix, AA = must fix, AAA = recommended)
4. For each issue: state the problem, cite the SC number, and provide a corrected code snippet
5. Summarize with a prioritized fix list — critical blockers first
### 2. Accessible Component Build
When the user asks to write or fix a specific UI component:
1. Load `aria-reference-guide.md`
2. Follow the 5 Rules of ARIA — prefer native HTML over ARIA
3. Include: correct role, name, state attributes, keyboard interaction pattern, and focus management
4. Always include the `.visually-hidden` / `.sr-only` CSS utility if needed
5. Note which screen reader + browser combos to test against
### 3. Compliance Question
When the user asks a legal or standards question:
1. Load `ada-web-accessibility-checklist.md`
2. Cite the correct authority (DOJ guidance, WCAG SC number, ADA Title)
3. Reference the Compliance Standard Quick Reference table for jurisdiction-specific requirements
4. Remind: overlay widgets are not a legal solution
### 4. Audit Report / ACR Generation
When the user needs a deliverable document:
1. Load `ada-web-accessibility-checklist.md`
2. Structure the output with: Executive Summary → Findings by POUR Principle → Priority Matrix → Remediation Recommendations → Testing Methodology → Accessibility Statement template
3. Format using `- [ ] task` checkbox format for actionable items
4. Note conformance level achieved and gaps
---
 
## Severity Classification
 
| Level | Label | Meaning |
|-------|-------|---------|
| WCAG A | 🔴 Critical | Blocks access entirely for some users — fix before launch |
| WCAG AA | 🟠 High | ADA legal minimum — fix before launch |
| WCAG AAA | 🟡 Recommended | Above and beyond — prioritize for education, gov, healthcare |
| Best Practice | 🔵 Enhancement | Not required, but improves experience significantly |
 
---
 
## Key Principles to Apply in Every Response
 
- **No ARIA is better than bad ARIA** — incorrect attributes actively break screen readers
- **Always pair color with text/icon cues** — color alone is never sufficient
- **Contrast minimums:** 4.5:1 for normal text, 3:1 for large text and UI components
- **Focus must always be visible** — never remove the browser outline without a replacement
- **Every interactive element must be keyboard operable** — no mouse-only interactions
- **Live regions** (aria-live, role="alert", role="status") handle dynamic content announcements
- **Testing stack:** axe DevTools or WAVE for automated scan → manual keyboard test → screen reader test (NVDA + Chrome, VoiceOver + Safari)
---
 
## Platform-Specific Notes
 
| Platform | Common Issues |
|----------|--------------|
| Webflow | Custom interactions often break keyboard access; lightboxes may trap focus; CMS images need alt text workflow |
| Shopify | Cart drawer focus management; custom Liquid components often lack ARIA states |
| WordPress / WooCommerce | Plugin-generated content frequently has poor landmark structure and missing form labels |
| Wix Studio | Iframes and scroll animations can break screen reader reading order |
| Next.js / React | Client-side routing must manage focus on route change; SPAs need aria-live for content updates |
 
---
 
## Compliance Standard Quick Reference
 
| Context | Required Standard |
|---|---|
| U.S. federal agencies | Section 508 / WCAG 2.0 AA |
| U.S. state & local governments | ADA Title II / WCAG 2.1 AA |
| U.S. private businesses | ADA Title III / WCAG 2.1 AA (via litigation) |
| EU/European markets | EN 301 549 / EAA / WCAG 2.1 AA |
| Federal contractors/vendors | Section 508 (VPAT required) |
 
---
 
## Key Reference Links
 
- WCAG 2.1: https://www.w3.org/TR/WCAG21/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- ADA Title II Final Rule (2024): https://www.ada.gov/resources/2024-03-08-web-rule/
- ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/
- Section 508: https://www.section508.gov/manage/laws-and-policies/
- DOJ ADA Web Guidance: https://www.ada.gov/resources/web-guidance/
---
 
© 2027 Hammonds Media & Marketing (HMM). Proprietary and confidential.
This document may not be reproduced, shared, or used outside of
HMM-authorized projects without prior written consent.
Contact: [hello@hmm.agency](mailto:hello@hmm.agency)
