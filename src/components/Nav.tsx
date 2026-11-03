"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, ArrowUpRight, Menu } from "lucide-react";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Work", href: "/works" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    root.classList.toggle("dark", next === "dark");
    root.classList.toggle("light", next === "light");
    localStorage.setItem("theme", next);
  };

  // Determine active link: exact match for home, prefix match for sections
  // (so "/works" is active on "/works" and "/works/[slug]"). The trailing
  // slash in startsWith prevents "/works" matching e.g. "/works-archive".
  const isActive = (href: string | null): boolean => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--bg-nav, var(--background))",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="mx-auto flex h-18 items-center justify-between px-6 md:px-12"
        style={{
          maxWidth: "var(--container-max, 1440px)",
        }}
      >
        {/* Left: wordmark */}
        <div className="flex flex-1 items-center">
          <Logo asLink iconClassName="h-10 w-10" />
        </div>

        {/* Center: nav links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <div key={link.label} className="relative">
                <Link
                  href={link.href}
                  className="flex min-h-11 items-center px-4 text-xl transition-colors"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: active
                      ? "var(--text-primary, var(--foreground))"
                      : "var(--text-muted, var(--muted-foreground))",
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
                {/* Active 2px lime underline below nav bar */}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 h-0.5"
                    style={{
                      bottom: -16,
                      backgroundColor: "var(--accent-primary, var(--primary))",
                    }}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: theme toggle + CTA */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <VersionSwitcher />

          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="theme-toggle flex size-9 items-center justify-center rounded-full border transition-colors hover:opacity-80"
            style={{
              backgroundColor: "transparent",
              borderColor: "var(--border)",
              color: "var(--text-muted, var(--muted-foreground))",
            }}
          >
            <Sun className="theme-toggle__sun" size={16} aria-hidden="true" />
            <Moon className="theme-toggle__moon" size={16} aria-hidden="true" />
          </button>

          <Button
            render={<Link href="/works" />}
            nativeButton={false}
            className="hidden items-center gap-1.5 md:inline-flex"
            style={{ height: 40, paddingInline: 18, fontSize: 14 }}
          >
            View selected work
            <ArrowUpRight size={14} aria-hidden="true" />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex border md:hidden"
                  aria-label="Open navigation menu"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary, var(--foreground))",
                  }}
                />
              }
            >
              <Menu size={18} aria-hidden="true" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(88vw,360px)] border-l px-6 pb-6 pt-5"
              style={{
                backgroundColor: "var(--bg-nav, var(--background))",
                borderColor: "var(--border)",
              }}
            >
              <SheetHeader className="px-0 pb-6 pt-0">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation links and display controls.
                </SheetDescription>
                <Logo />
              </SheetHeader>

              <nav className="flex flex-col gap-2" aria-label="Mobile primary">
                {navLinks.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-12 items-center justify-between rounded-2xl border px-4 text-lg transition-colors"
                      style={{
                        backgroundColor: active
                          ? "var(--accent-primary, var(--primary))"
                          : "transparent",
                        borderColor: active
                          ? "var(--accent-primary, var(--primary))"
                          : "var(--border)",
                        color: active
                          ? "var(--text-on-accent, var(--primary-foreground))"
                          : "var(--text-primary, var(--foreground))",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 500,
                      }}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  );
                })}
              </nav>

              <div
                className="mt-6 flex items-center justify-between rounded-2xl border px-4 py-3"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary, var(--foreground))",
                }}
              >
                <span
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                  }}
                >
                  Theme
                </span>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle color theme"
                  className="theme-toggle flex size-9 items-center justify-center rounded-full border transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "var(--border)",
                    color: "var(--text-muted, var(--muted-foreground))",
                  }}
                >
                  <Sun
                    className="theme-toggle__sun"
                    size={16}
                    aria-hidden="true"
                  />
                  <Moon
                    className="theme-toggle__moon"
                    size={16}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <Button
                render={
                  <Link href="/works" onClick={() => setMobileOpen(false)} />
                }
                nativeButton={false}
                className="mt-4 w-full items-center gap-1.5"
                style={{ height: 48, fontSize: 14 }}
              >
                View selected work
                <ArrowUpRight size={14} aria-hidden="true" />
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
