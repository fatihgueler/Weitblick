import type { Metadata } from "next";
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
            <div className="rounded-2xl border border-navy-900/10 p-6 shadow-soft blueprint sm:p-8">
              <h2 className="label">{aboutPage.focusTitle}</h2>
              <ul className="mt-5 grid gap-3">
                {aboutPage.focus.map((f, i) => (
                  <li key={f} className="flex items-baseline gap-3.5 text-[15px] font-medium text-navy-900">
                    <span className="index-tag shrink-0 text-teal-700/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Warum Weitblick – Horizont-Band (das Motiv „der lange Blick") */}
      <section className="section blueprint border-y border-navy-900/8">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mx-auto w-fit">Der lange Blick</span>
            <h2 className="mt-4 heading-2">{aboutPage.whyTitle}</h2>
            <div className="mt-6 flex flex-col gap-4">
              {aboutPage.why.map((p) => (
                <p key={p} className="lead">{p}</p>
              ))}
            </div>
            <div className="horizon-rule mx-auto mt-10 max-w-xs" />
          </Reveal>
        </div>
      </section>

      <FinalCta source="ueber-mich-final" />
    </>
  );
}
