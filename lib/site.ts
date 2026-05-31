/**
 * Basis-URL der Seite – für absolute Links, OG-/Twitter-Bilder (metadataBase)
 * und das Teilen des Förderchecks (z. B. aus dem Linktree heraus).
 *
 * Auflösungsreihenfolge:
 *  1. SITE_URL                     – explizit gesetzt (empfohlen in Produktion)
 *  2. VERCEL_PROJECT_PRODUCTION_URL – von Vercel automatisch bereitgestellt
 *  3. http://localhost:3000        – lokale Entwicklung
 */
export function getSiteUrl(): URL {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return new URL(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);

  return new URL("http://localhost:3000");
}
