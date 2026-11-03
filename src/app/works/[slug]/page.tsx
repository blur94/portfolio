import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { CountStat } from "@/components/CountStat";
import type { WorkArtifact } from "@/lib/works";
import { nextOf, works } from "@/lib/works";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

type KeyValue = {
  label: string;
  value: string;
  href?: string;
  gated?: boolean;
};

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((item) => item.slug === slug);

  if (!work) return {};

  const title = `${work.title} case study`;
  const description = `${work.descriptor} ${work.role} work by Gilead Odo.`;

  return {
    title,
    description,
    alternates: { canonical: `/works/${work.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/works/${work.slug}`,
      images: [{ url: work.coverImage, alt: `${work.title} project snapshot` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [work.coverImage],
    },
  };
}

export default async function WorkView({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = works.find((item) => item.slug === slug);

  if (!work) notFound();

  const nextWork = nextOf(work.slug);
  const mastheadItems: KeyValue[] = [
    { label: "Client", value: work.client },
    { label: "Year", value: work.year },
    { label: "Category", value: work.category },
    {
      label: "Status",
      value: work.isLive ? "Live project" : "Private build",
      href: work.liveUrl,
      gated: work.liveUrlGated,
    },
  ];
  const roleItems: KeyValue[] = [
    { label: "Role", value: work.role },
    { label: "Client", value: work.client },
    ...(work.engagement
      ? [{ label: "Engagement", value: work.engagement }]
      : []),
    { label: "Stack", value: work.tags.join(", ") },
  ];

  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 py-16 md:px-10 lg:px-20 lg:py-24">
        <Link
          href="/works"
          className="w-fit text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
        >
          Back to Work
        </Link>

        <div className="grid gap-8 lg:grid-cols-[2px_minmax(0,1fr)]">
          <div className="hidden bg-primary lg:block" aria-hidden="true" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-end">
            <div className="max-w-4xl">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {work.category}
              </p>
              <h1 className="font-display text-6xl italic leading-[0.95] tracking-[-0.06em] text-foreground md:text-7xl lg:text-8xl">
                {work.title}
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-[1.45] tracking-[-0.04em] text-muted-foreground md:text-2xl">
                {work.overview}
              </p>
              {work.liveUrl ? (
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    render={
                      <a
                        href={work.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      />
                    }
                    nativeButton={false}
                    className="inline-flex items-center gap-2"
                    style={{ height: 48, paddingInline: 24, fontSize: 15 }}
                  >
                    Visit project
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Button>
                  {work.liveUrlGated ? (
                    <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Login required
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>

            <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
              {mastheadItems.map((item) => (
                <KeyValueRow key={item.label} {...item} />
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-10 lg:px-20">
        <figure className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative aspect-4/3 w-full">
            <Image
              src={work.coverImage}
              alt={`${work.title} project snapshot`}
              fill
              priority
              quality={90}
              sizes="(min-width: 1440px) 1280px, calc(100vw - 48px)"
              className="object-contain"
            />
          </div>
          <figcaption className="border-t border-border px-5 py-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Snapshot / {work.title} / {work.year}
          </figcaption>
        </figure>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-16 px-6 pb-24 md:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.65fr)]">
        <div>
          <SectionHeading>Context</SectionHeading>
          <p className="mt-5 text-2xl leading-[1.45] tracking-[-0.04em] text-foreground md:text-3xl">
            {work.context}
          </p>
        </div>

        <div>
          <SectionHeading>Constraints</SectionHeading>
          <ol className="mt-6 flex flex-col border-t border-border">
            {work.constraints.map((constraint, index) => (
              <li
                key={constraint}
                className="grid grid-cols-[48px_1fr] gap-4 border-b border-border py-5 text-base leading-relaxed text-muted-foreground"
              >
                <span className="font-mono text-sm text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{constraint}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-6 pb-28 md:px-10">
        <SectionHeading>Role & Team</SectionHeading>
        <dl className="mt-6 border-t border-border">
          {roleItems.map((item) => (
            <div
              key={item.label}
              className="grid gap-3 border-b border-border py-6 md:grid-cols-[240px_1fr]"
            >
              <dt className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-xl leading-snug tracking-[-0.04em] text-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-24 px-6 pb-28 md:px-10 lg:px-20">
        <SectionHeading>Process</SectionHeading>
        {work.process.map((step, index) => (
          <article
            key={step.title}
            className="flex flex-col gap-10"
          >
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-sm text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-2xl font-semibold leading-tight tracking-[-0.06em] text-foreground md:text-[32px]">
                {step.title}
              </h3>
              <p className="mt-6 text-lg leading-[1.7] text-muted-foreground md:text-xl">
                {step.body}
              </p>
            </div>
            <ArtifactBlock title={step.title} artifact={step.artifact} />
          </article>
        ))}
      </section>

      <section className="bg-card py-24">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 text-center md:px-10 lg:px-20">
          <SectionHeading>Outcome</SectionHeading>
          <div className="grid w-full gap-10 md:grid-cols-3">
            {work.outcomes.map((outcome) => (
              <CountStat
                key={`${outcome.number}-${outcome.label}`}
                number={outcome.number}
                label={outcome.label}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[840px] px-6 py-28 md:px-10">
        <SectionHeading>Lessons</SectionHeading>
        <p className="mt-6 text-2xl leading-[1.5] tracking-[-0.04em] text-foreground md:text-4xl">
          {work.lessons}
        </p>
      </section>

      <nav
        aria-label="Case study navigation"
        className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 border-t border-border px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10 lg:px-20"
      >
        <Link
          href="/works"
          className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
        >
          Back to Work
        </Link>
        <Link
          href={`/works/${nextWork.slug}`}
          className="text-2xl font-semibold tracking-[-0.05em] text-foreground transition-colors hover:text-primary"
        >
          Next: {nextWork.title}
        </Link>
      </nav>
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-4xl font-semibold leading-tight tracking-[-0.06em] text-foreground md:text-5xl">
      {children}
    </h2>
  );
}

function KeyValueRow({ label, value, href, gated }: KeyValue) {
  return (
    <div className="bg-background p-5">
      <dt className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-3 text-lg font-medium tracking-[-0.04em] text-foreground">
        {href ? (
          <span className="flex flex-wrap items-center gap-2">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
            >
              {value}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {gated ? (
              <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Login required
              </span>
            ) : null}
          </span>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function ArtifactBlock({
  title,
  artifact,
}: {
  title: string;
  artifact: WorkArtifact;
}) {
  if (artifact.kind === "code") {
    return (
      <pre className="overflow-x-auto rounded-3xl border border-border bg-[#161820] p-6 text-sm leading-relaxed text-white shadow-2xl shadow-black/30">
        <code>{artifact.body}</code>
      </pre>
    );
  }

  return (
    <figure className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/30">
      <Image
        src={artifact.src}
        alt={title}
        width={artifact.width}
        height={artifact.height}
        quality={90}
        sizes="(min-width: 1200px) 1040px, calc(100vw - 48px)"
        className="h-auto max-h-[85vh] w-full object-contain"
      />
    </figure>
  );
}
