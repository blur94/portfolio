/** Canonical origin. The apex domain redirects here. */
export const siteUrl = "https://www.gileadodo.com";

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
};
