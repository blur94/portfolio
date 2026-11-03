import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";
import { works } from "@/lib/works";

/**
 * Date of the last meaningful content change for each static page
 * (YYYY-MM-DD). Bump an entry when that page's content changes, not for
 * code or styling changes, so search engines keep trusting lastmod.
 */
const pageUpdatedAt = {
  home: "2026-11-03",
  works: "2026-11-03",
  about: "2026-11-03",
  contact: "2026-11-03",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: pageUpdatedAt.home, priority: 1 },
    {
      url: `${siteUrl}/works`,
      lastModified: pageUpdatedAt.works,
      priority: 0.9,
    },
    ...works.map((work) => ({
      url: `${siteUrl}/works/${work.slug}`,
      lastModified: work.updatedAt,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/about`,
      lastModified: pageUpdatedAt.about,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: pageUpdatedAt.contact,
      priority: 0.7,
    },
  ];
}
