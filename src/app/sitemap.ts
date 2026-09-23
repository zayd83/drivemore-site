import type { MetadataRoute } from "next";
import { CITIES } from "@/lib/config/cities";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rijschooldrivemore.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/diensten", priority: 0.8 },
    { path: "/rijlespakketten", priority: 0.8 },
    { path: "/spoedcursus", priority: 0.8 },
    { path: "/over-ons", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];

  const cityRoutes = CITIES.map((city) => ({
    path: `/rijschool-${city.slug}`,
    priority: 0.7,
  }));

  return [...staticRoutes, ...cityRoutes].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
