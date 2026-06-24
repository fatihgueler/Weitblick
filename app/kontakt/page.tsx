import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
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

const nextSteps = [
  { title: "Anfrage senden", text: "Über das Formular oder den Fördercheck – ganz unverbindlich." },
  { title: "Erstgespräch", text: "Wir klären Ihr Gebäude, Ihr Ziel und die geplanten Maßnahmen." },
  { title: "Klare Einschätzung", text: "Sie erhalten eine Empfehlung zu den sinnvollen nächsten Schritten." },
];

export default function KontaktPage() {
  return (
    <>
      <PageHero eyebrow="Kontakt" title={kontaktPage.title} text={kontaktPage.text} />

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          {/* Kontaktinfos */}
          <div>
            <h2 className="label">Direkt erreichen</h2>
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

            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3.5 py-1.5 text-sm font-medium text-teal-800">
              <Clock className="h-4 w-4" strokeWidth={2} />
              Antwort in der Regel innerhalb von 24 Stunden
            </p>

            {/* So geht's weiter – kompakte Roadmap (Signatur-Echo). */}
            <div className="mt-10">
              <h2 className="label">So geht&rsquo;s weiter</h2>
              <ol className="mt-5 flex flex-col gap-1">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-teal-600/30 bg-white font-mono text-[13px] font-medium tabular-nums text-teal-700 shadow-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {i < nextSteps.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="my-1 h-full min-h-[24px] w-px flex-1 bg-gradient-to-b from-teal-600/40 to-navy-900/10"
                        />
                      )}
                    </div>
                    <div className="pb-5">
                      <h3 className="font-display text-[15px] font-bold text-navy-900">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 rounded-2xl border border-navy-900/10 p-6 blueprint">
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
