# CHANGELOG.md
All notable changes to portfolio are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## Unreleased

### 2026-11-03: Engagement end dates

- Added the Prune end date to About: the engagement ran from July 2024 to September 2026, as confirmed by the owner.
- Added the Qatapolt end date to About: May to July 2024, as confirmed by the owner.

### 2026-11-03: Canonical domain

- Added `lastmod` to every sitemap URL from a hand-set content date (`updatedAt` on each work, `pageUpdatedAt` in `sitemap.ts`), so search engines recrawl the corrected pages sooner.
- Set the canonical origin to the apex `https://gileadodo.com`, because www redirects to it. Canonicals, the sitemap, robots and social URLs now point at the apex.
- Fixed the contact form's fallback address to hello@gileadodo.com, and stopped the failure message naming two addresses.

### 2026-11-03: C80 and Rework titles

- Updated the C80 row on About to "Senior frontend engineer", as confirmed by the owner.
- Described Prune as a cross-border payments platform and added the consumer side of the work, as confirmed by the owner.
- Added Veriv Africa and Qatapolt start dates to About, from each repository's commit history.
- Added the confirmed Responsible AI Africa contract period, February 2025 to July 2026, to About.
- Changed the Prune start on About to July 2024, the date of the first commit in its repository, as the owner directed.
- Updated the Rework Academy row to "Full-stack software developer trainee", as confirmed by the owner.

### 2026-11-03: Writing back in the nav

- Restored Writing in `Nav.tsx` and `Footer.tsx` at the owner's request. `/writing` stays `noindex` and out of the sitemap until it has an article.

### 2026-11-03: Audit fixes

- Stopped pages sharing as the homepage: removed the root `openGraph.url` and gave each page its own social title, description and URL.
- Added `src/lib/site.ts` as the single source for the site URL and shared social metadata.
- Added Prisma highlighting, and made `highlightCode` return plain lines on failure without caching a rejected highlighter.
- Made `artifact` optional in `src/lib/works.ts` and removed repeated images from the Prune, Qatapolt, Veriv Africa and Reunitar Process steps.
- Removed the possibility of an empty masthead row on case studies.

### 2026-11-03: Hero wording and project attribution

- Rewrote the hero for remote hiring managers, and replaced "operator-grade" and "a clear operator" on About.
- Moved the Prune dashboard into the hero in place of Veriv Africa.
- Corrected Veriv Africa to 10 thematic areas, and labelled FarmGrow's 15s as an estimate.
- Changed "operator" to "landlord" throughout the re:current case study, and removed "operator" from the rest of the site at the owner's request.
- Added confirmed engagement types to every project: Paystat, re:current and Helium ID built under C80, Veriv Africa and Qatapolt as contract work, FarmGrow and Reunitar as personal projects. Added a contract row on About.
- Made `client` optional, so personal projects don't list themselves as a client.

### 2026-11-03: Hero image and contact form

- Replaced the hero screenshot with `public/projects/prune/hero.png`, cropped from the Prune cover so it doesn't show a browser frame inside a browser frame. `BrowserFrame.tsx` now uses `next/image` with `priority`, so the image no longer loads late as a CSS background.
- Added `src/lib/contact-schema.ts`, shared by the form and `sendContactEmail`, so the server validates submissions too.
- Stopped showing raw provider errors to visitors, and linked form errors to fields with `aria-invalid` and `aria-describedby`.
- Added a screen-reader `h2` to `/works` so the heading order doesn't skip a level.

### 2026-11-03: shadcn code block on case studies

- Added `src/components/ui/code-block.tsx` and `src/lib/highlighter.tsx` from the shadcn `base-maia` registry, adapted to the repo's `cn` import and Phosphor icons. Left `button.tsx` unchanged because it already has the `icon-xs` size.
- `src/app/works/[slug]/page.tsx`: code steps now use the component with a copy button, themed for light and dark. Shiki highlights on the server, so it stays out of the client bundle.
- Added `language` to code artifacts in `src/lib/works.ts`. Prisma isn't in the highlighter's language list, so that snippet renders as plain text.
- Added the `shiki` dependency.

### 2026-11-03: Uncropped case-study images

- `src/app/works/[slug]/page.tsx`: stacked each Process step so its image or code runs the full content width, and stopped cropping images. Added `width` and `height` to image artifacts in `src/lib/works.ts`.
- Requested screenshots at quality 90 (`images.qualities` in `next.config.js`) and corrected `sizes`, so the browser no longer picks a file sized for a 420px column.
- The case-study cover now fits a 4:3 frame without cropping.
- Turned the small case-study section labels (Context, Constraints, Role & Team, Process, Outcome, Lessons) into real `h2` headings, with step titles as `h3`.

### 2026-11-03: Em-dash and AI-pattern removal

- Removed every em-dash and en-dash from `src/`, and rewrote case-study, home, About, contact and Writing copy to the unslop rules without adding facts.
- Replaced mannered case-study step titles in `src/lib/works.ts` with literal ones.
- Kept curly apostrophes only in the large serif headlines, where a straight one looks wrong at that size.

### 2026-11-03: Credibility and conversion pass

- `src/app/about/page.tsx`: replaced the template timeline with C80 Limited as primary employment, Prune and DAM NG as work through C80, Responsible AI Africa as a separate per-feature contract, and Rework Academy. Removed claims nothing supports.
- `src/lib/works.ts`: added an optional `engagement` field, set it for Prune and Raia, removed unsupported business metrics, and reordered entries to lead with Prune, re:current and Helium ID.
- `src/app/page.tsx`: added a role and stack line and a "Discuss a contract" CTA. Replaced "8 repeat clients" with stats derived from `works`, and fixed the template hero alt text and Lagos caption.
- `src/components/AvailabilityCard.tsx`, `src/app/contact/page.tsx`, `ContactForm.tsx`: removed the auto-dated "Available from" claim, quarterly capacity and reply-time promises.
- `src/components/CountStat.tsx`: the server now renders the final value, so no-JS visitors and crawlers don't see 0. The accessible name stays on the final value, reduced motion no longer risks a hydration mismatch, and date-like values don't animate. The count-up itself is unchanged.
- `src/components/ProjectCard.tsx`, `src/app/works/[slug]/page.tsx`: cards show role, engagement, stack and a private-build chip. The case-study "Team" and "Engagement" rows no longer repeat the client and descriptor.
- SEO: added `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `metadataBase`, canonicals and per-case-study social metadata. Replaced the "design, music, and code" descriptions and the "MyWebSite" manifest name.
- Accessibility: removed `maximumScale: 1`, which blocked pinch zoom, and the nested `<main>` on case studies.
- `src/components/Footer.tsx`: fixed the LinkedIn URL. Writing left the nav and footer, and `/writing` is `noindex` until it has an article.
- `docs/content-inventory.md` (new): route-to-source map, status of each number, and removed claims.

### 2026-11-03 — Rename project to "portfolio"

- Renamed the project from `pre-portfolio` to `portfolio` in `package.json` and the repo memory file headers, ahead of the GitHub repo rename.

### 2026-11-03 — Previous-versions dropdown (navbar)

- `src/lib/versions.ts` (new): typed list of portfolio versions (`v2` current at gileadodo.com, `v1` at v1.gileadodo.com).
- `src/components/VersionSwitcher.tsx` (new): Base UI `Menu` dropdown in the navbar, left of the theme toggle (visible on desktop and mobile). It lists each version with its name and period, checks the current one, and links out to archived ones. Uses design tokens for both themes.
- Repo: tagged `v1` (`6f45a83`) and `v2` (`7016a13`); `release/v1` branch carries `noindex` + canonical for the archive deploy.

### 2026-06-29 — Writing "Coming Soon" page

- `src/components/Nav.tsx`: pointed the **Writing** nav link at the new `/writing` route and removed the "Coming soon" placeholder treatment (the disabled `<span>` on desktop and the "Soon" badge on mobile). The link now renders as a regular nav item in both layouts.
- `src/app/writing/page.tsx` (new): polished, vertically + horizontally centered "Coming Soon." page matching the design system. Instrument Serif display heading with dimmed first word, Visby CF eyebrow, Inter muted copy, a subtle lucide `PenLine` icon mark, and a pill CTA back to `/works`. Responsive via `clamp()` heading and fluid padding; no new dependencies or assets. `pnpm lint` passes.
- `src/components/Footer.tsx`: pointed the footer's **Writing** link at `/writing` (was a `null` "Coming soon" placeholder), matching the navbar.
- No-vertical-scroll on the writing page: the section centers via `flex-1` (`md:py-0`, no redundant `py-24`), and a scoped `body:has([data-fit-viewport]) footer { margin-top: 0 }` rule in `globals.css` drops the footer's standard 120px top gap on this page only. Verified zero overflow at 1920×1080, 1536×864, 1440×900, 1366×768, and 1280×720; the footer's gap is unchanged on all other pages.

### QA Session — 2026-05-29 ("Visit project" link for live works)

**Agents employed:** `plinth-data-assets-integrator` (Phase 1 — data), `plinth-page-assembler` (Phase 2 — UI)
**Routing:** Parallel sub-agents (shared `Work.liveUrl` / `liveUrlGated` contract already materialized in code).
**Rework cycles:** None — both phases passed first-pass QA.

**Phase summaries:**
- Phase 1: Populated `liveUrl` on every live entry in `src/lib/works.ts` — 6 public (verivafrica, recurrent, raia, farmgrow, heliumid, paystat) and 2 gated with `liveUrlGated: true` (qatapolt, prune). `reunitar` (`isLive: false`) left without a `liveUrl`. No live-link fields touched beyond the contract.
- Phase 2: Added a "Visit project ↗" affordance to `src/app/works/[slug]/page.tsx`. Hero renders a shadcn `Button` via `render={<a target="_blank" rel="noreferrer" />}` + `nativeButton={false}` with a lucide `ArrowUpRight`; masthead Status row links to `liveUrl` with an `ArrowUpRight` indicator (plain text otherwise). Gated works show a "Login required" hint in both spots. `KeyValue` extended with optional `href` / `gated`.

**QA verdict: APPROVED** — all Phase 1 and Phase 2 acceptance criteria met. Independent `pnpm lint` and `pnpm build` both pass with zero errors; no `asChild` usage in source; no stray inline colors introduced by the visit-link UI.

**Observation (Parking Lot, not a task defect):** `heliumid` `coverImage` still points at the deleted flat path `/projects/heliumid-dark.png` (correct path is `/projects/heliumid/cover.png`). This predates the live-link task (unchanged at HEAD) and is outside its scope.

---

### QA Session — 2026-05-24 (Mobile responsive stacking for side-by-side image sections)

**Agents employed:** `ui-stylist` (Phase 1)
**Rework cycles:** None — first-pass QA approved.

**Phase summaries:**
- Phase 1: Replaced two inline `style={{ gridTemplateColumns: "..." }}` props in `src/app/page.tsx` with Tailwind responsive classes. Hero grid: `grid-cols-1 gap-8 md:grid-cols-[55fr_45fr] md:gap-16`. About Teaser grid: `grid-cols-1 gap-12 md:grid-cols-[60fr_40fr] md:gap-24`. Both sections now stack to single column below `md` (768px) with copy above image, and restore the original fractional column layout on `md`+.

**QA verdict: APPROVED** — all 4 acceptance criteria met. `pnpm build` and `pnpm lint` pass with zero errors.

---

### QA Session — 2026-05-24 (Full Portfolio Redesign "Plinth")

**Agents employed:** `plinth-data-assets-integrator` (Phases 1 + 3), `plinth-page-assembler` (Phases 2A + 2B)
**Rework cycles:** None — all phases passed first-pass QA.

**Phase summaries:**
- Phase 1: 12 project images copied to `public/projects/`; `src/lib/works.ts` rewritten with new `Work` type and 6 Plinth projects (verivafrica, recurrent, qatapolt, prune, raia, reunitar).
- Phase 2A: 8 new shared components created — `Nav.tsx` (sticky 3-col, theme toggle, localStorage persistence, lime active underline), `Footer.tsx` (3-col + bottom bar), `ProjectCard.tsx` (bg-surface, 16:9, chips), `BrowserFrame.tsx` (mock chrome + URL bar), `Marquee.tsx` (CSS animation + gradient mask + hover-pause), `StaggeredGrid.tsx` (3-col + 56px even-index offset), `CountStat.tsx` (IntersectionObserver count-up, prefers-reduced-motion), `AvailabilityCard.tsx` (accent dot, dynamic month/year, KV rows).
- Phase 2B: All 5 pages rewritten — `page.tsx` (Hero 55/45 + BrowserFrame + Marquee + StaggeredGrid + CountStat), `about/page.tsx` (display header + 3 articles + 4-role experience), `works/page.tsx` (full StaggeredGrid + CTA), `works/[slug]/page.tsx` (8-slot case study template + prev/next navigation), `contact/page.tsx` (60/40 + AvailabilityCard + form wired to `/api/send-email`).
- Phase 3: All 19 obsolete components deleted. `pnpm build` passes with zero TypeScript errors.

**QA verdict: APPROVED** — all 9 acceptance criteria met.

### Added
- Plinth redesign implementation from the handoff bundle: six-project `works` data, public project assets, logo marks, shared `ProjectCard`, `BrowserFrame`, `Marquee`, `StaggeredGrid`, `CountStat`, `AvailabilityCard`, and `Kicker` components
- Plinth-specific specialist agent definitions: `plinth-data-assets-integrator` and `plinth-page-assembler`
- React Bits CountUp treatment for the About stats row while preserving the existing `6+`, projects, and tech-stack displays
- Multi-agent org system: Agent Registry + Org Protocol in `AGENTS.md`, multi-agent sections in `CLAUDE.md`, Active Agents table in `PLAN.md`, Agent Routing Decisions in `DECISIONS.md`, core agent definitions in `.claude/agents/` (ceo, hr, researcher, qa)
- Build commands and non-obvious architecture notes added to `CLAUDE.md`
- `STYLE.md` with a compact visual identity and implementation-pattern guide derived from the current repo
- Phase 6 Contact page: `ContactHero`, immediate-rendering `ContactForm`, and `/api/send-email` wiring
- ReactBits-inspired GridMotion treatment for the app error and not-found pages, with portfolio-specific copy and navigation actions
- Phase 5 Works detail page: typed project detail data, static params, project hero, screenshot, content sections, code block, gallery, and `/works/[slug]` assembly
- Phase 2 Home page: `HeroSection`, `WorksIntro`, `ProjectRow`, `ArticlesSection`, `ArticleCard`
- `src/lib/works.ts` — typed static data for 5 projects (LegiPro, VerivAfrica, APAS, Qatapolt Admin, Recurrent.ng)
- Converted `src/app/page.tsx` to a server component assembler
- Phase 1 shared components: `Nav`, `Footer`, `CTASection`, `LiveBadge`
- Root layout wired with all three fonts: Visby CF (localFont → `--font-heading`), Instrument Serif italic (`--font-display`), Inter (`--font-body`)
- Sheet-based hamburger nav (home, about, works, contact + social links)
- Footer with social SVG icons, phone/email, and credits row
- `<CTASection>` shared across all pages above the footer
- `<LiveBadge>` emerald chip for live project status
- Initialized repo memory system (`AGENTS.md`, `CLAUDE.md`, `PLAN.md`, `DECISIONS.md`, `CHANGELOG.md`)
- Favicon, icons, and PWA manifest support
- Contact page with email form
- Global styles and root layout
- `SplitText` animation component
- `Aurora` WebGL background component
- `AnimatedContent`, `Magnet`, `ShinyText` components
- `theme-provider` and `theme-hotkey` for dark/light mode switching
- shadcn/ui base components: Button, Card, Input, Label, Textarea
- API route `/api/send-email` using Resend SDK
- `DESIGN.md` with full Figma token extraction (colors, typography, spacing, border-radius, icons)

### Changed
- Fixed shared chrome on mobile by restoring a hamburger Sheet menu and corrected the wordmark text from `Portfollio` to `Gilead Odo`.
- Reworked Home, Works, About, Contact, Nav, Footer, and `/works/[slug]` to match the Plinth dark-first editorial layout and route structure
- Replaced the old theme-toggle hydration path with stable `data-theme` DOM toggling and a no-flash `beforeInteractive` theme init script
- Updated ESLint and git ignore rules so the extracted `.handoff/` prototype stays available locally without being linted or tracked
- Migrated the Next.js 16 lint command to the ESLint CLI and cleared blocking lint errors in existing animation components required by the About stats QA gate
- `HeroSection`: replaced rectangular photo container with organic blob shape (multi-value `border-radius: 60% 40% 57% 43% / 52% 44% 56% 48%`), added `rotate-2` tilt, asymmetric `md:grid-cols-[5fr_4fr]` column ratio, `aspect-[3/4]` with `overflow-visible`, and a floating lime "Available ✦" accent pill absolutely positioned near the bottom of the photo column
- Commissioned `ui-stylist` agent (`.claude/agents/ui-stylist.md`) and registered it in `AGENTS.md` Agent Registry (QA pass rate: 1/1)
- Updated `AGENTS.md` startup guidance to include `STYLE.md` and the full implemented page set
- Removed vertical overflow from the contact page by fitting it to the layout's remaining viewport height
- Centered the contact form within the contact page content column while keeping the submit action left-aligned
- Improved light-mode contrast and focus styling for the hamburger menu sheet
- Improved light-mode contrast for the GridMotion error and not-found pages
- Removed vertical overflow from the not-found page by letting it fill the layout's remaining viewport height
- Recentered the not-found GridMotion background after the no-scroll layout adjustment
- Marked interactive visual components as client components where required by Next.js builds
- Migrated email sending from Nodemailer to Resend
- Moved `pnpm onlyBuiltDependencies` config from `pnpm-workspace.yaml` to `package.json`

### QA
- Verified mobile nav/logo fix with `pnpm lint`, `pnpm build`, source `asChild` scan, Playwright mobile hamburger open check at 390px, desktop nav snapshot, and QA agent review.
- Verified Plinth redesign with `pnpm lint`, `pnpm build`, stale old-component import scan, no source `asChild` usage, Playwright smoke screenshots for `/`, `/about`, `/works`, `/works/verivafrica`, `/contact`, zero browser console errors on those routes, theme persistence, and case-study next navigation.
- Multi-agent review completed for Plinth data/assets, case-study assembly, HR registry updates, and final QA.
- Approved the About stats CountUp session after React Bits registry integration by `registry-component-integrator`, lint CLI migration by `next-lint-migrator`, and animation lint rework by `animation-lint-reworker`.
- Rework cycle: the initial CountUp review failed on duplicate registry output and a broken Next 16 lint gate before the final QA pass.
- Reviewed Phase A React Bits CountUp registry add by `registry-component-integrator`; rework is required because the registry fetch failed before generated CountUp source was added.
- Reviewed Phase B About stats integration by `registry-component-integrator`; rework is required because no CountUp API was available and `StatsRow` remains static.

---

## [0.1.0] - 2025-05

### Added
- Initial Next.js App Router project setup with TypeScript and Tailwind CSS
- shadcn/ui integration
- GSAP + Motion animation libraries
- Main page content and root layout
