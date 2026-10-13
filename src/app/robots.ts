import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// AI-zoekmachines en -assistenten krijgen expliciet toegang, zodat Drive More in hun
// antwoorden kan verschijnen. /api/ bevat alleen formulier-endpoints en hoeft niet gecrawld.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
