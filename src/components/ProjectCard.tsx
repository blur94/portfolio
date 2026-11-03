import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Work } from "@/lib/works";

interface ProjectCardProps {
  work: Work;
}

/**
 * ProjectCard — card with 16:9 media thumbnail, title, descriptor, role + stack, category + status chips.
 * Tailwind translation of .card from the Plinth handoff CSS.
 */
export function ProjectCard({ work }: ProjectCardProps) {
  return (
    <Link
      href={`/works/${work.slug}`}
      aria-label={`Read the ${work.title} case study`}
      className="group flex flex-col gap-[18px] rounded-2xl border p-5 text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-faint)",
      }}
    >
      {/* 16:9 media thumbnail */}
      <div
        className="aspect-video w-full rounded-2xl bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${work.coverImage}')`,
          backgroundColor: "var(--bg-icon)",
          boxShadow: "inset 0 0 0 1px var(--border-faint)",
        }}
        role="img"
        aria-label={`${work.title} screenshot`}
      />

      {/* Card body */}
      <div className="flex flex-col gap-3.5 px-1.5 pb-2">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="leading-[1.15] tracking-[-0.06em]"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 28,
              fontWeight: 600,
              color: "var(--text-primary)",
              maxWidth: "18ch",
            }}
          >
            {work.title}
          </h3>
          <span
            className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-full transition-colors group-hover:bg-[var(--accent-primary)] group-hover:text-[var(--text-on-accent)]"
            style={{
              backgroundColor: "var(--bg-icon)",
              color: "var(--text-primary)",
            }}
            aria-hidden="true"
          >
            <ArrowUpRight size={18} />
          </span>
        </div>

        {/* Descriptor */}
        <p
          className="leading-[1.4] tracking-[-0.04em]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 16,
            fontWeight: 500,
            color: "var(--text-muted)",
            maxWidth: "36ch",
          }}
        >
          {work.descriptor}
        </p>

        {/* Role + stack */}
        <div
          className="flex flex-col gap-1 text-sm leading-[1.4] tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 500,
            color: "var(--text-tertiary)",
          }}
        >
          <p>
            {work.engagement
              ? `${work.role} · ${work.engagement}`
              : work.role}
          </p>
          <p>{work.tags.slice(0, 3).join(", ")}</p>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category chip — outline */}
          <span
            className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[-0.06em]"
            style={{
              fontFamily: "var(--font-heading)",
              borderColor: "var(--border-faint)",
              color: "var(--text-muted)",
            }}
          >
            {work.category}
          </span>

          {/* Live chip — accent */}
          {work.isLive && (
            <span
              className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[-0.06em]"
              style={{
                fontFamily: "var(--font-heading)",
                backgroundColor: "var(--accent-primary)",
                color: "var(--text-on-accent)",
              }}
            >
              Live
            </span>
          )}

          {/* Private chip — outline */}
          {!work.isLive && (
            <span
              className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[-0.06em]"
              style={{
                fontFamily: "var(--font-heading)",
                borderColor: "var(--border-faint)",
                color: "var(--text-muted)",
              }}
            >
              Private build
            </span>
          )}

          {/* Year */}
          <span
            className="ml-auto rounded-full border px-2.5 py-1 text-xs uppercase tracking-[-0.06em]"
            style={{
              fontFamily: "var(--font-heading)",
              borderColor: "var(--border-faint)",
              color: "var(--text-muted)",
            }}
          >
            {work.year}
          </span>
        </div>
      </div>
    </Link>
  );
}
