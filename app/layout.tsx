import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";
import { site } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyFoerdercheck } from "@/components/StickyFoerdercheck";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FoerdercheckProvider } from "@/components/foerdercheck/provider";

/* Body – Inter: bewusst gewählte, hochlesbare Lauftext-Schrift. */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

/* Display – Bricolage Grotesque: charaktervolle Grotesk mit Haltung,
   technisch und menschlich zugleich – passt zu „Weitblick". */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

/* Technische Annotationen – IBM Plex Mono: Eyebrows, Schritt-Indizes,
   Datenlabels (die „Vermesser-Notiz"-Stimme). */
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#121f3a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${site.name} – Energieberatung für Wohngebäude`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} – Energieberatung für Wohngebäude`,
    description: site.description,
    type: "website",
    locale: "de_DE",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: getSiteUrl().toString(),
  // Standort München, Leistungsgebiet aber deutschlandweit.
  areaServed: { "@type": "Country", name: "Deutschland" },
  telephone: "+4917680020590",
  email: "info@weitblick-energieberatung.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hermann-Weinhauser-Str. 65",
    postalCode: "81673",
    addressLocality: "München",
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
  knowsAbout: [
    "Energieberatung",
    "Energieberatung Wohngebäude",
    "Individueller Sanierungsfahrplan",
    "Fördermittelberatung",
    "BAFA Förderung",
    "KfW Förderung",
    "Heizlastberechnung",
    "Hydraulischer Abgleich",
    "Energieausweis",
    "Wärmepumpenberatung",
    "Lüftungskonzept",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-paper font-sans text-ink-800 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FoerdercheckProvider>
          <Header />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
          {/* Abstand, damit die mobile Sticky-Bar nichts verdeckt. */}
          <div className="h-20 lg:hidden" aria-hidden="true" />
          <StickyFoerdercheck />
          <WhatsAppButton />
        </FoerdercheckProvider>
      </body>
    </html>
  );
}
