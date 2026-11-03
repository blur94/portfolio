import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { sharedOpenGraph } from "@/lib/site";
import { works } from "@/lib/works";

export const metadata = {
  title: "Works",
  description:
    "Selected projects by Gilead Odo across fintech, regtech, civic-tech, and internal tools.",
  alternates: { canonical: "/works" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Works | Gilead Odo",
    description:
      "Selected projects by Gilead Odo across fintech, regtech, civic-tech, and internal tools.",
    url: "/works",
  },
};

export default function Works() {
  const rows = Array.from({ length: Math.ceil(works.length / 3) }, (_, index) =>
    works.slice(index * 3, index * 3 + 3)
  );

  return (
    <>
      <section className="mx-auto px-6 pb-24 pt-20 md:px-12">
        <div style={{ maxWidth: "var(--container-max)" }}>
          <p
            className="mb-6 text-[32px] font-semibold tracking-[-0.06em]"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-muted)" }}
          >
            Work
          </p>
          <h1
            className="mb-8 max-w-[16ch] leading-[0.98] tracking-[-0.06em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(56px, 7vw, 96px)",
              color: "var(--text-primary)",
            }}
          >
            <span style={{ color: "var(--text-display-dim)" }}>A few of the things </span>
            I&rsquo;ve built.
          </h1>
          <p
            className="text-[22px] leading-[1.4] tracking-[-0.03em]"
            style={{ color: "var(--text-muted)" }}
          >
            Selected, not exhaustive. Each entry links to a short case study.
          </p>
        </div>
      </section>

      <section className="mx-auto px-6 pb-[120px] md:px-12">
        <h2 className="sr-only">Projects</h2>
        <div className="flex flex-col" style={{ maxWidth: "var(--container-max)" }}>
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid items-start gap-8 md:grid-cols-3"
              style={{ marginTop: rowIndex === 0 ? 0 : 64 }}
            >
              {row.map((work, index) => (
                <div
                  key={work.slug}
                  className={(rowIndex + index) % 2 === 1 ? "md:mt-16" : undefined}
                >
                  <ProjectCard work={work} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border-faint)" }}>
        <div
          className="mx-auto flex flex-wrap items-center justify-between gap-8 px-6 py-24 md:px-12"
          style={{ maxWidth: "var(--container-max)" }}
        >
          <h2
            className="max-w-[20ch] leading-none tracking-[-0.06em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 4.5vw, 56px)",
              color: "var(--text-primary)",
            }}
          >
            <span style={{ color: "var(--text-display-dim)" }}>Want to talk about </span>
            yours?
          </h2>
          <Button
            render={<Link href="/contact#contact-form" />}
            nativeButton={false}
            className="inline-flex h-12 items-center gap-2 px-7 text-base"
          >
            Send a message
            <ArrowUpRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </section>
    </>
  );
}
