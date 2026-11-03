import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Tailwind size class applied to the mark SVG, e.g. "h-8 w-8". Defaults to responsive h-8/h-9. */
  iconClassName?: string;
  /** When true, wraps the logo in a Next.js Link pointing to "/". Default: false. */
  asLink?: boolean;
}

function Mark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      role="img"
      aria-label="Gilead Odo mark"
      className={cn("shrink-0", className)}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={40}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        <circle cx="322" cy="256" r="148" />
        <path d="M252 132c-29-19-68-27-106-17C69 135 22 211 42 288s96 124 173 104c61-16 103-69 103-136H177" />
      </g>
    </svg>
  );
}

function LogoContent({
  iconClassName,
  className,
}: Pick<LogoProps, "iconClassName" | "className">) {
  return (
    <span
      className={cn("flex items-center gap-1", className)}
      style={{ color: "var(--text-primary)" }}
    >
      <Mark className={cn("h-6 w-6", iconClassName)} />
      <span
        className="text-[32px] leading-none tracking-[-0.06em]"
        style={{ fontFamily: "var(--font-display)" }}
        aria-label="Gilead Odo"
      >
        Gilead Odo
      </span>
    </span>
  );
}

export function Logo({ className, iconClassName, asLink = false }: LogoProps) {
  if (asLink) {
    return (
      <Link
        href="/"
        aria-label="Gilead Odo, home"
        className="flex min-h-11 items-center"
      >
        <LogoContent className={className} iconClassName={iconClassName} />
      </Link>
    );
  }

  return <LogoContent className={className} iconClassName={iconClassName} />;
}
