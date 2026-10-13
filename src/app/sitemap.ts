import type { MetadataRoute } from "next";
import { CITIES } from "@/lib/config/cities";
import { CONTENT_LAST_UPDATED, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/spoedcursus", priority: 0.9 },
    { path: "/rijlespakketten", priority: 0.9 },
    { path: "/diensten", priority: 0.8 },
    { path: "/over-ons", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacybeleid", priority: 0.2 },
    { path: "/cookiebeleid", priority: 0.2 },
    { path: "/algemene-voorwaarden", priority: 0.2 },
  ];

  const cityRoutes = CITIES.map((city) => ({
    path: `/rijschool-${city.slug}`,
    priority: 0.8,
  }));

  return [...staticRoutes, ...cityRoutes].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: CONTENT_LAST_UPDATED,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
