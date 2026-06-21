import type { Metadata } from "next";
import { faqAll, faqPage } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Häufige Fragen",
  description: faqPage.text,
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqAll.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero eyebrow="FAQ" title={faqPage.title} text={faqPage.text} />

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqAll} idPrefix="faq-page" />
          </div>
        </div>
      </section>

      <FinalCta
        title={faqPage.closing}
        text="Starten Sie den Fördercheck oder senden Sie direkt eine Anfrage."
        source="faq-final"
      />
    </>
  );
}
