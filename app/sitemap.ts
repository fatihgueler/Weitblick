import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().toString().replace(/\/$/, "");
  const paths = [
    "",
    "/foerdercheck",
    "/leistungen",
    "/ueber-mich",
    "/faq",
    "/kontakt",
    "/impressum",
    "/datenschutz",
  ];
  const now = new Date();
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/foerdercheck" ? 0.9 : 0.7,
  }));
}
