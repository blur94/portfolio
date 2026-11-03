"use client";

import { useEffect, useRef } from "react";

interface CountStatProps {
  /** Display number, can include prefix/suffix like "6+", "-40%", "₦2.4M", "<60ms" */
  number: string;
  label: string;
}

/**
 * CountStat animates a numeric value from 0 to its target when it enters the viewport.
 * Handles prefix/suffix strings (e.g. "6+", "-40%", "₦2.4M", "<60ms").
 * The server renders the final value, so crawlers and no-JS visitors never see 0;
 * the client resets it to 0 only when it is going to animate.
 * Date-like values ("02/2024") and prefers-reduced-motion show the final value as is.
 */
export function CountStat({ number, label }: CountStatProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    // Parse: optional prefix, numeric part, optional suffix
    const match = number.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    const isDateLike = /^\d+\/\d+$/.test(number);
    if (
      !el ||
      !match ||
      isDateLike ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const [, prefix, digits, suffix] = match;
    const n = parseFloat(digits);
    const format = (value: number) =>
      `${prefix}${Number.isInteger(n) ? Math.round(value) : value.toFixed(1)}${suffix}`;

    el.textContent = format(0);

    let raf: number;
    const animate = () => {
      const duration = 800;
      const start = performance.now();

      const tick = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        // Cubic ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(n * eased);
        if (progress < 1) raf = requestAnimationFrame(tick);
        else el.textContent = number;
      };

      raf = requestAnimationFrame(tick);
    };

    // Intersection observer to trigger animation on viewport entry
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          obs.disconnect();
          animate();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = number;
    };
  }, [number]);

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {/* role="img" keeps the final value as the accessible name while the text animates */}
      <div
        ref={ref}
        role="img"
        aria-label={number}
        className="leading-none tracking-tight"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(72px, 9vw, 128px)",
          fontWeight: 500,
          letterSpacing: "-0.06em",
          color: "var(--text-primary)",
        }}
      >
        {number}
      </div>
      <p
        className="text-sm leading-snug"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          maxWidth: "22ch",
        }}
      >
        {label}
      </p>
    </div>
  );
}
