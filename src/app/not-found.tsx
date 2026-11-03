import Link from "next/link";
import { ArrowUpRight, SearchX } from "lucide-react";

import GridMotion from "@/components/GridMotion";
import Magnet from "@/components/Magnet";
import { Button } from "@/components/ui/button";

const GRID_ITEMS = [
  "Home",
  "Works",
  "About",
  "Contact",
  "Helium ID",
  "Veriv Africa",
  "Prune",
  "Qatapolt",
  "re:current",
  "Frontend",
  "Developer",
  "Design",
  "Code",
  "React",
  "Case study",
  "Live preview",
  "Repository",
  "Article",
  "Portfolio",
  "BalmofCodes",
  "Gilead Odo",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "shadcn/ui",
  "GSAP",
  "Motion",
  "Resend",
];

export default function NotFound() {
  return (
    <section className="relative min-h-0 flex-1 overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-70">
        <GridMotion
          items={GRID_ITEMS}
          gradientColor="transparent"
          tileClassName="min-h-32 !border-zinc-300/70 !bg-zinc-100/85 !text-zinc-600/70 text-sm font-semibold uppercase tracking-normal shadow-2xl shadow-zinc-300/30 dark:!border-white/10 dark:!bg-zinc-950/85 dark:!text-zinc-300/55 dark:shadow-black/40 md:text-base"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_62%_at_50%_48%,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.86)_42%,rgba(255,255,255,0.58)_72%,rgba(255,255,255,0.94)_100%)] dark:bg-[radial-gradient(ellipse_58%_62%_at_50%_48%,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.78)_42%,rgba(0,0,0,0.48)_72%,rgba(0,0,0,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),transparent_24%,transparent_70%,rgba(255,255,255,0.9))] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.7),transparent_24%,transparent_70%,rgba(0,0,0,0.82))]" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-10 text-center">
        <div className="mb-7 flex size-16 items-center justify-center rounded-full border border-primary/45 bg-background/85 shadow-[0_0_40px_rgba(120,140,0,0.12)] backdrop-blur dark:shadow-[0_0_40px_rgba(242,251,122,0.14)]">
          <SearchX className="size-7 text-primary" aria-hidden="true" />
        </div>

        <p className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase text-primary">
          404 / Route missing
        </p>

        <h1 className="max-w-3xl text-5xl font-bold leading-none text-foreground md:text-7xl">
          <span className="font-display italic font-normal text-muted-foreground">
            Page
          </span>{" "}
          <span className="font-heading not-italic">not found</span>
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          This route is not part of the current portfolio map. Head back home or
          jump straight into the work.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Magnet magnetStrength={3} padding={50}>
            <Button
              render={<Link href="/" />}
              nativeButton={false}
              size="lg"
              className="rounded-full px-8"
            >
              Back home
            </Button>
          </Magnet>
          <Button
            render={<Link href="/works" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="rounded-full px-8"
          >
            View works
            <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
