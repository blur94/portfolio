export type WorkArtifact =
  | { kind: "image"; src: string; width: number; height: number }
  | { kind: "code"; language: string; body: string };

export type WorkProcessStep = {
  title: string;
  body: string;
  /** Left out rather than repeating an image already shown on the page. */
  artifact?: WorkArtifact;
};

export type WorkOutcome = {
  number: string;
  label: string;
};

export type Work = {
  slug: string;
  /**
   * Date of the last meaningful content change (YYYY-MM-DD), used as the
   * sitemap's lastmod. Bump it when the case study's content changes.
   */
  updatedAt: string;
  title: string;
  descriptor: string;
  overview: string;
  role: string;
  /** Left out for personal projects, which have no client. */
  client?: string;
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
    updatedAt: "2026-11-03",
    title: "Prune Payments",
    descriptor:
      "Cross-border payments platform for consumers and businesses.",
    overview:
      "Prune is a cross-border payments platform. Consumers use it to send money home, and businesses use it for international payments, payouts, and multi-currency accounts in EUR, GBP, and USD, with IBAN, Sort Code, and ACH details. I worked on both the consumer and business sides. On the business side, I built the frontend for two apps. The business dashboard covers accounts, transactions, payouts, beneficiaries, debit requests, and role-based team management. The internal admin console covers business onboarding (KYB), eligibility, pricing plans, and account approvals.",
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
      "Businesses that want to offer banking features rarely want to become a bank. Prune provides account issuing, payouts, and transactions as a service, so a business can open multi-currency accounts and move money under its own brand. That requires two different apps, a self-serve dashboard for the business and an internal admin console where Prune vets and manages those businesses.",
    constraints: [
      "Four separate backend services (auth, core, accounts, payout) behind one client, with environment variables validated by Zod at boot.",
      "Two distinct apps in one codebase: the business dashboard and the internal admin, split via Next.js route groups.",
      "Role-based access control with an initiator/approver model, with granular permissions on every sensitive action.",
      "Money-movement documents (receipts, statements) generated client-side as PDF and exported to Excel.",
    ],
    process: [
      {
        title: "Two apps, one codebase",
        body: "The platform serves two different users, businesses operating their own accounts and Prune staff vetting those businesses. I split them into separate Next.js route groups, each with its own layout, navigation, and permission model, so business and staff flows stay apart.",
        artifact: {
          kind: "image",
          src: "/projects/prune/customer.png",
          width: 1920,
          height: 1440,
        },
      },
      {
        title: "Role-based permissions",
        body: "I built RBAC around an initiator/approver pattern. A useHasPermission hook gates sensitive actions such as transaction initiation and approvals, so the UI changes with each team member's role instead of relying on a single admin flag.",
      },
      {
        title: "Multi-currency accounts and money movement",
        body: "Each account has its own IBAN, Sort Code, or ACH Routing details across EUR, GBP, and USD, with per-currency transaction views, payouts, and downloadable statements. The client generates receipts and statements as PDF and exports them to Excel, matching what's on screen.",
      },
    ],
    outcomes: [
      { number: "3", label: "Account currencies: EUR, GBP, USD" },
      { number: "2", label: "Apps: business dashboard, internal admin" },
      { number: "4", label: "Backend services behind one client" },
    ],
    lessons:
      "Building money-movement software taught me to treat permissions as part of the architecture. With an initiator/approver flow, every screen has to answer who can do this and what happens when they can't. Splitting the business and admin apps early kept that complexity out of a shared layout.",
  },
  {
    slug: "recurrent",
    updatedAt: "2026-11-03",
    title: "re:current",
    descriptor:
      "Property management platform for Nigerian landlords and letting agents.",
    overview:
      "re:current is a full-stack property management platform for landlords, property managers, shortlet hosts, and realtors. It consolidates tenant onboarding, rent collection, invoicing, bookings, and identity verification into one dashboard. I built the frontend: the route group architecture, the booking calendar, PDF agreement and invoice generation, and the real-time dashboard layer.",
    role: "Frontend",
    client: "Current Finance Limited",
    engagement: "Built under C80 Limited",
    year: "2023",
    category: "PropTech",
    tags: ["Next.js", "Mantine", "TypeScript", "TanStack Query", "Socket.io"],
    isLive: true,
    liveUrl: "https://recurrent.ng",
    coverImage: "/projects/recurrent/cover.png",
    context:
      "Landlords and property managers were running their operations across separate tools, with their own invoicing software, manual KYC, paper tenancy agreements, and no single view of bookings or payments. re:current puts tenant onboarding and verification, rent collection, short-let bookings, and digital agreements in one platform.",
    constraints: [
      "Three property modes (rentals, short-lets, and sales), each with different data models, workflows, and UI flows under a single dashboard.",
      "Identity verification at both tenant onboarding and guest check-in/check-out, integrated via Veriff SDK.",
      "Tenants sign these tenancy agreements, so the PDF layout had to match the signed document exactly.",
      "Real-time metrics (live user count, booking updates) via Socket.io without impacting dashboard stability.",
    ],
    process: [
      {
        title: "Separating landlord and guest areas",
        body: "The platform serves two different users, landlords managing their properties and guests booking short-lets. I split these into separate route groups, (landlord) for the authenticated landlord dashboard and (public) for guest-facing property listings and booking pages. Each area has its own layout, auth logic, and data loading.",
        artifact: {
          kind: "image",
          src: "/projects/recurrent/banking.png",
          width: 1905,
          height: 1350,
        },
      },
      {
        title: "A per-unit availability calendar",
        body: "Short-let and hotel bookings need per-unit availability tracking across multiple days, with OTA channel sync to prevent double-bookings. I built the calendar view on Schedule-X and connected it to the booking state. Each day cell shows which units are available, occupied, or pending, so the landlord doesn't need to check a separate list.",
        artifact: {
          kind: "image",
          src: "/projects/recurrent/shortlets.png",
          width: 1920,
          height: 941,
        },
      },
      {
        title: "PDF generation for agreements and invoices",
        body: "Tenants sign tenancy agreements and landlords store them and invoices for years. No single PDF library handled both structured agreement layouts and invoice snapshots well, so I used react-pdf/renderer for agreements and jspdf with html2canvas for invoices. The output matches what's on screen.",
        artifact: {
          kind: "image",
          src: "/projects/recurrent/invoice.png",
          width: 1654,
          height: 2339,
        },
      },
    ],
    outcomes: [
      { number: "3", label: "Property modes: rentals, short-lets, sales" },
      { number: "2", label: "Separate areas: landlord and guest" },
      { number: "2", label: "PDF pipelines: agreements and invoices" },
    ],
    lessons:
      "Building re:current taught me that real operational workflows are rarely linear. Payments, agreements, bookings, and verification interact, and that creates edge cases quickly. Most of the work went into keeping the system understandable when those exceptions appeared.",
  },
  {
    slug: "heliumid",
    updatedAt: "2026-11-03",
    title: "Helium ID",
    descriptor:
      "Enterprise identity verification and digital-identity platform.",
    overview:
      "Helium ID is an enterprise identity platform. Businesses verify identities in real time with AI ID checks, facial comparison, liveness, and NIN lookups. They can also issue customers a digital identity wallet and authenticate users with MFA and \"Login with Helium ID\". I built the frontend on Next.js with TanStack Query and Table, Zustand, and a server-validated auth layer. That covers the marketing site and the business admin portal, including verifications, a developer and API-keys console, events, insights, billing, team, and multi-step workspace onboarding.",
    role: "Frontend",
    client: "Helium ID",
    engagement: "Built under C80 Limited",
    year: "2026",
    category: "Identity",
    tags: ["Next.js", "TypeScript", "TanStack Query", "Zustand", "shadcn/ui"],
    isLive: true,
    liveUrl: "https://heliumid.io",
    coverImage: "/projects/heliumid/cover.png",
    context:
      "Enterprises that verify customers, such as banks, fintechs, and document platforms, don't want to build identity infrastructure themselves. Helium ID provides verification, a digital identity wallet, and authentication as a single platform with an admin console and APIs. That means a data-dense dashboard where businesses run verifications, and a public site to sell the product.",
    constraints: [
      "Identity admin is sensitive, so the backend revalidates the session on every request instead of trusting a cookie.",
      "Admin users need MFA, so there are dedicated 2FA, OTP, and access auth flows.",
      "The dashboard is data-heavy. Verifications, events, and insights use TanStack Query and Table with Recharts.",
      "Businesses onboard themselves, and a multi-step workspace setup comes before portal access.",
      "A developer console for API keys and integration management is its own module.",
    ],
    process: [
      {
        title: "An admin dashboard for identity checks",
        body: "I built the admin portal's verifications, events, insights, billing, and team modules on TanStack Query and Table with Recharts analytics. Filters and pagination use nuqs URL state, and auth and workspace state live in Zustand stores. Each verification row tracks status (started, successful, failed), method, and the API key that initiated it.",
        artifact: {
          kind: "image",
          src: "/projects/heliumid/light.png",
          width: 1920,
          height: 1440,
        },
      },
      {
        title: "Server-validated auth",
        body: "For an identity product, trusting a cookie isn't enough. A request proxy revalidates the session against the backend (`/admin/auth/me`) on every navigation. It redirects authenticated users away from auth routes and sends everyone else to a login that remembers their destination. MFA and OTP flows sit on top.",
        artifact: {
          kind: "code",
          language: "typescript",
          body: `// proxy.ts: revalidate the session on every request
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
        title: "Self-serve onboarding and developer console",
        body: "I built a multi-step workspace setup so businesses provision themselves, and a developers module for API keys and integration management, which matches the platform's API-first pitch. I also built the Motion-animated, MDX-driven marketing site with shiki-highlighted docs.",
        artifact: {
          kind: "code",
          language: "typescript",
          body: `// middleware matcher: guard the whole app except assets/api
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};`,
        },
      },
    ],
    outcomes: [
      { number: "7", label: "Admin modules across the admin portal" },
      {
        number: "4",
        label: "Verification methods (ID, facial, liveness, NIN)",
      },
      { number: "2", label: "Parts: admin portal, marketing site" },
    ],
    lessons:
      "For an identity product, revalidating sessions on the server and requiring MFA mattered more than any single screen. A data-dense admin console also depends on its table, query, and URL-state code staying consistent across modules.",
  },
  {
    slug: "paystat",
    updatedAt: "2026-11-03",
    title: "Paystat",
    descriptor: "Multi-tenant payroll and HR platform.",
    overview:
      "Paystat is a multi-tenant payroll and HR platform. Companies process payroll, manage employees and attendance, and run reports, each on its own branded subdomain. I built the frontend on Next.js with Mantine, AG Grid, and TanStack Query. It has 12 modules, including payroll, people, attendance, accounts, insights, integrations, workflows, and an AI assistant. I also built account number and IBAN validation for 15+ countries, and an AI-generated organogram on an editable React Flow canvas.",
    role: "Frontend",
    client: "Paystat",
    engagement: "Built under C80 Limited",
    year: "2024",
    category: "HR Tech",
    tags: ["Next.js", "TypeScript", "Mantine", "AG Grid", "React Flow"],
    isLive: true,
    liveUrl: "https://paystat.dev",
    coverImage: "/projects/paystat/cover.png",
    context:
      "Payroll spans countries, banking formats, and org structures that differ at every company. Paystat runs each company as a tenant on its own subdomain. It validates bank accounts and IBANs across 15+ countries' formats, generates and edits org charts, and exports payroll reports, so HR teams can pay people accurately and on time.",
    constraints: [
      "Every company is its own tenant. Middleware resolves the subdomain, confirms the company exists, and validates the JWT before any page renders.",
      "Payroll pays people across borders, which needs bank-account and IBAN validation for 15+ countries' formats, including sort codes, routing numbers, and BSB.",
      "HR teams edit org structures visually, using an AI-generated organogram on a React Flow canvas with drag, reconnect, and export.",
      "Every payroll report exports to PDF, Excel, CSV, and print.",
      "Non-technical HR users onboard themselves, with guided product tours and live form-format hints.",
    ],
    process: [
      {
        title: "Subdomain multi-tenancy",
        body: "I built subdomain-based multi-tenancy in middleware. It extracts the company from the host, checks it exists on the backend, then validates the session JWT (`/v1/auth/me`). Auth redirects remember the user's destination. Each company gets a branded, isolated workspace from a single deployment.",
        artifact: {
          kind: "code",
          language: "typescript",
          body: `// src/middleware.ts: resolve tenant from the subdomain, then auth
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
        title: "International bank validation",
        body: "Payroll can't fail on a malformed account number. I wrote banking validation for 15+ countries, with per-country account formats, IBAN validation, sort codes, routing numbers, and BSB. It includes a debounced account-lookup hook and a helper component that shows the expected format as the user types.",
        artifact: {
          kind: "code",
          language: "typescript",
          body: `// src/lib/utils/bankingValidation.ts: per-country formats + IBAN
validateAccountNumber("DE89370400440532013000", "DE"); // IBAN
validateAccountNumber("0123456789", "NG");              // 10-digit
validateAccountNumber("12345678", "GB");                // 8-digit + sort code
// supports NG, US, GB, DE, FR, CA, AU … (15+ countries)`,
        },
      },
      {
        title: "Editable org charts and payroll exports",
        body: "I built an AI-generated organogram. A prompt-to-org-chart route in the app renders onto a React Flow canvas where HR can drag, reconnect, and export the chart, with positions and units CRUD and reorderable approval workflows behind it. Every payroll report also exports as PDF, Excel, CSV, or print.",
        artifact: {
          kind: "code",
          language: "typescript",
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
      "Subdomain multi-tenancy belongs in the middleware. When tenant resolution and session validation happen there, every module is isolated without extra code. International banking formats also take real work, because validating an account number means 15 different rules.",
  },
  {
    slug: "raia",
    updatedAt: "2026-11-03",
    title: "Raia",
    descriptor: "Ecosystem hub for responsible AI across Africa.",
    overview:
      "Responsible AI Africa is a hub for the continent's responsible-AI community. It has directories of organisations and AI indexes, funding opportunities, events, jobs, and country-level AI profiles. I built it on Payload CMS, including the content model and collections, an access-control layer, a transactional email outbox, and the Mantine-based public site. On-demand revalidation lets editors publish without a redeploy.",
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
      "Information about Africa's responsible-AI people, funders, events, initiatives, and country-level policy was scattered across PDFs, mailing lists, and social posts. Raia puts it in one searchable hub that a non-technical editorial team can run and update.",
    constraints: [
      "Non-technical editors own all content, and everything runs through the Payload admin.",
      "Published content must go live without a redeploy, so collection hooks trigger on-demand revalidation.",
      "Transactional email had to be reliable, so each message is stored in a persisted email outbox.",
      "A dozen content types share one searchable public site.",
    ],
    process: [
      {
        title: "Model the ecosystem, then build the screens",
        body: "I defined the Payload collections for directories, funding, events, jobs, insights, international initiatives, and countries, plus the relationships between them, before building the public UI. That gave the editorial team a connected system to fill in.",
        artifact: {
          kind: "image",
          src: "/projects/raia/countries.png",
          width: 1920,
          height: 1440,
        },
      },
      {
        title: "Publishing without a deploy",
        body: "The editorial team can't wait for a deploy to publish. On-demand revalidation hooks in the collections mean a single Payload edit invalidates the affected pages, so content goes live in seconds with no redeploy and no stale cache.",
        artifact: {
          kind: "image",
          src: "/projects/raia/admin.png",
          width: 1920,
          height: 1440,
        },
      },
      {
        title: "A persisted email outbox",
        body: "Newsletter and contact flows can't silently drop messages. I modelled an EmailOutbox collection that stores every transactional send, so the team can inspect, retry, and audit each one.",
        artifact: {
          kind: "image",
          src: "/projects/raia/light.png",
          width: 1920,
          height: 1440,
        },
      },
    ],
    outcomes: [
      { number: "54", label: "African countries profiled" },
      { number: "7", label: "International AI initiatives tracked" },
      { number: "5", label: "Directory categories of AI actors" },
    ],
    lessons:
      "Building a content platform for a non-technical team taught me that the editing experience matters as much as the public site. Clear collections, accurate relationships, and a shared glossary did more for long-term delivery speed than frontend polish. Storing email sends as records the team can inspect also made the system easier to run.",
  },
  {
    slug: "verivafrica",
    updatedAt: "2026-11-03",
    title: "Veriv Africa",
    descriptor:
      "Data intelligence platform for Nigerian businesses and policymakers.",
    overview:
      "Veriv Africa publishes economic analyses, macroeconomic outlooks, policy explainers, and thematic articles for businesses, investors, and government stakeholders across Nigeria. I built the full frontend: the editorial article and insights system, long-form content rendering across two CMSes, the Mantine component layer, and the Framer Motion motion design.",
    role: "Frontend",
    client: "Veriv Africa",
    engagement: "Contract work",
    year: "2024",
    category: "Media",
    tags: ["Next.js", "Mantine", "Sanity", "TypeScript", "Framer Motion"],
    isLive: true,
    liveUrl: "https://verivafrica.com",
    coverImage: "/projects/verivafrica/cover.png",
    context:
      "Nigerian businesses, investors, and policymakers lacked a trusted, data-based platform for economic and political analysis. The team had the research and the contributors. They needed a frontend that made that content credible and easy to read.",
    constraints: [
      "Dual CMS (Contentful and Sanity), with two content pipelines feeding one editorial UI.",
      "SSR on every article page, so readers don't get stale cached analysis.",
      "Motion couldn't distract from serious policy and economic content.",
    ],
    process: [
      {
        title: "Content architecture before components",
        body: "The publishing flow had to scale across reports, insights, and category pages. Before I built any components, I mapped the content types from Contentful and Sanity and set the column widths, typographic rhythm, and spacing scale each one needed.",
      },
      {
        title: "Adapting Mantine for long-form reading",
        body: "Mantine defaults toward data-dense UIs. A long-form editorial platform needs tighter leading, a wider measure, and quieter chrome. I reworked the type and spacing system for long reading and kept the component library consistent underneath.",
      },
      {
        title: "Restrained motion",
        body: "A research platform shouldn't feel like a product launch site. Every animation uses transforms and runs at the section level, with no loops. The hero fades up on load, and the rest of the page stays still so readers can focus on the content.",
        artifact: {
          kind: "code",
          language: "tsx",
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
      { number: "10", label: "Thematic areas" },
    ],
    lessons:
      "Building Veriv Africa taught me how much frontend decisions affect trust on a research platform. Typography, spacing, motion, and content hierarchy all change how credible or approachable information feels. Motion works best when it supports clarity. The project made me think more about how people read and interpret information.",
  },
  {
    slug: "qatapolt",
    updatedAt: "2026-11-03",
    title: "Qatapolt Admin",
    descriptor: "Admin dashboard for a sports social network.",
    overview:
      "Qatapolt is a sports social network where athletes build sport-tagged profiles, post content, follow each other, and earn trophies. The operations team needed one place to monitor the platform and moderate the community. I built the dashboard metrics, the admin UI for enquiries, reported users, reported posts, and news (with a TipTap rich-text editor), the account moderation flows, and the trophies management screen.",
    role: "Frontend",
    client: "Qatapolt",
    engagement: "Contract work",
    year: "2024",
    category: "Sports",
    tags: ["Next.js", "TypeScript", "Mantine", "Recharts", "Zustand"],
    isLive: true,
    liveUrl: "https://admin-qatapolt.vercel.app",
    liveUrlGated: true,
    coverImage: "/projects/qatapolt/cover.png",
    context:
      "The sports community launched with user-reported content and conduct issues handled through manual processes. The ops team needed one admin app to track downloads, users, and posts, moderate reported content and users, manage the news feed, and act on account escalations without help from engineering.",
    constraints: [
      "Three separate backend services (core, liaison, admin), each expecting the same forwarded session token.",
      "Every Next.js Server Action had to forward the cookie-based JWT, or the admin failed silently.",
      "Mantine Charts draws the donut and area charts, and Recharts draws the other views.",
      "TipTap rich-text editor for news had to produce portable HTML persisted to the backend.",
    ],
    process: [
      {
        title: "A metrics-first dashboard",
        body: "The landing page shows downloads, posts, and users first, then breaks the user base down by age, gender, and country. Server Actions fetch metrics and visitors using the session token from cookies. Mantine donut charts and a paginated visitor table tagged by sport display the data.",
      },
      {
        title: "A moderation queue",
        body: "Each report shows the category (harassment, spam, fraud, impersonation), reason, reporter, and status. I focused on removing extra clicks between seeing a problem and resolving it, so block and delete actions sit inline.",
      },
      {
        title: "Forwarding auth through every Server Action",
        body: "Three backend services sat behind the admin, each expecting the same bearer token. Every Server Action reads the qatAuth cookie and forwards it, so a single session works across the whole admin.",
        artifact: {
          kind: "code",
          language: "typescript",
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
      "Admin dashboards tempt you to show everything the backend exposes. The harder job was deciding what the operations team acts on daily, like metrics and moderation queues, and keeping the rest one click away. Moderation tools depend on how quickly someone can go from seeing a report to acting on it.",
  },
  {
    slug: "farmgrow",
    updatedAt: "2026-11-03",
    title: "FarmGrow",
    descriptor: "AI farming assistant in one chat workspace.",
    overview:
      "FarmGrow is an AI farming assistant, a chat workspace that answers questions on crops, soil health, pests, weather, and sustainable farm planning. It runs on the Vercel AI SDK with switchable models (Claude, Gemini, GPT). A structured \"Agricultural Strategist\" persona answers in a fixed order of diagnosis, yield gap, integrated strategy, economics, and risk. I built it full-stack, including the XML-driven prompt system, the streaming chat API, a branching conversation model on MongoDB and Prisma, tool-call and token/latency telemetry, shareable sessions, and the UI.",
    role: "Full-stack",
    engagement: "Personal project",
    year: "2026",
    category: "AI",
    tags: ["Next.js", "TypeScript", "Vercel AI SDK", "MongoDB", "Prisma"],
    isLive: true,
    liveUrl: "https://farmgrow.vercel.app",
    coverImage: "/projects/farmgrow/cover.png",
    context:
      "General-purpose chatbots give farmers vague, unstructured advice. FarmGrow directs a multi-model LLM to act as an agricultural consultant. It reasons through soil, water, pest pressure, and economics, and answers in the same structure every time, so a farmer or extension officer can act on the result.",
    constraints: [
      "Each answer must follow a strict response schema (diagnosis, yield gap, integrated strategy, economics, risk) that the model can't skip.",
      "The assistant must not fabricate, so the prompt files include grounding, citation, and missing-context rules, with a verification loop before the final answer.",
      "Conversations need edits and regenerations, so messages form a branching tree (parent/child, turn/role ordering).",
      "Serverless MongoDB cold starts were adding roughly 15s per request by my estimate, so I removed a redundant `$connect()` and tuned the connection pool.",
      "One chat UI supports multiple model providers (Claude, Gemini, GPT) with per-session config.",
    ],
    process: [
      {
        title: "A persona built from versioned files",
        body: "I split the system prompt into versioned XML files for identity, knowledge, task, constraints, methodology, and response_schema, and a prompt loader assembles them. That makes the agricultural persona and its output format easier to maintain and test. Every answer follows the same five sections, and a verification loop checks soil-health and IPM thresholds before the final answer.",
        artifact: {
          kind: "code",
          language: "typescript",
          body: `// src/prompts/promptLoader.ts: persona assembled from versioned files
const SYSTEM = [
  "identity", "knowledge", "task",
  "constraints", "methodology", "response_schema",
].map(load).join("\\n\\n");
// response_schema enforces: diagnosis -> yield_gap_analysis ->
// integrated_strategy (IPM) -> economic_impact -> risk_mitigation`,
        },
      },
      {
        title: "A branching chat backend",
        body: "I built the streaming chat API on the Vercel AI SDK over a MongoDB and Prisma model. It has branching messages, persisted tool invocations, per-run token and latency telemetry, auto-generated titles, and shareable sessions, so a conversation is an editable tree.",
        artifact: {
          kind: "code",
          language: "prisma",
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
        title: "Performance and release work",
        body: "I traced a delay I estimated at roughly 15s per request to a redundant Prisma $connect() on every query. I removed it, because Prisma connects lazily on the first query, and added connection-pool config. I also added streaming markdown (code, math, mermaid), SEO and PWA metadata, and dynamic social images.",
        artifact: {
          kind: "code",
          language: "typescript",
          body: `// before: forced a new connection on every request (roughly 15s, estimated)
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
      { number: "~15s", label: "Estimated per-request delay removed" },
    ],
    lessons:
      "Prompts belong in version-controlled files with an enforced output format. That makes a domain-specific assistant easier to maintain than one driven by a string literal.",
  },
  {
    slug: "reunitar",
    updatedAt: "2026-11-03",
    title: "Reunitar",
    descriptor:
      "Offline-first lost-and-found operations for large conventions.",
    overview:
      "Reunitar is an offline-first lost-and-found operations app for large conventions. Staff run checkroom and lost-and-found counters across multiple conventions, handling item intake, release, claims, disposition, missing-item reports, and person-case escalation, with role-scoped access and post-event reporting. I built it full-stack on Next.js and Prisma. It includes a local-first RxDB sync layer so staff keep working when venue Wi-Fi drops, and MongoDB Atlas vector and hybrid search that matches free-text descriptions of lost and found items.",
    role: "Full-stack",
    engagement: "Personal project",
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
      "Lost-and-found at a big convention is a logistics problem, with thousands of items, rotating volunteer staff, anxious attendees, and unreliable venue Wi-Fi. Reunitar gives staff one operations workspace that keeps running offline and matches found items to missing reports by meaning. Supervisors also get coverage alerts and post-event reporting.",
    constraints: [
      "Venue Wi-Fi is unreliable, so intake and person-cases must work offline and sync later (RxDB with custom pull/push).",
      "`navigator.onLine` is unreliable, so writes fall back to local IndexedDB when a network failure is detected.",
      "Offline edits create conflicts. The server version wins automatically, and a merge UI lets a person resolve real divergence.",
      "Auth must work offline, so a signed session-cache JWT keeps staff working for 24h without the database.",
      "Matching lost to found items needs meaning as well as keywords, so semantic vector search has a text fallback.",
    ],
    process: [
      {
        title: "Local-first intake",
        body: "I built the ops UI on RxDB (IndexedDB) with custom pull/push sync endpoints. Staff can read and write item intake and person-cases offline, and changes replicate when the connection returns. Forms try the server first, then fall back to creating the record locally on network failure.",
      },
      {
        title: "Conflict resolution and offline auth",
        body: "I added conflict resolution, where the server version wins automatically and a merge UI handles real divergence. A signed session-cache JWT keeps authentication working through a 24-hour database outage, so staff can keep working at a live event.",
      },
      {
        title: "Semantic matching and a smaller backend",
        body: "Lost items rarely match found items by exact words (\"black hoodie\" vs \"dark sweatshirt\"), so I added vector and hybrid search with a keyword fallback. I then moved the embedding pipeline from PostgreSQL, pgvector, Redis, BullMQ, and OpenAI to MongoDB Atlas Automated Embeddings (Voyage AI). Atlas embeds on write, which removed four parts from the backend.",
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
      "Designing for offline means distrusting navigator.onLine and handling sync, conflicts, and auth as offline problems. Managed embeddings (Atlas and Voyage AI) also let me remove a self-run OpenAI, Redis, and BullMQ pipeline.",
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
