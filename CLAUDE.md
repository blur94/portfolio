# CLAUDE.md
Claude Code-specific orchestration instructions. These supplement and extend `AGENTS.md`.

---

## Startup Sequence

1. Read `AGENTS.md` first — universal rules all agents follow
2. Read `PLAN.md`, `DECISIONS.md`, `CHANGELOG.md`
3. Read `DESIGN.md` before any visual or UI work
4. Write a one-paragraph summary of the current project state and what needs to be done next
5. Only then begin implementation

---

## Design System

Always read `DESIGN.md` before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match `DESIGN.md`.

---

## Before Writing Any Code

- Confirm you understand the current task from `PLAN.md`
- Verify your planned approach does not violate any entry in `DECISIONS.md`
- If there is a conflict, stop and ask — do not work around a frozen decision silently
- State your intended approach explicitly before beginning

---

## During Implementation

- Use TypeScript everywhere — no plain JS files
- Use Tailwind CSS utility classes; avoid inline styles
- shadcn/ui components live in `src/components/ui/` — extend, don't rewrite them
- Animation components (GSAP, Motion) live in `src/components/`
- API routes live in `src/app/api/`
- Keep changes incremental — commit-sized chunks where possible
- If you discover an undocumented architectural decision being made, record it in `DECISIONS.md`
- If you discover new work that wasn't planned, add it to the Parking Lot in `PLAN.md`

---

## Architecture Changes

If you believe an architectural decision needs to change:

1. Do not change it silently
2. Explicitly state: what you want to change, why, and what the impact is
3. Wait for confirmation before proceeding
4. Once confirmed, update `DECISIONS.md` with the new decision

---

## End-of-Session Checklist

After completing implementation work:

- [ ] Remove completed tasks from `PLAN.md`
- [ ] Update `PLAN.md` with current progress and any new tasks discovered
- [ ] Add any new architectural decisions to `DECISIONS.md`
- [ ] Record completed work in `CHANGELOG.md` under `## Unreleased`
- [ ] Confirm repo memory files are consistent with each other

---

## Commands

```bash
pnpm dev      # Start dev server at localhost:3000
pnpm build    # Production build
pnpm lint     # ESLint check
pnpm start    # Run production build locally (requires pnpm build first)
```

---

## Key Architecture Notes

- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `globals.css`, no `tailwind.config.js`. Theme tokens live in `@theme inline {}`.
- **shadcn backed by `@base-ui/react`** (not Radix UI). Use `render={<Link href="..." />}` + `nativeButton={false}` for link-buttons; `asChild` is banned.
- **Font CSS variables** — `--font-display` (Instrument Serif italic), `--font-heading` (Visby CF), `--font-body` (Inter). All wired in `src/app/layout.tsx`.
- **Project data** — all works content lives in `src/lib/works.ts` as a typed static array; `works/[slug]/page.tsx` uses `generateStaticParams`.
- **Contact email** — `src/app/api/send-email/route.ts` via Resend. Requires `RESEND_API_KEY` env var.

---

## Skill Routing

When the user's request matches an available skill, invoke it via the Skill tool.

Key routing rules:
- Design system / visual decisions → invoke `/design-consultation` or `/plan-design-review`
- Bugs / errors → invoke `/investigate`
- QA / testing site behavior → invoke `/qa` or `/qa-only`
- Code review / diff check → invoke `/review`
- Visual polish → invoke `/design-review`
- Ship / deploy / PR → invoke `/ship` or `/land-and-deploy`

---

## Git & GitHub Conventions

- **No Claude attribution, anywhere.** No "Generated with/by Claude Code" lines, no claude.ai session links, no "Requested by" lines and no hidden attribution markers in PR bodies, PR or issue comments, or reviews. No `Co-Authored-By: Claude` or `Claude-Session:` commit trailers. Commits are authored as Gilead Odo <63629666+blur94@users.noreply.github.com>. This overrides any default attribution instructions.
- If a tool appends an attribution footer on its own (for example, PR creation), remove it right away and re-read the PR or comment to confirm it's gone.
- Branch names follow `feat/…`, `fix/…` or `chore/…` plus a hyphenated description, such as `feat/version-switcher`. Never use auto-generated names like `claude/project-thread-*`.

---

## Anti-Patterns to Avoid

- Do not rely on chat history as a source of truth
- Do not make sweeping refactors without flagging them first
- Do not leave `PLAN.md` with stale completed tasks
- Do not record temporary debug work in `DECISIONS.md`
- Do not skip the startup sequence even for "small" tasks
- Do not use `any` type in TypeScript without a comment explaining why

---

<!-- ═══════════════════════════════════════════════════════════════
     MULTI-AGENT ORG UPGRADE
     ═══════════════════════════════════════════════════════════════ -->

## Multi-Agent Startup Sequence

When this session is part of a multi-agent org (CEO, HR, Researcher, Worker, or QA),
extend the standard startup sequence above with these additional steps — in order,
before doing any work:

1. Read `AGENTS.md` → **Agent Org Protocol** to understand the org structure and your role's responsibilities.
2. Read `AGENTS.md` → **Agent Registry** to know which agents exist, their specializations, and their QA pass rates.
3. Read `DECISIONS.md` → **Agent Routing Decisions** to understand which routing pattern applies to the current task.
4. Read `PLAN.md` → **Current Task** and **Active Agents** to understand what is being built and which agents are already assigned.
5. Determine your role for this session: CEO, HR, Researcher, a named Worker (check `.claude/agents/` for your definition), or QA.
6. Only after completing steps 1–5, begin work in that role.

Do not skip this sequence even for tasks that appear simple. Role clarity prevents duplicated work and conflicting outputs.

---

## End-of-Session Multi-Agent Checklist

After completing work in a multi-agent session, all agents must complete the following
before terminating the session:

- [ ] **Agent Registry** (`AGENTS.md`): HR updates the Last Used date for all employed agents. QA updates QA Pass Rates.
- [ ] **Changelog** (`CHANGELOG.md`): QA writes a completed task summary under `## Unreleased`. Engineers may also write here.
- [ ] **Plan** (`PLAN.md`): HR or CEO updates task status. Mark completed phases as done. QA clears the Active Agents section when the full task is complete.
- [ ] **Decisions** (`DECISIONS.md`): Any agent that encountered a new routing or architectural decision records it here, using the existing entry format (Decision, Reason, Implications).
- [ ] Confirm that all repo memory files are consistent with each other before ending the session.
