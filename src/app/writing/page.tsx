import { Metadata } from "next";
import Link from "next/link";
import { PenLine, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Engineering notes from Gilead Odo on frontend architecture and building with React and Next.js. Coming soon.",
  robots: { index: false, follow: true },
};

export default function WritingPage() {
  return (
    <section
      data-fit-viewport
      className="mx-auto flex flex-1 flex-col items-center justify-center px-6 py-16 text-center md:px-12 md:py-0"
      style={{ maxWidth: "var(--container-max)" }}
    >
      {/* Subtle icon mark */}
      <div
        className="mb-8 flex size-16 items-center justify-center rounded-full border"
        style={{
          backgroundColor: "var(--bg-icon)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
      >
        <PenLine size={26} aria-hidden="true" />
      </div>

      <p
        className="mb-4.5 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.08em] before:inline-block before:h-px before:w-4.5 before:bg-current before:content-[''] after:inline-block after:h-px after:w-4.5 after:bg-current after:content-['']"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--text-muted)",
        }}
      >
        Writing
      </p>

      <h1
        className="mb-6 leading-[0.98] tracking-[-0.06em]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(56px, 7vw, 96px)",
          color: "var(--text-primary)",
        }}
      >
        <span style={{ color: "var(--text-display-dim)" }}>Coming </span>
        Soon.
      </h1>

      <p
        className="mb-10 max-w-[52ch] text-[22px] leading-[1.4] tracking-[-0.03em]"
        style={{ color: "var(--text-muted)" }}
      >
        I&apos;m building a place to share engineering notes on frontend
        architecture, React, and Next.js. It isn&apos;t ready yet, so explore my
        projects in the meantime.
      </p>

      <Link
        href="/works"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-medium transition-colors hover:bg-(--accent-primary) hover:text-(--text-on-accent)"
        style={{
          backgroundColor: "var(--text-primary)",
          color: "var(--bg-page)",
          fontFamily: "var(--font-heading)",
        }}
      >
        Explore my work
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
