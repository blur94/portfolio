# STYLE.md
Practical style guide for the portfolio project.

This file summarizes the visual and implementation patterns that are already present in the repo. `DESIGN.md` remains the source of truth for exact Figma tokens; use this file as the shorter day-to-day reference.

---

## Product Feel

Personal developer portfolio for Gilead Odo. The interface should feel editorial, dark-first, precise, and quietly expressive rather than generic SaaS.

Design is desktop-first around a 1440px canvas, with responsive behavior added without changing the core visual language.

---

## Current Stack

| Layer | Library / Pattern |
|------|-------------------|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS variables |
| UI components | shadcn/ui generated components backed by `@base-ui/react` |
| Components | Shared and page-section components in `src/components/` |
| Icons | Phosphor icon preset in shadcn config, plus inline SVGs where already used |
| Animation | GSAP, `@gsap/react`, Motion, ReactBits-inspired visual components |
| Theme | `next-themes`, dark-first |
| Email | Resend via `/api/send-email` |
| Package manager | pnpm |

Shiki highlights case-study code on the server through `src/lib/highlighter.tsx`.

Do not copy dependencies from another project into this one unless the feature actually needs them. This repo currently does not include Zod env validation, markdown rendering, unified, or custom named color themes.

---

## Typography

The project uses three font roles:

| Role | Font | Usage |
|------|------|-------|
| Display | Instrument Serif italic | Hero-scale `h1` moments only |
| Heading / UI | Visby CF | Section headings, buttons, labels, nav, stats |
| Body | Inter | Paragraphs, descriptions, footer copy |

Rules:

- Keep `h1` display treatments in Instrument Serif italic.
- Keep `h2` and `h3` in Visby CF.
- Use Inter for running copy.
- Preserve the split hero heading pattern: one semantic `h1` with inline spans for dim serif text and bold Visby name text.
- Follow `DESIGN.md` for exact scale, line-height, and letter-spacing values.

---

## Color

The design is dark-first with a pure black page background and a lime brand accent.

Primary visual anchors:

| Token Intent | Value / Source |
|-------------|----------------|
| Page background | Pure black in dark mode |
| Brand accent | Lime, aligned with shadcn `--primary` |
| Elevated surfaces | Very dark neutral greys |
| Text | White primary, muted grey secondary |
| Token source | `DESIGN.md` plus `src/app/globals.css` |

Use semantic shadcn variables (`background`, `foreground`, `primary`, `muted`, `border`, `card`, etc.) where possible. Do not introduce new one-off colors unless the token is first documented in `DESIGN.md`.

---

## Radius And Shape

The visual language favors soft but controlled geometry:

- Buttons and CTA chips are pill-like or heavily rounded.
- Cards, screenshots, and surfaces use the radius scale from `DESIGN.md`.
- shadcn radius variables are derived from `--radius` in `globals.css`.
- Keep circular controls truly circular.

---

## Layout

Use thin route files under `src/app/` that compose section components from `src/components/`.

Preferred page rhythm:

- Large editorial sections.
- Strong contrast between black page background and dark surfaces.
- Spacious desktop composition.
- Reusable CTA section above the footer.
- Project data comes from `src/lib/works.ts`, not inline route content.

Avoid broad rewrites of implemented page structure unless the user explicitly asks for a redesign.

---

## Components

Use `cn()` from `src/lib/utils.ts` for class composition:

```ts
cn("base-classes", conditional && "conditional-classes")
```

Component variants use `class-variance-authority`, as in `src/components/ui/button.tsx`.

Important shadcn/base-ui rule:

- Use base-ui `render={<Link href="..." />}` and `nativeButton={false}` for buttons that render navigation links.
- Do not use Radix-style `asChild`; this repo's shadcn preset is base-ui backed.

---

## Motion

Use the libraries already present:

- GSAP for SplitText, scroll-triggered sequences, grid motion, and complex visual animation.
- Motion for lightweight component-level effects.
- OGL only where the existing Aurora/WebGL treatment is appropriate.

Keep animation purposeful and restrained. Prefer existing helpers (`SplitText`, `AnimatedContent`, `Aurora`, `GridMotion`) before adding new primitives.

---

## Visual Assets

The portfolio currently uses placeholder/project image slots and visual components. When replacing placeholders:

- Use real project screenshots for works and case studies.
- Keep images inspectable and high contrast.
- Preserve rounded corners and spacing from `DESIGN.md`.
- Avoid decorative images that do not clarify the project/person.

---

## Agent Workflow

Before implementation, read:

1. `PLAN.md`
2. `DECISIONS.md`
3. `CHANGELOG.md`
4. `DESIGN.md` for visual/UI work
5. `STYLE.md` for a compact style reference

At the end of implementation sessions, update:

- `PLAN.md` for current task state.
- `DECISIONS.md` for new durable decisions.
- `CHANGELOG.md` for completed work.

