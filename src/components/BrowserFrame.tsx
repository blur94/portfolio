/**
 * BrowserFrame: contained browser chrome mockup for the hero section.
 * Shows a minimal browser bar (traffic-light dots + URL) above a screenshot.
 */

import Image from "next/image";

interface BrowserFrameProps {
  /** Image src shown inside the browser body */
  src: string;
  /** Alt text / aria-label for the inner image region */
  imageAlt: string;
  /** URL string shown in the fake address bar */
  url: string;
}

export function BrowserFrame({ src, imageAlt, url }: BrowserFrameProps) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl border"
      style={{
        aspectRatio: "4 / 3",
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-faint)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      }}
    >
      {/* Browser chrome bar */}
      <div
        className="flex items-center gap-2 border-b px-[18px] py-3.5"
        style={{
          backgroundColor: "var(--bg-nav)",
          borderColor: "var(--border-faint)",
        }}
      >
        {/* Traffic-light dots */}
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block size-[11px] rounded-full"
            style={{ backgroundColor: "var(--bg-icon)" }}
            aria-hidden="true"
          />
          <span
            className="inline-block size-[11px] rounded-full"
            style={{ backgroundColor: "var(--bg-icon)" }}
            aria-hidden="true"
          />
          <span
            className="inline-block size-[11px] rounded-full"
            style={{ backgroundColor: "var(--bg-icon)" }}
            aria-hidden="true"
          />
        </div>

        {/* URL bar */}
        <div
          className="mx-3 flex flex-1 items-center justify-center rounded-xl border px-3.5 py-1.5"
          style={{
            backgroundColor: "var(--bg-page)",
            borderColor: "var(--border-faint)",
          }}
        >
          <span
            className="text-xs tracking-tight"
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              color: "var(--text-muted)",
            }}
          >
            {url}
          </span>
        </div>

        {/* Spacer matching dots width */}
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      {/* Browser body: screenshot */}
      <div className="relative h-[calc(100%-44px)] w-full">
        <Image
          src={src}
          alt={imageAlt}
          fill
          priority
          quality={90}
          sizes="(min-width: 768px) 45vw, calc(100vw - 48px)"
          className="object-cover object-left-top"
        />
      </div>
    </div>
  );
}
