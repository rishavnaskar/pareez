import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/book", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/locations", priority: 0.8 },
    { path: "/locations/garfa", priority: 0.8 },
    { path: "/locations/jadavpur", priority: 0.8 },
    { path: "/gallery", priority: 0.7 },
    { path: "/about", priority: 0.6 },
  ];

  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: r.priority,
  }));
}
