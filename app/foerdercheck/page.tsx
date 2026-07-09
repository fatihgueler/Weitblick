import type { Metadata } from "next";
import { Funnel } from "@/components/foerdercheck/Funnel";
import { FaqSchema } from "@/components/seo/FaqSchema";
import { FaqAccordion } from "@/components/FaqAccordion";
import { foerdercheckFaq, site } from "@/lib/content";

const title = "Kostenloser BAFA Fördercheck & Sanierungsfahrplan";
const description =
  "Kostenloser BAFA Fördercheck: Prüfen Sie in wenigen Schritten Fördermöglichkeiten und den individuellen Sanierungsfahrplan (iSFP) für Ihr Wohngebäude. Unverbindlich und ohne versteckte Kosten.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/foerdercheck" },
  openGraph: {
    title,
    description,
    url: "/foerdercheck",
    siteName: site.name,
    locale: "de_DE",
    type: "website",
  },
};

export default function FoerdercheckPage() {
  return (
    <>
      <FaqSchema items={foerdercheckFaq} />
      <section className="soft-blue">
        <div className="container py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <Funnel variant="page" />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Häufige Fragen zur BAFA-Förderung
            </h2>
            <div className="mt-8">
              <FaqAccordion
                items={foerdercheckFaq.map((item) => ({ q: item.question, a: item.answer }))}
                idPrefix="foerdercheck-faq"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
