import type { Metadata } from "next";
import { Temporal } from "temporal-polyfill";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/Kicker";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Marquee } from "@/components/Marquee";
import { StaggeredGrid } from "@/components/StaggeredGrid";
import { CountStat } from "@/components/CountStat";
import { works } from "@/lib/works";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const selectedWorks = works.slice(0, 3);
  const yearsBuilding = Temporal.Now.plainDateISO().year - 2020;
  const liveProjects = works.filter((work) => work.isLive).length;

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="py-20 md:pb-30 md:pt-20">
        <div
          className="mx-auto px-6 md:px-10"
          style={{ maxWidth: "var(--container-max, 1440px)" }}
        >
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[55fr_45fr] md:gap-16">
            {/* Left: editorial copy */}
            <div>
              <Kicker>Frontend &amp; design engineering</Kicker>

              <h1
                className="mb-8 leading-[0.98] tracking-[-0.06em]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(56px, 7vw, 96px)",
                  color: "var(--text-primary)",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>
                  Hi there, I&rsquo;m{" "}
                </span>
                Gilead Odo.
              </h1>

              <p
                className="mb-5 text-lg leading-[1.4] tracking-[-0.03em] md:text-[22px]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-muted)",
                  maxWidth: "36ch",
                }}
              >
                I build complex web apps for fintech and SaaS teams, including
                payment dashboards, permissions, and multi-step workflows.
              </p>

              <p
                className="mb-10 text-base leading-normal tracking-[-0.02em] md:text-lg"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-secondary)",
                  maxWidth: "52ch",
                }}
              >
                Senior Frontend Engineer working in React, Next.js, and
                TypeScript. I work on architecture, design systems, and
                production workflows.
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <Button
                  render={<Link href="/works" />}
                  nativeButton={false}
                  className="inline-flex items-center gap-2"
                  style={{ height: 48, paddingInline: 24, fontSize: 15 }}
                >
                  View selected work
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Button>

                <Button
                  render={<Link href="/contact#contact-form" />}
                  nativeButton={false}
                  variant="ghost"
                  className="inline-flex items-center gap-2 px-0"
                  style={{
                    height: 48,
                    fontSize: 15,
                    color: "var(--text-primary)",
                  }}
                >
                  Discuss a contract
                </Button>
              </div>
            </div>

            {/* Right: browser frame */}
            <BrowserFrame
              src="/projects/prune/cover.png"
              imageAlt="Prune Payments admin dashboard"
              url="apas.prunepayments.net"
            />
          </div>
        </div>
      </section>

      {/* ── 2. TECH MARQUEE ─────────────────────────────────────── */}
      <Marquee />

      {/* ── 3. SELECTED WORK ────────────────────────────────────── */}
      <section className="py-24">
        <div
          className="mx-auto px-6 md:px-10"
          style={{ maxWidth: "var(--container-max, 1440px)" }}
        >
          {/* Section header */}
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <div>
              <Kicker>A handful of recent things</Kicker>
              <h2
                className="leading-[1.15] tracking-[-0.06em]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 32,
                  color: "var(--text-primary)",
                  maxWidth: "22ch",
                }}
              >
                Selected Work
              </h2>
            </div>

            <Button
              render={<Link href="/works" />}
              nativeButton={false}
              variant="outline"
              className="inline-flex items-center gap-2"
              style={{ height: 40, paddingInline: 20, fontSize: 14 }}
            >
              See all projects
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          <StaggeredGrid works={selectedWorks} />
        </div>
      </section>

      {/* ── 4. STATS ROW ────────────────────────────────────────── */}
      <section
        className="border-y"
        style={{ borderColor: "var(--border-faint)" }}
      >
        <div
          className="mx-auto px-6 py-24 md:px-10"
          style={{ maxWidth: "var(--container-max, 1440px)" }}
        >
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-16">
            <CountStat
              number={`${yearsBuilding}+`}
              label="Years building for the web"
            />
            <CountStat
              number={String(works.length)}
              label="Case studies published"
            />
            <CountStat number={String(liveProjects)} label="Projects live today" />
          </div>
        </div>
      </section>

      {/* ── 5. ABOUT TEASER ─────────────────────────────────────── */}
      <section className="py-24">
        <div
          className="mx-auto px-6 md:px-10"
          style={{ maxWidth: "var(--container-max, 1440px)" }}
        >
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[60fr_40fr] md:gap-24">
            {/* Left: copy */}
            <div>
              <Kicker>About me</Kicker>

              <h2
                className="mb-8 leading-none tracking-[-0.06em]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(40px, 4.5vw, 56px)",
                  color: "var(--text-primary)",
                  maxWidth: "16ch",
                }}
              >
                I write the code that holds the boring parts together.
              </h2>

              <p
                className="mb-5 text-lg leading-[1.55] tracking-[-0.02em] md:text-[22px]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-secondary)",
                  maxWidth: "65ch",
                }}
              >
                Most of my work is turning a process someone already does in
                spreadsheets into a screen they can work from. That usually means
                operator dashboards, payment permissions, and booking and identity
                workflows.
              </p>

              <p
                className="mb-8 text-lg leading-[1.55] tracking-[-0.02em] md:text-[22px]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-muted)",
                  maxWidth: "65ch",
                }}
              >
                I use a small type system and two or three colours, and I leave
                out decoration that doesn&apos;t help the user.
              </p>

              <Button
                render={<Link href="/about" />}
                nativeButton={false}
                variant="ghost"
                className="inline-flex items-center gap-2 px-0"
                style={{
                  height: 40,
                  fontSize: 18,
                  color: "var(--text-primary)",
                }}
              >
                Read more about me
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>

            {/* Right: image placeholder */}
            <figure className="m-0">
              <div
                className="aspect-video w-full rounded-2xl bg-cover bg-center md:aspect-4/5"
                style={{
                  backgroundImage: "url('/projects/raia/cover.png')",
                  backgroundColor: "var(--bg-surface)",
                }}
                role="img"
                aria-label="Responsible AI Africa homepage"
              />
              <figcaption
                className="mt-3 text-sm"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "var(--text-muted)",
                }}
              >
                Responsible AI Africa, one of my recent builds.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
