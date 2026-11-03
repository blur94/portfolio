# PLAN.md
Active working memory for the pre-portfolio project.

Keep this lean. Remove completed work. Focus on active execution only.

---

## Frozen Section

- Framework: Next.js App Router with TypeScript
- Styling: Tailwind CSS + shadcn/ui
- Animation: GSAP + Motion (Framer)
- Email: Resend via API route at `/api/send-email`
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

## Parking Lot

- PWA manifest and icons (already added per git history)
- SEO metadata polish per page
- Blog / article section (referenced in typography scale; `/writing` now ships a "Coming Soon" placeholder page and the Writing nav link points to it)
- Light mode polish (dark-first, light mode is secondary)
- Release-driven production deploys (`production` branch moved by a GitHub Action on release publish) + staging domain for `main`
- "Back to latest" link on archived `release/v1` site
