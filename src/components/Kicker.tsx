import { cn } from "@/lib/utils";

interface KickerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Kicker: small all-caps label with a leading rule, used above section headings.
 * Tailwind translation of .kicker from the Plinth handoff CSS.
 */
export function Kicker({ children, className }: KickerProps) {
  return (
    <p
      className={cn(
        "mb-[18px] flex items-center gap-[10px] text-sm font-semibold uppercase tracking-[0.08em]",
        "before:inline-block before:h-px before:w-[18px] before:bg-current before:content-['']",
        className
      )}
      style={{
        fontFamily: "var(--font-heading)",
        color: "var(--text-muted)",
      }}
    >
      {children}
    </p>
  );
}
