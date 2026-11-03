/**
 * Archived portfolio versions, newest first.
 *
 * Each past version lives on its own `release/vN` branch and is deployed to
 * `vN.gileadodo.com`. To archive the current site before a redesign:
 *   1. push a `release/vN` branch at the last commit of that version
 *   2. point `vN.gileadodo.com` at it in Vercel
 *   3. add an entry here and move `current: true` to the new version
 */
export type PortfolioVersion = {
  /** Short label shown in the switcher, e.g. "v2". */
  label: string;
  /** One-line name for the version. */
  name: string;
  /** Period the version was live, for context. */
  period: string;
  /** Absolute URL the version is served from. */
  href: string;
  /** Marks the version this build *is*. Exactly one entry should be true. */
  current?: boolean;
};

export const versions: PortfolioVersion[] = [
  {
    label: "v2",
    name: "Plinth redesign",
    period: "2026 – present",
    href: "https://gileadodo.com",
    current: true,
  },
  {
    label: "v1",
    name: "Currently building",
    period: "2026",
    href: "https://v1.gileadodo.com",
  },
];
