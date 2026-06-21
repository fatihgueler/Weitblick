import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { kontaktPage, contact, ctaLabels } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { ContactLink } from "@/components/ContactLink";
import { FoerdercheckButton } from "@/components/FoerdercheckButton";

export const metadata: Metadata = {
  title: "Kontakt",
  description: kontaktPage.text,
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <PageHero eyebrow="Kontakt" title={kontaktPage.title} text={kontaktPage.text} />

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          {/* Kontaktinfos */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">
              Direkt erreichen
            </h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-center gap-3 text-[15px] text-navy-900">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <Mail className="h-5 w-5" strokeWidth={2} />
                </span>
                <ContactLink type="email" value={contact.email} className="font-medium hover:text-teal-700" />
              </li>
              <li className="flex items-center gap-3 text-[15px] text-navy-900">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <Phone className="h-5 w-5" strokeWidth={2} />
                </span>
                <ContactLink type="phone" value={contact.phone} className="font-medium hover:text-teal-700" />
              </li>
              <li className="flex items-center gap-3 text-[15px] text-navy-900">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <MapPin className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="font-medium opacity-80">{contact.location}</span>
              </li>
            </ul>

            <div className="mt-8 rounded-3xl border border-navy-900/5 bg-ink-50/70 p-6">
              <p className="text-[15px] text-ink-600">
                Sie wissen noch nicht genau, welche Leistung Sie benötigen? Starten Sie am besten den Fördercheck.
              </p>
              <FoerdercheckButton source="kontakt-info" className="mt-4">
                {ctaLabels.foerdercheck}
              </FoerdercheckButton>
            </div>
          </div>

          {/* Formular */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
