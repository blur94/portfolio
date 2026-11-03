import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";
import { works } from "@/lib/works";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/works`, priority: 0.9 },
    ...works.map((work) => ({
      url: `${siteUrl}/works/${work.slug}`,
      priority: 0.8,
    })),
    { url: `${siteUrl}/about`, priority: 0.7 },
    { url: `${siteUrl}/contact`, priority: 0.7 },
  ];
}
