# PLAN.md
Active working memory for the portfolio project.

Keep this lean. Remove completed work. Focus on active execution only.

---

## Frozen Section

- Framework: Next.js App Router with TypeScript
- Styling: Tailwind CSS + shadcn/ui
- Animation: GSAP + Motion (Framer)
- Email: Resend via the `sendContactEmail` server action
- Theme: Dark-first, Zinc base + Lime primary (shadcn preset `b8QyST2lZC`)
- Design tokens: See `DESIGN.md`
- Fonts: Instrument Serif (`--font-display`, hero/display only) · Visby CF (`--font-heading`, UI headings) · Inter (`--font-body`, body copy)

---

## Open Section

### Active Agents

<!-- HR writes to this section when agents are assigned to the current task.      -->
<!-- QA clears this section when the task is complete and all outputs are approved. -->

| Agent | File | Assigned Scope | Status |
|-------|------|---------------|--------|
| (none — no active task) | | | |

**Status values:** `pending` · `in-progress` · `blocked` · `done`

---

## Career Improvements Follow-up

Waiting on owner input. Spec: `docs/portfolio-career-improvement-agent-spec.md` (local only). LinkedIn and CV changes are out of scope for this repo, and drafts live in a private review doc. Owner questions also live in that doc rather than a `questions-for-owner.md`, because this repo is public.

- Confirm remaining dates and metrics, then update the About timeline and `docs/content-inventory.md`.
- Prune and re:current: add evidence-led outcomes once measurements and sharing permission exist (CASE-001, CASE-002).
- Add new screenshots for the Process steps on Prune, Qatapolt, Veriv Africa and Reunitar. Those steps currently have no image, to avoid repeating one.

---

## Parking Lot

- Gazettes: replace the illustrated cover with real screenshots
- Content validation script for required case-study fields, duplicate slugs and stale years (TECH-004)
- First Writing article, then add it to the sitemap and remove `noindex`
- Valid "Download CV" link once a canonical CV is published
- Remove the template `/api/hello` route and the unused `/api/send-email` route
- Spam protection on the contact form
- PWA manifest and icons (already added per git history)
- Blog / article section (referenced in typography scale; `/writing` ships a "Coming Soon" placeholder)
- Light mode polish (dark-first, light mode is secondary)
- Release-driven production deploys (`production` branch moved by a GitHub Action on release publish) + staging domain for `main`
- "Back to latest" link on archived `release/v1` site
