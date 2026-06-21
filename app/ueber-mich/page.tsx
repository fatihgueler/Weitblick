import type { Metadata } from "next";
import { Check } from "lucide-react";
import { aboutPage, ctaLabels } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { FoerdercheckButton } from "@/components/FoerdercheckButton";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Über mich",
  description: aboutPage.intro,
  alternates: { canonical: "/ueber-mich" },
};

export default function UeberMichPage() {
  return (
    <>
      <PageHero eyebrow="Über mich" title={aboutPage.title} text={aboutPage.intro}>
        <FoerdercheckButton source="ueber-mich-hero" size="lg">
          {ctaLabels.foerdercheck}
        </FoerdercheckButton>
      </PageHero>

      {/* Ansatz + Schwerpunkte */}
      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <p className="lead">{aboutPage.intro2}</p>
            <h2 className="mt-10 heading-2">{aboutPage.approachTitle}</h2>
            <div className="mt-4 flex flex-col gap-4">
              {aboutPage.approach.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-ink-600">{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-navy-900/5 bg-ink-50/70 p-6 shadow-soft sm:p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-600">
                {aboutPage.focusTitle}
              </h2>
              <ul className="mt-5 grid gap-3">
                {aboutPage.focus.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[15px] font-medium text-navy-900">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600/10 text-teal-700">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Warum Weitblick */}
      <section className="section soft-blue">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2">{aboutPage.whyTitle}</h2>
            <div className="mt-5 flex flex-col gap-4">
              {aboutPage.why.map((p) => (
                <p key={p} className="lead">{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta source="ueber-mich-final" />
    </>
  );
}
