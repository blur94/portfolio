# DECISIONS.md

Long-term architectural and product decisions for portfolio.

Only durable decisions belong here. Always record _why_ — not just what.

---

## Active Decisions

### Framework: Next.js App Router

**Date:** 2025-05 (project init)
**Decision:** Use Next.js with the App Router (not Pages Router).
**Reason:** App Router enables React Server Components, layouts, and streaming — better for a content-heavy portfolio. Next.js 16 is in use.
**Implications:** All pages live under `src/app/`. API routes live under `src/app/api/`. No `pages/` directory.

---

### Styling: Tailwind CSS + shadcn/ui

**Date:** 2025-05 (project init)
**Decision:** Tailwind CSS as the utility framework; shadcn/ui for reusable components.
**Reason:** shadcn/ui gives full component ownership (no external package dependency) while Tailwind keeps styling co-located with markup.
**Implications:** shadcn components are copied into `src/components/ui/` and owned by this repo. Do not `npm install` shadcn component packages. Use `npx shadcn add <component>` to add new ones.

---

### Theme: Zinc + Lime (shadcn preset b8QyST2lZC)

**Date:** 2025-05-14
**Decision:** Use shadcn's Zinc base color with Lime primary. Override dark `--background` to `oklch(0 0 0)` (pure black) to match DESIGN.md `bg/page` token.
**Reason:** Lime (`#f2fb7a`) is already the brand accent in the Figma design — making it the shadcn primary unifies the component library and the design system. Zinc provides the modern neutral dark-gray scale. Evaluated in dark mode — the primary experience. Violet was considered and rejected: too close to generic SaaS purple.
**Implications:** All `--primary` usages render in lime. The lime primary IS the DESIGN.md `accent/primary` token — they are the same color, not two separate systems.

---

### Animation: GSAP + Motion (Framer Motion)

**Date:** 2025-05 (project init)
**Decision:** Use both GSAP (via `@gsap/react`) and Motion for animations.
**Reason:** GSAP for complex timeline animations and scroll-triggered sequences; Motion for simpler component-level transitions.
**Implications:** Do not add a third animation library. If a new animation need arises, use one of these two.

---

### Email: Resend

**Date:** 2025-05 (migrated from nodemailer)
**Decision:** Contact form email delivery via Resend SDK.
**Reason:** Resend is simpler to configure for transactional email in serverless (Next.js API routes) than nodemailer. Migrated per git history.
**Implications:** `RESEND_API_KEY` env var required. Email sending logic lives in `src/app/api/send-email/route.ts`.

---

### Package Manager: pnpm

**Date:** 2025-05 (project init)
**Decision:** Use pnpm as the package manager.
**Reason:** Faster installs, strict dependency resolution, disk-efficient.
**Implications:** Use `pnpm add` / `pnpm install`. Do not use npm or yarn. `pnpm-lock.yaml` is the lockfile.

---

### Design Source of Truth: DESIGN.md + Figma

**Date:** 2025-05-13
**Decision:** All visual tokens (colors, typography, spacing, radius) are documented in `DESIGN.md`, extracted from the Figma file `Portfolio`.
**Reason:** Single source of truth prevents drift between design and code. AI agents must read `DESIGN.md` before any UI work.
**Implications:** If a design token changes, update `DESIGN.md` first, then the code.

---

### Style Guide: STYLE.md as Daily Reference

**Date:** 2026-05-20
**Decision:** Add `STYLE.md` as a compact style and implementation-pattern reference derived from the current repo.
**Reason:** `DESIGN.md` contains exact Figma tokens, while future implementation work benefits from a shorter guide that captures product feel, stack boundaries, typography roles, color usage, component conventions, and agent workflow.
**Implications:** `DESIGN.md` remains the source of truth for exact visual tokens. `STYLE.md` should summarize, not replace, those decisions and must be updated when durable style guidance changes.

---

### Component Co-location Strategy

**Date:** 2025-05-14
**Decision:** Shared layout components (`Nav`, `Footer`, `CTASection`, `LiveBadge`) live in `src/components/`. Page-specific section components (e.g. `HeroSection`, `TechStacksCard`) also live in `src/components/` — not colocated inside `src/app/` route folders.
**Reason:** All section components are candidates for reuse across pages (e.g. `CTASection` appears on every page). Keeping them in `src/components/` keeps the `app/` directory clean and route-focused.
**Implications:** `src/app/*/page.tsx` files are thin assemblers — they import and compose section components, they don't define them inline.

---

### Typography Split: Display vs. Heading vs. Body

**Date:** 2025-05-14
**Decision:** Three distinct font roles enforced at the CSS base layer:

- `h1` → Instrument Serif italic (`--font-display`) — hero/display moments only
- `h2`, `h3` → Visby CF upright (`--font-heading`) — all UI section headings
- `body` → Inter (`--font-body`) — all running text
- `html` → Visby CF via `font-sans` — shadcn UI components (buttons, labels, inputs)
  **Reason:** Matches DESIGN.md exactly. Instrument Serif loses its impact if used everywhere. Visby CF handles all UI weight.
  **Implications:** Never use `font-display` or Instrument Serif on anything below `h1`. Hero split text (e.g. "Hi there, I'm **Gilead Odo**") is achieved with inline `<em>` + `<strong>` spans, not separate heading levels.

---

### Hero Typography Pattern

**Date:** 2025-05-14
**Decision:** The hero heading split — italic serif for the dim half, bold sans for the name — is implemented as a single `<h1>` containing two `<span>` elements: one with `font-display italic` (Instrument Serif) and one with `font-heading font-bold` (Visby CF). Not two separate elements.
**Reason:** Matches Figma exactly. The two halves are semantically one heading. Keeping them in one `<h1>` preserves correct document outline and GSAP SplitText targeting.
**Implications:** The `split-parent` / `split-char` GSAP classes apply to the `<h1>` wrapper, not the inner spans.

---

### Works Data: Static TypeScript File

**Date:** 2025-05-14
**Decision:** Project/works data (title, slug, description, badge, links, tech stack, images) is stored in a static TypeScript file at `src/lib/works.ts`, not in a CMS or database.
**Reason:** Portfolio content changes infrequently. A static file gives type safety, zero latency, and no external dependency. Adding a CMS later is a straightforward migration.
**Implications:** `src/app/works/[slug]/page.tsx` uses `generateStaticParams` to pre-render all case study pages at build time.

---

### base-ui Button Link Pattern

**Date:** 2025-05-14
**Decision:** When a `<Button>` needs to render as a navigation link (`<Link>` or `<a>`), use `render={<Link href="..." />}` + `nativeButton={false}`. Never use `asChild` with base-ui components.
**Reason:** base-ui's `ButtonPrimitive` warns when `nativeButton={true}` (the default) and a non-`<button>` is passed to `render`. `asChild` forwards as an unknown DOM prop. Setting `nativeButton={false}` silences the warning and opts out of native button semantics intentionally.
**Implications:** All CTA buttons wrapping `<Link>` or `<a>` must include both props. `asChild` is banned on any base-ui component.

---

### shadcn/ui Components Use base-ui (Not Radix UI)

**Date:** 2025-05-14
**Decision:** The shadcn preset `b8QyST2lZC` ships components backed by `@base-ui/react` instead of `@radix-ui/react`. Use the `render` prop pattern to customize trigger elements — not `asChild`.
**Reason:** Discovered when `<SheetTrigger asChild><Button /></SheetTrigger>` caused nested `<button>` hydration errors. base-ui's `asChild` passes a real `<button>` from `DialogTrigger`, which then wraps the `<Button>` (another `<button>`), producing invalid HTML.
**Implications:** Any component that wraps a base-ui trigger (Sheet, Dialog, Popover, etc.) must use `render={<Button ... />}` instead of `asChild`. Children of the trigger become its content, not the element itself.

---

### CTASection: Shared Across All Pages

**Date:** 2025-05-14
**Decision:** The "Have a project in mind?" section is a single shared component used on every page above the footer.
**Reason:** It appears identically on Home, Works, Works > View, and Contact in the Figma designs.
**Implications:** Any copy/button changes need only be made in one place.

---

### Versioned Portfolio Archives on Subdomains

**Date:** 2026-11-03
**Decision:** Each past portfolio version is frozen on a long-lived `release/vN` branch (tagged `vN`) and served at `vN.gileadodo.com`; `gileadodo.com` serves the current version. Archives are listed in `src/lib/versions.ts` and surfaced via the navbar `VersionSwitcher` dropdown.
**Reason:** Visitors can see the site's progression without separate repos, and old versions keep building from their own branch.
**Implications:** Before a redesign merges, push `release/vN` at the last commit of the outgoing version, attach its subdomain in Vercel as a public deployment (Preview deployments are behind Vercel Authentication), and add an entry to `versions.ts`. Archive branches carry `noindex` + a canonical to `gileadodo.com`. The app build fails without `RESEND_API_KEY`, so every environment that builds an archive needs it.

---

---

### Portfolio Claims Need a Source

**Date:** 2026-11-03
**Decision:** Employer relationships, dates and numbers on the site must come from the owner or be derivable from code. C80 Limited is the primary employer, Prune and DAM NG are shown as work through C80, and Responsible AI Africa is a separate per-feature contract. `Work.engagement` is set only when the relationship is confirmed. The status of each number lives in `docs/content-inventory.md`.
**Reason:** Template and unsupported claims contradicted the owner's CVs and undermine credibility with hiring managers.
**Implications:** Add a metric only with evidence and permission to publish it. Never infer an engagement type for a project.

---

### Stat Counters Render Their Final Value on the Server

**Date:** 2026-11-03
**Decision:** `CountStat` server-renders the final value and resets to 0 on the client only when it is going to animate. It updates the DOM through a ref rather than state.
**Reason:** Crawlers and no-JS visitors saw 0, and reading `matchMedia` during render risked a hydration mismatch.
**Implications:** A stat already in view during hydration briefly shows its final value before counting up. Stats below the fold are not affected.

---

### Writing Stays Out of the Nav Until It Has an Article

**Date:** 2026-11-03
**Decision:** Removed Writing from the nav and footer and set `/writing` to `noindex`, keeping the page. This reverses the 2026-06-29 change that linked it.
**Reason:** A prominent "Coming Soon" page is a dead end for a hiring manager.
**Implications:** When the first article ships, restore the two nav links and the sitemap entry, and remove `noindex`.

---

<!-- ═══════════════════════════════════════════════════════════════
     MULTI-AGENT ORG UPGRADE
     Frozen routing rules for the multi-agent org. HR must apply them
     as stated and must not override them without an explicit engineer instruction.
     ═══════════════════════════════════════════════════════════════ -->

## Agent Location Convention

### Org Agents Live Globally; Specialist Agents Live Per-Project

**Date:** 2026-05-22
**Decision:** The four org agents (CEO, HR, Researcher, QA) live at `~/.claude/agents/` (global, available in every project). Specialist agents (e.g. `ui-stylist`) live at `.claude/agents/` (per-project, tuned to this codebase).
**Reason:** Org agents are a pure workflow pattern with no project-specific knowledge — they only read repo memory files (`PLAN.md`, `AGENTS.md`, etc.) that are always project-scoped. Maintaining one copy globally means a single improvement benefits all projects. Specialist agents reference project-specific files (`DESIGN.md`, `STYLE.md`, animation hook names) and must be tuned per codebase.
**Implications:** When starting a new project that uses this multi-agent org, create only the specialist agents in `.claude/agents/`. The CEO → HR → Researcher → QA chain is already available globally. The `AGENTS.md` Agent Registry in each project lists only specialist agents.
**Portability note:** `.claude/agents/` is Claude Code-specific. The **workflow pattern** (CEO → HR → parallel workers → QA) is portable — Copilot (VS Code) and Codex both have subagent/delegation primitives as of mid-2026. Adapting to another tool means mapping the role definitions to that tool's native agent format; the repo memory files (`PLAN.md`, `DECISIONS.md`, etc.) remain the shared state layer unchanged. Do not treat any tool's subagent feature set as a fixed constraint — verify against current docs.

---

## Agent Routing Decisions

### Default Routing Pattern — Parallel Sub-Agents

**Date:** 2026-05-22
**Decision:** Default to parallel sub-agents for all task phases where data shapes are pre-defined before work begins.
**Reason:** Sub-agents are cheaper, simpler, and sufficient when contracts between layers are already known. There is no coordination overhead and each agent can proceed independently.
**Implications:** HR must not escalate to Agent Teams unless the escalation trigger below is explicitly met. Defaulting to Agent Teams when sub-agents would suffice is a routing error.

---

### Escalation Trigger — Agent Teams

**Date:** 2026-05-22
**Decision:** Escalate to Agent Teams when a new API route, its consuming query hook, and its UI component are being defined in the same task and must negotiate a shared TypeScript interface before either layer can proceed.
**Reason:** Sub-agents cannot coordinate contracts peer-to-peer. When no response type exists in the codebase yet, independent workers will produce mismatched interfaces that require rework.
**Implications:** HR detects this condition by checking whether a route response type already exists in the codebase before assigning workers. If the type exists, sub-agents are sufficient. If it does not, Agent Teams are required for the affected phases only — not the entire task.

---

## Superseded Decisions

### Email: Nodemailer (superseded)

**Date:** superseded 2025-05
**Replaced by:** Resend
**Reason for change:** Simpler serverless compatibility, better developer experience.
