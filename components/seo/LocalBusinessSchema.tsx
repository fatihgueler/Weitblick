import { services, site, contact } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

/** Drei zentrale Leistungen für den strukturierten Angebotskatalog. */
const OFFER_SLUGS = ["sanierungsfahrplan", "foerdermittelberatung", "energieausweis"] as const;

type Offer = {
  "@type": "Offer";
  itemOffered: {
    "@type": "Service";
    name: string;
    description: string;
  };
};

type LocalBusinessJsonLd = {
  "@context": "https://schema.org";
  "@type": "ProfessionalService";
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    postalCode: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  areaServed: { "@type": "Country"; name: string };
  hasOfferCatalog: {
    "@type": "OfferCatalog";
    name: string;
    itemListElement: Offer[];
  };
  knowsAbout: string[];
};

/**
 * ProfessionalService-JSON-LD für Rich Results & GEO (KI-Suchsysteme).
 *
 * Adresse/Telefon/E-Mail stammen aus lib/content.ts (bereits echte Daten,
 * kein Platzhalter nötig). `geo` wurde per Geocoding aus der echten Adresse
 * abgeleitet, nicht erfunden. `openingHoursSpecification` fehlt bewusst –
 * dazu liegen keine echten Daten im Projekt vor; ein Platzhalter-String wäre
 * an dieser Stelle ungültiges Schema.org-Markup (opens/closes erwarten ein
 * Zeitformat). TODO [ÖFFNUNGSZEITEN_EINFÜGEN]: Feld ergänzen, sobald die
 * echten Geschäftszeiten feststehen.
 */
export function LocalBusinessSchema() {
  const offers: Offer[] = OFFER_SLUGS.map((slug) => {
    const service = services.find((s) => s.slug === slug);
    if (!service) throw new Error(`LocalBusinessSchema: Service "${slug}" nicht gefunden.`);
    return {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.short,
      },
    };
  });

  const jsonLd: LocalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: getSiteUrl().toString(),
    telephone: "+4917680020590",
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hermann-Weinhauser-Str. 65",
      postalCode: "81673",
      addressLocality: "München",
      addressRegion: "Bayern",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.1335099,
      longitude: 11.6304865,
    },
    // Standort München, Leistungsgebiet aber deutschlandweit.
    areaServed: { "@type": "Country", name: "Deutschland" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Energieberatungsleistungen",
      itemListElement: offers,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
