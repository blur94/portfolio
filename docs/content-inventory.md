# Content inventory

Maps each public route to the source that edits it, and records the status of every number shown on the site. Checked against the code on 2026-11-03. All content is static: there is no CMS.

## Routes

| Route | Source | Notes |
|---|---|---|
| `/` | `src/app/page.tsx`, `src/components/StaggeredGrid.tsx`, `CountStat.tsx`, `BrowserFrame.tsx`, `Marquee.tsx` | Selected work is the first three entries in `src/lib/works.ts`. The hero image is `public/projects/prune/hero.png`, cropped from the Prune cover |
| `/works` | `src/app/works/page.tsx`, `src/components/ProjectCard.tsx` | Order follows the `works` array |
| `/works/[slug]` | `src/app/works/[slug]/page.tsx`, `src/lib/works.ts` | Slugs, in order: `prune`, `recurrent`, `heliumid`, `paystat`, `raia`, `verivafrica`, `qatapolt`, `farmgrow`, `reunitar` |
| `/about` | `src/app/about/page.tsx` | Bio and the experience timeline are local arrays in this file |
| `/contact` | `src/app/contact/page.tsx`, `layout.tsx`, `actions.ts`, `src/lib/contact-schema.ts`, `src/components/AvailabilityCard.tsx`, `ContactForm.tsx` | The form sends through Resend and needs `RESEND_API_KEY` |
| `/writing` | `src/app/writing/page.tsx` | Placeholder in the nav. Out of the sitemap and `noindex` until there is an article |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `src/app/robots.ts` | The canonical host is `https://www.gileadodo.com`, because the apex redirects there |
| Social preview | `src/app/opengraph-image.tsx`, `generateMetadata` in `works/[slug]/page.tsx` | Case studies use their cover image |
| Shared chrome | `src/components/Nav.tsx`, `Footer.tsx`, `src/app/layout.tsx` | Footer holds the social links. Layout holds the default metadata |
| Unused | `src/app/api/hello/route.ts`, `src/app/api/send-email/route.ts` | Template route and an API route the form doesn't call |

## Engagement types

Confirmed by the owner on 2026-11-03.

| Project | Engagement |
|---|---|
| Prune Payments | Client engagement via C80 Limited |
| re:current, Helium ID, Paystat | Built under C80 Limited |
| Responsible AI Africa | Independent contract, scoped by feature |
| Veriv Africa, Qatapolt | Contract work |
| FarmGrow, Reunitar | Personal project |

## Numbers on the site

**Derived** numbers come from code. **Structural** numbers count things described in the case study itself, such as modules or surfaces, and need the owner's confirmation but make no claim about adoption. **Needs evidence** numbers stay on the site only until the owner confirms or removes them.

| Where | Number | Status |
|---|---|---|
| Home | Years building (current year minus 2020) | Confirmed by the owner: started building for the web in 2020 |
| Home | Case studies published | Derived: `works.length` |
| Home | Projects live today | Derived: entries with `isLive`. All eight URLs returned 200 on 2026-11-03 |
| Prune | 3 currencies, 2 surfaces, 4 backend services | Structural |
| re:current | 3 property modes, 2 surfaces, 2 PDF pipelines | Structural |
| Helium ID | 7 admin modules, 4 verification methods, 2 surfaces | Structural |
| Paystat | 12 modules, 15+ countries for bank validation, 1 subdomain per tenant | Structural |
| Raia | 54 countries | The public site shows both 54 and 49, so needs confirming |
| Raia | 7 initiatives, 5 directory categories | Structural |
| Veriv Africa | Launch 02/2024, 3 content types, 10+ categories | Needs evidence for the launch date and category count |
| Qatapolt | 9 modules, 3 backend services, 4 report categories | Structural |
| FarmGrow | About 15s of per-request latency removed (also in constraints and process) | Needs evidence: no measurement on file |
| FarmGrow | 3 LLM providers, 5 response sections | Structural |
| Reunitar | 5 roles, 3 search strategies, 4 backend services removed | Structural |

## Removed claims

Taken off the site on 2026-11-03 because nothing supports them. Restore one only with evidence and permission to publish it.

| Where | Removed |
|---|---|
| Home | 8 repeat clients; "Projects shipped end-to-end"; "Workspace, Lagos" caption |
| About | The whole previous timeline: VerivAfrica 2023-present (800 verifications a minute, verification SDK, Plinth design system), Recurrent.ng 2022-2023, Prune 2021-2022 (merchant till, type-size change), freelance 2019-2021 |
| About | Four-to-twelve-week engagements and fractional lead |
| Contact | "Available from" the current month; one or two projects a quarter; replies within two working days; lead times |
| Prune | 58 businesses onboarded, 258 account requests approved, 80 active accounts |
| re:current | 50+ property businesses, 181 concurrent users at peak |
| Qatapolt | 6+ countries with active users, 143 posts moderated |
| Helium ID | 4 named enterprise customers |
