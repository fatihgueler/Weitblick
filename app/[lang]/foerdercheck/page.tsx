import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { assertLocale, isLocale } from "@/i18n/config";
import { getFunnelContent } from "@/components/foerdercheck/content";
import { FoerderCheck } from "@/components/foerdercheck/FoerderCheck";
import { LandingSections } from "@/components/foerdercheck/LandingSections";
import { getSiteUrl } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#15803d",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { content } = getFunnelContent(lang);
  const title = `${content.intro.title} | ENOX`;
  return {
    metadataBase: getSiteUrl(),
    title,
    description: content.intro.subtitle,
    alternates: { canonical: `/${lang}/foerdercheck` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: content.intro.subtitle,
      type: "website",
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.intro.subtitle,
    },
  };
}

export default async function FoerderCheckPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang = assertLocale(raw);
  const { locale: funnelLocale, content } = getFunnelContent(lang);
  const { embed: embedParam } = await searchParams;
  const embed = embedParam === "1" || embedParam === "true";

  const bookingUrl = process.env.BOOKING_URL ?? "";
  const contactHref = `/${lang}/contact`;
  const privacyHref = `/${lang}/privacy`;

  // Die fixe Mobile-CTA der Hauptseite würde den Funnel überlagern -> hier aus.
  // Im Embed-Modus (z. B. Linktree-iFrame) zusätzlich Header & Footer ausblenden.
  const hideCss = embed
    ? `[data-chrome]{display:none!important}main{padding-bottom:0!important;min-height:100vh!important}body{background:#070d0a!important}`
    : `[data-chrome="mobilecta"]{display:none!important}main{padding-bottom:0!important}`;

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: hideCss }} />
      <section id="top" className="relative overflow-hidden bg-ink-950">
        <FoerderCheck
          funnelLocale={funnelLocale}
          content={content}
          bookingUrl={bookingUrl}
          contactHref={contactHref}
          privacyHref={privacyHref}
        />
      </section>

      {/* Inhaltliche Landingpage – im Embed-Modus (Linktree-iFrame) ausgeblendet,
          damit dort nur der Funnel erscheint. */}
      {!embed && <LandingSections funnelLocale={funnelLocale} lang={lang} />}
    </>
  );
}
