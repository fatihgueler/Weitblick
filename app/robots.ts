import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/** KI-Antwortsysteme (GEO), denen das Crawlen der Inhaltsseiten explizit erlaubt wird. */
const AI_CRAWLERS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().toString().replace(/\/$/, "");
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
