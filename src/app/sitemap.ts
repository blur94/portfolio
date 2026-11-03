import type { MetadataRoute } from "next";

import { works } from "@/lib/works";

const baseUrl = "https://www.gileadodo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/works`, priority: 0.9 },
    ...works.map((work) => ({
      url: `${baseUrl}/works/${work.slug}`,
      priority: 0.8,
    })),
    { url: `${baseUrl}/about`, priority: 0.7 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
  ];
}
