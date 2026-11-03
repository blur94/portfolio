import type { Metadata } from "next";

/** Canonical origin. www redirects to the apex domain. */
export const siteUrl = "https://gileadodo.com";

/** Next.js replaces a parent's openGraph object, so each page spreads these. */
export const sharedOpenGraph = {
  siteName: "Gilead Odo",
  locale: "en_US",
  type: "website",
  images: [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Gilead Odo, Senior Frontend Engineer",
    },
  ],
} satisfies Metadata["openGraph"];
