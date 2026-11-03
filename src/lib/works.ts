export type WorkArtifact =
  | { kind: "image"; src: string }
  | { kind: "code"; body: string };

export type WorkProcessStep = {
  title: string;
  body: string;
  artifact: WorkArtifact;
};

export type WorkOutcome = {
  number: string;
  label: string;
};

export type Work = {
  slug: string;
  title: string;
  descriptor: string;
  overview: string;
  role: string;
  client: string;
  /** How the work was contracted. Set only once the owner has confirmed it. */
  engagement?: string;
  year: string;
  category: string;
  tags: string[];
  isLive: boolean;
  /** Public URL to visit the live project, when one exists. */
  liveUrl?: string;
  /** True when liveUrl lands on a login wall (a gated app or admin). */
  liveUrlGated?: boolean;
  coverImage: string;
  context: string;
  constraints: string[];
  process: WorkProcessStep[];
  outcomes: WorkOutcome[];
  lessons: string;
};

export const works: Work[] = [
  {
    slug: "prune",
    title: "Prune Payments",
    descriptor:
      "Banking-as-a-service platform for issuing multi-currency accounts.",
    overview:
      "Prune is a banking-as-a-service platform that lets businesses issue and operate multi-currency accounts (EUR, GBP, USD) with full IBAN, Sort Code, and ACH details. I built the frontend across two surfaces: the business dashboard — accounts, transactions, payouts, beneficiaries, debit requests, and role-based team management — and the internal admin console for business onboarding (KYB), eligibility, pricing plans, and account approvals.",
    role: "Senior Frontend Engineer",
    client: "Prune Payments",
    engagement: "Client engagement via C80 Limited",
    year: "2024",
    category: "Fintech",
    tags: ["Next.js", "TypeScript", "Mantine", "AG Grid", "Zustand"],
    isLive: true,
    liveUrl: "https://apas.prunepayments.net",
    liveUrlGated: true,
    coverImage: "/projects/prune/cover.png",
    context:
      "Businesses that want to offer banking features rarely want to become a bank. Prune provides the account-issuing, payout, and transaction rails as a service, so a business can spin up multi-currency accounts and move money under their own brand. That demands two very different surfaces — a self-serve operator dashboard for the business, and an internal admin console for Prune to vet and manage those businesses.",
    constraints: [
      "Four separate backend services (auth, core, accounts, payout) behind one client — env-validated with Zod at boot.",
      "Two distinct apps in one codebase: the business dashboard and the internal admin, split via Next.js route groups.",
      "Role-based access control with an initiator/approver model — every sensitive action gated on granular permissions.",
      "Money-movement documents (receipts, statements) generated client-side as PDF and exported to Excel.",
    ],
    process: [
      {
        title: "Two surfaces, one codebase",
        body: "The platform serves two fundamentally different users — businesses operating their own accounts, and Prune staff vetting those businesses. I separated them into distinct Next.js route groups, each with its own layout, navigation, and permission model, so operator and staff flows never leak into each other.",
        artifact: { kind: "image", src: "/projects/prune/customer.png" },
      },
      {
        title: "Permissions as a first-class concern",
        body: "Money movement needs guardrails. I built RBAC around an initiator/approver pattern: a useHasPermission hook gates every sensitive action — transaction initiation, approvals — so the same UI adapts to each team member's role rather than hiding logic behind a single admin flag.",
        artifact: { kind: "image", src: "/projects/prune/cover.png" },
      },
      {
        title: "Multi-currency accounts and money movement",
        body: "Each account carries its own real banking identifiers — IBAN, Sort Code, ACH Routing — across EUR, GBP, and USD, with per-currency transaction views, payouts, and downloadable statements. Receipts and statements are generated client-side as PDF and exported to Excel, matching exactly what's on screen.",
        artifact: { kind: "image", src: "/projects/prune/customer.png" },
      },
    ],
    outcomes: [
      { number: "3", label: "Account currencies: EUR, GBP, USD" },
      { number: "2", label: "Surfaces: business dashboard, internal admin" },
      { number: "4", label: "Backend services behind one client" },
    ],
    lessons:
      "Building money-movement software taught me that permissions aren't a feature you bolt on — they're the architecture. Once you model an initiator/approver flow honestly, every screen has to answer 'who is allowed to do this, and what happens when they can't?'. Splitting the operator and admin surfaces early kept that complexity contained instead of letting two very different products fight inside one layout.",
  },
  {
    slug: "recurrent",
    title: "re:current",
    descriptor:
      "Property management platform for Nigerian landlords and letting agents.",
    overview:
      "re:current is a full-stack property management platform for landlords, property managers, shortlet hosts, and realtors. It consolidates tenant onboarding, rent collection, invoicing, bookings, and identity verification into one dashboard. I built the frontend: the route group architecture, the booking calendar, PDF agreement and invoice generation, and the real-time dashboard layer.",
    role: "Frontend",
    client: "Current Finance Limited",
    year: "2023",
    category: "PropTech",
    tags: ["Next.js", "Mantine", "TypeScript", "TanStack Query", "Socket.io"],
    isLive: true,
    liveUrl: "https://recurrent.ng",
    coverImage: "/projects/recurrent/cover.png",
    context:
      "Landlords and property managers were running their operations across disconnected tools — separate invoicing software, manual KYC, paper tenancy agreements, and no unified view of bookings or payments. re:current consolidates the full property workflow into one platform, from tenant onboarding and verification to rent collection, short-let bookings, and digital agreements.",
    constraints: [
      "Three distinct property modes — rentals, short-lets, and sales — each with different data models, workflows, and UI flows under a single dashboard.",
      "Identity verification at both tenant onboarding and guest check-in/check-out, integrated via Veriff SDK.",
      "PDF output for tenancy agreements carries legal weight — layout and fidelity had to match what tenants sign.",
      "Real-time metrics (live user count, booking updates) via Socket.io without impacting dashboard stability.",
    ],
    process: [
      {
        title: "Separating landlord and guest surfaces",
        body: "The platform serves two fundamentally different users — landlords managing their portfolio and guests booking short-lets. I separated these into distinct route groups: (landlord) for the authenticated landlord dashboard and (public) for guest-facing property listings and booking pages. The split gave each surface its own layout, auth logic, and data loading strategy without the two leaking into each other.",
        artifact: { kind: "image", src: "/projects/recurrent/banking.png" },
      },
      {
        title: "A booking calendar that understands availability",
        body: "Short-let and hotel bookings require per-unit availability tracking across multiple days, with OTA channel sync to prevent double-bookings. I built the calendar view on Schedule-X, wiring it to the booking state layer. Each day cell reflects which units are available, occupied, or pending — without the landlord needing to cross-reference a separate list.",
        artifact: { kind: "image", src: "/projects/recurrent/shortlets.png" },
      },
      {
        title: "PDF generation for documents with legal weight",
        body: "Tenancy agreements and invoices aren't just exports — they're legally binding documents tenants sign and landlords store for years. No single PDF library handled both structured agreement layout and invoice snapshot fidelity well, so I used react-pdf/renderer for agreements and jspdf + html2canvas for invoices. The output matches exactly what's on screen.",
        artifact: { kind: "image", src: "/projects/recurrent/invoice.png" },
      },
    ],
    outcomes: [
      { number: "3", label: "Property modes: rentals, short-lets, sales" },
      { number: "2", label: "Separate surfaces: landlord and guest" },
      { number: "2", label: "PDF pipelines: agreements and invoices" },
    ],
    lessons:
      "Building re:current taught me that real operational workflows are rarely linear. Payments, agreements, bookings, and verification all interact in ways that create edge cases quickly. The challenge was not building the happy path but creating a system that stayed understandable when those exceptions appeared. It made me more intentional about designing for clarity, flexibility, and change.",
  },
  {
    slug: "heliumid",
    title: "Helium ID",
    descriptor:
      "Enterprise identity verification and digital-identity platform.",
    overview:
      'Helium ID is an enterprise identity platform — businesses verify identities in real time (AI ID checks, facial comparison, liveness, NIN lookups), issue customers a digital identity wallet, and authenticate users with MFA and "Login with Helium ID". I built the frontend: the business admin portal — verifications, a developer/API-keys console, events, insights, billing, team, and a multi-step workspace onboarding — and the marketing site, on Next.js with TanStack Query/Table, Zustand, and a server-validated auth layer.',
    role: "Frontend",
    client: "Helium ID",
    year: "2026",
    category: "Identity",
    tags: ["Next.js", "TypeScript", "TanStack Query", "Zustand", "shadcn/ui"],
    isLive: true,
    liveUrl: "https://heliumid.io",
    coverImage: "/projects/heliumid/cover.png",
    context:
      "Enterprises that need to verify customers — banks, fintechs, document platforms — don't want to build identity infrastructure themselves. Helium ID provides verification, a digital-identity wallet, and authentication as a single platform with an admin console and APIs. That means a data-dense operator dashboard for businesses to run verifications, and a polished public site to sell it.",
    constraints: [
      "Identity admin is sensitive — sessions are revalidated server-side against the backend on every request, not trusted from a cookie.",
      "Operators need MFA — dedicated 2FA, OTP, and access auth flows.",
      "The dashboard is data-heavy — verifications, events, and insights built on TanStack Query + Table with Recharts.",
      "Businesses self-onboard — a multi-step workspace setup flow gates them into the portal.",
      "A developer console exposes API keys and integration management as a first-class module.",
    ],
    process: [
      {
        title: "An operator dashboard for identity ops",
        body: "I built the admin surface — verifications, events, insights, billing, team — on TanStack Query and Table with Recharts analytics, nuqs-driven URL state for filters and pagination, and Zustand stores for auth and workspace state. Each verification row tracks status (started, successful, failed), method, and the API key that initiated it.",
        artifact: { kind: "image", src: "/projects/heliumid/light.png" },
      },
      {
        title: "Auth treated as the product's spine",
        body: "For an identity product, trusting a cookie isn't enough. A request proxy revalidates the session against the backend (`/admin/auth/me`) on every navigation, redirects authenticated users away from auth routes, and bounces everyone else to a login that remembers where they were headed. MFA and OTP flows sit on top.",
        artifact: {
          kind: "code",
          body: `// proxy.ts — revalidate the session on every request
const hasValidSession = async (req: NextRequest) => {
  const res = await fetch(\`\${apiBaseUrl}/admin/auth/me\`, {
    headers: { cookie: req.headers.get("cookie") ?? "" },
    cache: "no-store",
  });
  return res.ok;
};
// unauthenticated -> /auth/access?from=<pathname>`,
        },
      },
      {
        title: "Self-serve onboarding + developer console",
        body: "I built a multi-step workspace setup so businesses provision themselves, and a developers module for API keys and integration management — matching the platform's API-first pitch. I paired it with a Motion-animated, MDX-driven marketing site (shiki-highlighted docs) to sell the product.",
        artifact: {
          kind: "code",
          body: `// middleware matcher — guard the whole app except assets/api
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};`,
        },
      },
    ],
    outcomes: [
      { number: "7", label: "Admin modules across the operator portal" },
      {
        number: "4",
        label: "Verification methods (ID, facial, liveness, NIN)",
      },
      { number: "2", label: "Surfaces: admin portal, marketing site" },
    ],
    lessons:
      "For an identity product, auth is the product — revalidating sessions server-side and treating MFA as table stakes mattered more than any single screen. And a data-dense operator console lives or dies on its table/query/URL-state layer staying consistent across modules.",
  },
  {
    slug: "paystat",
    title: "Paystat",
    descriptor: "Multi-tenant payroll and HR platform.",
    overview:
      "Paystat is a multi-tenant payroll and HR platform — companies process payroll, manage employees and attendance, and run reports, each on their own branded subdomain. I built the frontend: 12 modules (payroll, people, attendance, accounts, insights, integrations, workflows, an AI assistant…), an international banking layer that validates account numbers and IBANs across 15+ countries, and an AI-generated organogram rendered on an editable React Flow canvas — on Next.js with Mantine, AG Grid, and TanStack Query.",
    role: "Frontend",
    client: "Paystat",
    year: "2024",
    category: "HR Tech",
    tags: ["Next.js", "TypeScript", "Mantine", "AG Grid", "React Flow"],
    isLive: true,
    liveUrl: "https://paystat.dev",
    coverImage: "/projects/paystat/cover.png",
    context:
      "Payroll spans countries, banking formats, and org structures that differ at every company. Paystat runs each company as a tenant on its own subdomain and handles the messy parts — validating bank accounts across 15+ countries' formats and IBANs, generating and editing org charts, and exporting precise payroll reports — so HR teams can pay people accurately and on time.",
    constraints: [
      "Every company is its own tenant — middleware resolves the subdomain, confirms the company exists, and validates the JWT before any page renders.",
      "Payroll pays people across borders — bank-account and IBAN validation for 15+ countries' formats (sort codes, routing numbers, BSB).",
      "Org structures must be visual and editable — an AI-generated organogram on a React Flow canvas with drag, reconnect, and export.",
      "Payroll output must be portable — every report exports to PDF, Excel, CSV, and print.",
      "Non-technical HR users onboard themselves — guided product tours and live form-format hints.",
    ],
    process: [
      {
        title: "One app, every tenant",
        body: "I built subdomain-based multi-tenancy in middleware: extract the company from the host, validate it exists against the backend, then validate the session JWT (`/v1/auth/me`) with conditional auth redirects that remember where the user was headed — so each company gets a branded, isolated workspace from a single deployment.",
        artifact: {
          kind: "code",
          body: `// src/middleware.ts — resolve tenant from the subdomain, then auth
const subdomain = hostnameParts.length > 2 ? hostnameParts[0] : null;
const { data: company } = await fetch(
  \`\${SERVER_URL}/v1/auth/company/check/\${subdomain}\`
).then((r) => r.json());
if (!company) return NextResponse.redirect(new URL("/login", request.url));

const token = request.cookies.get("__ps-c-a")?.value;
if (!token || !(await validateToken(token)))
  return NextResponse.redirect(new URL(\`/login?redirect=\${path}\`, request.url));`,
        },
      },
      {
        title: "Get international banking right",
        body: "Payroll can't fail on a malformed account number. I wrote a country-aware banking-validation layer covering 15+ countries — per-country account formats, IBAN validation, sort codes, routing numbers, BSB — with a debounced account-lookup hook and a live format-helper component that shows the expected format as the user types.",
        artifact: {
          kind: "code",
          body: `// src/lib/utils/bankingValidation.ts — per-country formats + IBAN
validateAccountNumber("DE89370400440532013000", "DE"); // IBAN
validateAccountNumber("0123456789", "NG");              // 10-digit
validateAccountNumber("12345678", "GB");                // 8-digit + sort code
// supports NG, US, GB, DE, FR, CA, AU … (15+ countries)`,
        },
      },
      {
        title: "Make org structure and payroll tangible",
        body: "I built an AI-generated organogram: a prompt-to-org-chart route in the app renders onto a React Flow canvas where HR can drag, reconnect, and export the chart, with positions and units CRUD and reorderable approval workflows behind it. I paired it with a heavy export layer so every payroll report ships as PDF, Excel, CSV, or print.",
        artifact: {
          kind: "code",
          body: `// AI org-chart generation stays in the Next.js app
// src/app/api/organogram/generate/route.ts -> React Flow canvas
// backend owns persistence only: save/retrieve chart, positions &
// units CRUD, approval-workflow ordering`,
        },
      },
    ],
    outcomes: [
      { number: "12", label: "Modules across the workforce platform" },
      { number: "15+", label: "Countries for bank-account / IBAN validation" },
      { number: "1", label: "Branded subdomain per tenant company" },
    ],
    lessons:
      "Subdomain multi-tenancy lives in the middleware — get tenant resolution and session validation right there and every module inherits isolation for free. And the long tail of international banking formats is real work: 'validate an account number' means 15 different rules, not one.",
  },
  {
    slug: "raia",
    title: "Raia",
    descriptor: "Ecosystem hub for responsible AI across Africa.",
    overview:
      "Responsible AI Africa is an ecosystem hub for the responsible-AI community across the continent — directories of organisations and AI indexes, funding opportunities, events, jobs, and country-level AI landscapes. I built it on Payload CMS: the content model and collections, an access-control layer, a transactional email outbox, and the Mantine-based public site with on-demand revalidation so editors publish without a redeploy.",
    role: "Full-stack",
    client: "Responsible AI Africa",
    engagement: "Independent contract, scoped by feature",
    year: "2025",
    category: "Civic Tech",
    tags: ["Next.js", "TypeScript", "Payload CMS", "Mantine", "MongoDB"],
    isLive: true,
    liveUrl: "https://responsibleai.africa",
    coverImage: "/projects/raia/cover.png",
    context:
      "Africa's responsible-AI ecosystem — the people, funders, events, initiatives, and country-level policy landscape — was scattered across PDFs, mailing lists, and social posts. Raia centralises it into one searchable, continuously-updated hub that a non-technical editorial team can run themselves, while the public site stays fast and current.",
    constraints: [
      "Non-technical editors own all content — everything runs through the Payload admin, not code.",
      "Published content must go live without a redeploy — on-demand revalidation wired into collection hooks.",
      "Transactional email had to be reliable, so it's modelled as a persisted email outbox rather than fire-and-forget.",
      "A dozen content types share one consistent, searchable public surface.",
    ],
    process: [
      {
        title: "Model the ecosystem, then build the screens",
        body: "I defined the Payload collections — directories, funding, events, jobs, insights, international initiatives, countries — and the relationships between them before building the public UI. Getting the content model right first gave the editorial team a coherent system to fill instead of a pile of disconnected pages.",
        artifact: { kind: "image", src: "/projects/raia/countries.png" },
      },
      {
        title: "Editing without engineering",
        body: "The editorial team can't wait for a deploy to publish. I wired on-demand revalidation hooks into the collections so a single Payload edit invalidates exactly the affected pages — content goes live in seconds, with no redeploy and no stale cache.",
        artifact: { kind: "image", src: "/projects/raia/admin.png" },
      },
      {
        title: "Email as an outbox, not fire-and-forget",
        body: "Newsletter and contact flows can't silently drop messages. Rather than calling the email provider and hoping, I modelled an EmailOutbox collection so every transactional send is persisted, inspectable, and retryable — a queue you can audit instead of a side effect you can't.",
        artifact: { kind: "image", src: "/projects/raia/light.png" },
      },
    ],
    outcomes: [
      { number: "54", label: "African countries profiled" },
      { number: "7", label: "International AI initiatives tracked" },
      { number: "5", label: "Directory categories of AI actors" },
    ],
    lessons:
      "Building a content platform for a non-technical team taught me that the real product is the editing experience, not just the public site. Modelling the domain carefully up front — clear collections, honest relationships, a glossary everyone agrees on — does more for long-term velocity than any frontend polish. And treating side effects like email as persisted, inspectable state rather than fire-and-forget calls is what makes a content system trustworthy to run.",
  },
  {
    slug: "verivafrica",
    title: "Veriv Africa",
    descriptor:
      "Data intelligence platform for Nigerian businesses and policymakers.",
    overview:
      "Veriv Africa publishes economic analyses, macroeconomic outlooks, policy explainers, and thematic articles for businesses, investors, and government stakeholders across Nigeria. I built the full frontend: the editorial article and insights system, long-form content rendering across two CMSes, the Mantine component layer, and the Framer Motion motion design.",
    role: "Frontend",
    client: "Veriv Africa",
    year: "2024",
    category: "Media",
    tags: ["Next.js", "Mantine", "Sanity", "TypeScript", "Framer Motion"],
    isLive: true,
    liveUrl: "https://verivafrica.com",
    coverImage: "/projects/verivafrica/cover.png",
    context:
      "Nigerian decision-makers — businesses, investors, policymakers — lacked a trusted, data-grounded platform for rigorous economic and political analysis. The team had the research and the contributors; the missing piece was a frontend that made that content feel credible, readable, and worth returning to.",
    constraints: [
      "Dual CMS (Contentful + Sanity) — two content pipelines feeding one consistent editorial UI.",
      "SSR on every article page — no stale cache on a live-analysis platform.",
      "Motion had to feel modern without distracting from serious policy and economic content.",
    ],
    process: [
      {
        title: "Content architecture before components",
        body: "The publishing flow had to scale across reports, insights, and category pages before the first screen was built. I mapped the content types coming from Contentful and Sanity and established the layout contracts each would need — column widths, typographic rhythm, spacing scale — before writing a component.",
        artifact: { kind: "image", src: "/projects/verivafrica/cover.png" },
      },
      {
        title: "Pushing Mantine past its dashboard defaults",
        body: "Mantine defaults toward data-dense UIs. A long-form editorial platform needs something different — tighter leading, wider measure, quieter chrome. I reworked the typographic and spacing system to read well at depth while keeping the component library consistent and maintainable underneath.",
        artifact: { kind: "image", src: "/projects/verivafrica/cover.png" },
      },
      {
        title: "Motion that earns its place",
        body: "A research platform can't feel like a product launch site. Every animation is transform-based and capped at the section level — no loops, no distractions. The hero fades up on load; the page breathes. Motion signals freshness without competing with the content.",
        artifact: {
          kind: "code",
          body: `const variants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

<motion.div
  initial="hidden"
  animate="visible"
  transition={{ duration: 2.5 }}
  variants={variants}
>
  <Image src={hero.src} alt="hero" h="100%" w="100%" />
</motion.div>`,
        },
      },
    ],
    outcomes: [
      { number: "02/2024", label: "Platform launch" },
      { number: "3", label: "Content types: articles, reports, insights" },
      { number: "10+", label: "Thematic categories at launch" },
    ],
    lessons:
      "Building Veriv Africa taught me that frontend engineering is heavily tied to perception and trust — especially for research-driven platforms. Small decisions around typography, spacing, motion, and content hierarchy completely change how credible or approachable information feels. Motion works best when it supports clarity instead of competing for attention. The project pushed me to think less like someone assembling components and more like someone shaping how people consume and interpret information.",
  },
  {
    slug: "qatapolt",
    title: "Qatapolt Admin",
    descriptor: "Admin dashboard for a sports social network.",
    overview:
      "Qatapolt is a sports social network where athletes build sport-tagged profiles, post content, follow each other, and earn trophies. The operations team needed a single surface to monitor platform health and moderate the community. I built the dashboard metrics layer, the multi-module admin UI — enquiries, reported users, reported posts, news CRUD with a TipTap rich-text editor — the account moderation flows, and the trophies management screen.",
    role: "Frontend",
    client: "Qatapolt",
    year: "2024",
    category: "Sports",
    tags: ["Next.js", "TypeScript", "Mantine", "Recharts", "Zustand"],
    isLive: true,
    liveUrl: "https://admin-qatapolt.vercel.app",
    liveUrlGated: true,
    coverImage: "/projects/qatapolt/cover.png",
    context:
      "The sports community launched with user-reported content and conduct issues spread across manual processes. The ops team needed a unified admin surface to track platform health — downloads, users, posts — moderate reported content and users, manage the news feed, and act on account escalations, all without pulling in engineering.",
    constraints: [
      "Three separate backend services (core, liaison, admin), each expecting the same forwarded session token.",
      "Cookie-based JWT had to be threaded cleanly through every Next.js Server Action or the whole surface failed silently.",
      "Mantine Charts and Recharts coexist — donut and area charts on Mantine, other views on Recharts.",
      "TipTap rich-text editor for news had to produce portable HTML persisted to the backend.",
    ],
    process: [
      {
        title: "A dashboard that reads at a glance",
        body: "The landing surface answers the operator's first three questions immediately — how many downloads, posts, and users — then breaks the user base down by age, gender, and country. Server Actions fetch metrics and visitors with the session token forwarded from cookies; the data is passed straight to Mantine donut charts and a paginated visitor table tagged by sport.",
        artifact: { kind: "image", src: "/projects/qatapolt/cover.png" },
      },
      {
        title: "Moderation as a queue, not a hunt",
        body: "Reported users and posts arrive with everything an operator needs to decide: category (harassment, spam, fraud, impersonation), reason, reporter, and status. The job wasn't displaying the reports — it was removing every extra click between seeing a problem and resolving it, so block and delete actions live inline.",
        artifact: { kind: "image", src: "/projects/qatapolt/cover.png" },
      },
      {
        title: "Forwarding auth through every Server Action",
        body: "Three backend services sat behind the admin, each expecting the same bearer token. I treated auth threading as an architectural concern rather than a per-request afterthought: every Server Action reads the qatAuth cookie and forwards it, so a single session drives the whole surface.",
        artifact: {
          kind: "code",
          body: `// every admin server action forwards the session token
export const getDashMetrics = async () => {
  const token = (await cookies()).get("qatAuth")?.value;
  const { data: res } = await axios.get(\`\${core}/admin/dashboard/metrics\`, {
    headers: { Authorization: \`Bearer \${token}\` },
  });
  return { success: true, data: res.data };
};`,
        },
      },
    ],
    outcomes: [
      { number: "9", label: "Admin modules in one dashboard" },
      { number: "3", label: "Backend services behind one session" },
      { number: "4", label: "Report categories in the moderation queue" },
    ],
    lessons:
      "Admin dashboards tempt you to surface everything the backend exposes. The harder discipline was deciding what an operator actually acts on daily — metrics to glance at, queues to clear — and letting the rest stay one click away. Moderation tooling in particular lives or dies on how fast someone can go from signal to action.",
  },
  {
    slug: "farmgrow",
    title: "FarmGrow",
    descriptor: "AI farming assistant in one chat workspace.",
    overview:
      'FarmGrow is an AI farming assistant — a chat workspace that answers questions on crops, soil health, pests, weather, and sustainable farm planning. Built on the Vercel AI SDK with switchable models (Claude, Gemini, GPT), it runs a structured "Agricultural Strategist" persona that returns a consistent diagnosis → yield-gap → integrated-strategy → economics → risk format. I built it full-stack: the XML-driven prompt system, the streaming chat API, a branching conversation model on MongoDB/Prisma, tool-call and token/latency telemetry, shareable sessions, and the UI.',
    role: "Full-stack",
    client: "FarmGrow",
    year: "2026",
    category: "AI",
    tags: ["Next.js", "TypeScript", "Vercel AI SDK", "MongoDB", "Prisma"],
    isLive: true,
    liveUrl: "https://farmgrow.vercel.app",
    coverImage: "/projects/farmgrow/cover.png",
    context:
      "General-purpose chatbots give farmers vague, unstructured advice. FarmGrow constrains a multi-model LLM into an agricultural-consultant workflow — always reasoning through soil, water, pest pressure, and economics, and always answering in the same actionable structure — so a farmer or extension officer gets decision-ready guidance rather than prose.",
    constraints: [
      "Advice must be structured and decision-ready — a strict response schema (diagnosis, yield-gap, integrated strategy, economics, risk) the model can't skip.",
      "The assistant must not fabricate — grounding, citation, and missing-context-gating rules baked into the prompt files, with a pre-finalize verification loop.",
      "Conversations need edits and regenerations, not a flat log — messages modelled as a branching tree (parent/child, turn/role ordering).",
      "Serverless MongoDB cold-starts were adding ~15s per request — removed a redundant `$connect()` and tuned the connection pool.",
      "One chat surface, multiple model providers (Claude, Gemini, GPT) with per-session config.",
    ],
    process: [
      {
        title: "Persona as engineered files, not a string",
        body: "I split the system prompt into versioned XML — identity, knowledge, task, constraints, methodology, response_schema — loaded by a prompt loader, so the agricultural persona and its output contract are maintainable and testable rather than a wall of text. Every answer is forced through the same five sections, with a verification loop that checks soil-health and IPM thresholds before finalizing.",
        artifact: {
          kind: "code",
          body: `// src/prompts/promptLoader.ts — persona assembled from versioned files
const SYSTEM = [
  "identity", "knowledge", "task",
  "constraints", "methodology", "response_schema",
].map(load).join("\\n\\n");
// response_schema enforces: diagnosis -> yield_gap_analysis ->
// integrated_strategy (IPM) -> economic_impact -> risk_mitigation`,
        },
      },
      {
        title: "A chat backend that remembers structure",
        body: "I built the streaming chat API on the Vercel AI SDK over a MongoDB/Prisma model with branching messages, persisted tool invocations, per-run token/latency telemetry, auto-generated titles, and shareable sessions — so a conversation is an editable tree, not a flat log.",
        artifact: {
          kind: "code",
          body: `// branching conversation tree (prisma/schema.prisma)
model Message {
  turnIndex       Int
  roleOrder       Int     @default(0)
  parentMessageId String? @db.ObjectId
  parentMessage   Message?  @relation("MessageBranch", fields: [parentMessageId], references: [id])
  children        Message[] @relation("MessageBranch")
  toolInvocations ToolInvocation[]
  @@index([sessionId, turnIndex, roleOrder])
}`,
        },
      },
      {
        title: "Make it fast and shippable",
        body: "I traced a ~15s per-request delay to a redundant Prisma $connect() on every query, removed it (Prisma connects lazily on first query) and added connection-pool config — then rounded it out with streaming markdown (code, math, mermaid), SEO/PWA metadata, and dynamic social images.",
        artifact: {
          kind: "code",
          body: `// before: forced a new connection on every request (~15s cold start)
await prisma.$connect();
return await action();

// after: Prisma auto-connects lazily on first query
return await action();`,
        },
      },
    ],
    outcomes: [
      { number: "3", label: "LLM providers switchable (Claude, Gemini, GPT)" },
      { number: "5", label: "Structured sections every answer follows" },
      { number: "~15s", label: "Per-request DB latency removed" },
    ],
    lessons:
      "Prompt engineering belongs in version-controlled files with an enforced output contract, not a string literal — that's what turns a general LLM into a domain expert you can actually maintain.",
  },
  {
    slug: "reunitar",
    title: "Reunitar",
    descriptor:
      "Offline-first lost-and-found operations for large conventions.",
    overview:
      "Reunitar is an offline-first lost-and-found operations app for large conventions. Staff run checkroom and lost-and-found counters — item intake, release, claims, disposition, missing-item reports, and person-case escalation — across multiple conventions, with role-scoped access and post-event reporting. I built it full-stack on Next.js and Prisma, including a local-first RxDB sync layer so staff keep working when venue Wi-Fi drops, and a semantic search layer (MongoDB Atlas vector + hybrid search) that matches free-text descriptions of lost and found items.",
    role: "Full-stack",
    client: "Reunitar",
    year: "2026",
    category: "Operations",
    tags: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "RxDB",
      "Vector Search",
      "shadcn/ui",
    ],
    isLive: false,
    coverImage: "/projects/reunitar/cover.png",
    context:
      "Lost-and-found at a big convention is a logistics problem: thousands of items, rotating volunteer staff, anxious attendees, and notoriously unreliable venue Wi-Fi. Reunitar gives staff a single operations workspace that keeps running offline, matches found items to missing reports by meaning rather than exact keywords, and gives supervisors coverage alerts and post-event reporting.",
    constraints: [
      "Venue Wi-Fi is unreliable — intake and person-cases must work fully offline and sync later (RxDB + custom pull/push).",
      "`navigator.onLine` can't be trusted, so writes auto-fall-back to local IndexedDB on detected network failure.",
      "Offline edits create genuine conflicts — resolved server-wins automatically, with a human-in-the-loop merge UI for real divergence.",
      "Auth itself must survive offline — a signed session-cache JWT keeps staff working for 24h without the database.",
      "Matching lost to found items needs meaning, not exact keywords — semantic vector search with a text fallback.",
    ],
    process: [
      {
        title: "Local-first so the counter never stops",
        body: "I built the ops UI on RxDB (IndexedDB) with custom pull/push sync endpoints. Item intake and person-cases are fully readable and writable offline; changes replicate when connectivity returns. Forms try the server first, then silently fall back to local creation on network failure.",
        artifact: { kind: "image", src: "/projects/reunitar/cover.png" },
      },
      {
        title: "Trustworthy sync and offline auth",
        body: 'I layered in conflict resolution (automatic server-wins plus a human-in-the-loop merge UI) and a signed session-cache JWT so authentication survives a 24-hour database outage — because at a live event, "the server is down" can\'t mean "stop working."',
        artifact: { kind: "image", src: "/projects/reunitar/cover.png" },
      },
      {
        title: "Semantic matching, then a leaner backend",
        body: 'Lost items rarely match found items by exact words ("black hoodie" vs "dark sweatshirt"), so I added vector and hybrid search with a keyword fallback. I then migrated the whole embedding pipeline from PostgreSQL + pgvector + Redis + BullMQ + OpenAI to MongoDB Atlas Automated Embeddings (Voyage AI) — Atlas embeds on write, which removed four moving parts from the backend.',
        artifact: { kind: "image", src: "/projects/reunitar/cover.png" },
      },
    ],
    outcomes: [
      { number: "5", label: "Staff roles with scoped, offline-capable access" },
      {
        number: "3",
        label: "Search strategies: vector, hybrid, text fallback",
      },
      {
        number: "−4",
        label: "Backend services removed in the Atlas migration",
      },
    ],
    lessons:
      "Designing for genuine offline means distrusting navigator.onLine and treating sync, conflicts, and even auth as first-class offline problems — and managed embeddings (Atlas + Voyage AI) bought that resilience back by removing a whole self-run OpenAI + Redis + BullMQ pipeline.",
  },
];

export function nextOf(slug: string): Work {
  const i = works.findIndex((p) => p.slug === slug);
  if (i < 0) return works[0];
  return works[(i + 1) % works.length];
}

export function prevOf(slug: string): Work {
  const i = works.findIndex((p) => p.slug === slug);
  if (i < 0) return works[0];
  return works[(i - 1 + works.length) % works.length];
}

export const NEXT_OF = nextOf;
export const PREV_OF = prevOf;
