"use client";

import { Menu } from "@base-ui/react/menu";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";

import { versions } from "@/lib/versions";
import { cn } from "@/lib/utils";

/**
 * Navbar dropdown that lets visitors open earlier versions of the portfolio
 * (each served from its own `vN.gileadodo.com` subdomain).
 */
export function VersionSwitcher({
  className,
  side = "bottom",
}: {
  className?: string;
  side?: "top" | "bottom";
}) {
  const current = versions.find((v) => v.current) ?? versions[0];

  if (versions.length < 2) return null;

  return (
    <Menu.Root>
      <Menu.Trigger
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3.5 font-heading text-sm font-medium tracking-[-0.02em] text-(--text-muted) transition-colors hover:text-(--text-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent-primary) data-popup-open:text-(--text-primary)",
          className,
        )}
        aria-label={`Portfolio version: ${current.label}. Show previous versions`}
      >
        {current.label}
        <ChevronDown
          aria-hidden="true"
          className="size-3.5 transition-transform in-data-popup-open:rotate-180"
        />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner side={side} align="end" sideOffset={8} className="z-60">
          <Menu.Popup className="z-50 min-w-56 origin-(--transform-origin) rounded-xl border border-(--border-faint) bg-(--bg-nav) p-1.5 shadow-lg outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <p className="px-3 pt-2 pb-1.5 font-heading text-xs font-medium tracking-[-0.02em] text-(--text-muted) uppercase">
              Portfolio versions
            </p>
            {versions.map((version) => (
              <Menu.LinkItem
                key={version.label}
                href={version.href}
                aria-current={version.current ? "page" : undefined}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-(--text-secondary) outline-none select-none data-highlighted:bg-(--bg-surface) data-highlighted:text-(--text-primary)"
              >
                <span className="w-6 font-heading text-sm font-semibold tracking-[-0.02em] text-(--text-primary)">
                  {version.label}
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="font-body text-sm">{version.name}</span>
                  <span className="font-body text-xs text-(--text-muted)">
                    {version.period}
                  </span>
                </span>
                {version.current ? (
                  <Check
                    aria-label="Current version"
                    className="size-4 text-(--text-primary)"
                  />
                ) : (
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                )}
              </Menu.LinkItem>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
