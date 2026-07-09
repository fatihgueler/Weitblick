import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  hero,
  trustItems,
  nutzen,
  foerdercheckTeaser,
  services,
  servicesIntro,
  ablauf,
  aboutShort,
  faqHome,
  ctaLabels,
  routes,
  site,
} from "@/lib/content";
import { serviceIcons } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { FoerdercheckButton } from "@/components/FoerdercheckButton";
import { FoerdercheckBox } from "@/components/FoerdercheckBox";
import { HorizonScene } from "@/components/HorizonScene";
import { ServiceCard } from "@/components/ServiceCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FinalCta } from "@/components/FinalCta";

/*
 * Titel wird hier vollständig ausgeschrieben (statt nur "Kunden-Titel"), weil
 * Next.js das title.template aus dem Root-Layout nicht auf die Seite anwendet,
 * die exakt dieselbe Route ("/") wie das Layout selbst belegt – bei allen
 * Unterseiten (z. B. /kontakt) greift das Template dagegen normal.
 */
const title = "Weitblick Energieberatung – BAFA Fördercheck & Sanierungsfahrplan";
const description =
  "Kostenloser BAFA Fördercheck, individueller Sanierungsfahrplan (iSFP) und Fördermittelberatung für Ihr Wohngebäude – unabhängige Energieberatung aus München, deutschlandweit.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: site.name,
    locale: "de_DE",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* 2 · Hero – Signatur „Der lange Blick" */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 hero-glow" />
        {/* Signatur-Horizont als Hintergrund – Skyline am unteren Rand. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 opacity-[0.55] [mask-image:linear-gradient(to_top,black,transparent_85%)]"
        >
          <HorizonScene className="w-full" />
        </div>

        <div className="container grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div className="animate-fade-up">
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1 className="mt-6 heading-1">{hero.title}</h1>
            <p className="mt-6 lead max-w-xl">{hero.subtitle}</p>

            <ul className="mt-8 flex flex-col gap-3">
              {hero.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[15px] font-medium text-navy-900">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <FoerdercheckButton source="hero" size="lg" className="w-full sm:w-auto">
                {ctaLabels.foerdercheck}
              </FoerdercheckButton>
              <Link href={routes.kontakt} className="btn-secondary w-full px-7 py-4 text-base sm:w-auto">
                {ctaLabels.consultation}
              </Link>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:120ms]">
            <FoerdercheckBox source="hero-box" />
          </div>
        </div>
      </section>

      {/* 3 · Vertrauensleiste – als Vermesser-Datenleiste (Mono-Labels). */}
      <section className="border-y border-navy-900/8 bg-white">
        <div className="container py-6 sm:py-7">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-4">
            {trustItems.map((item, i) => (
              <li key={item} className="flex items-start gap-3">
                <span className="index-tag mt-0.5 shrink-0 text-teal-700/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium leading-snug text-navy-900">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · Nutzenbereich */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2">{nutzen.title}</h2>
            <p className="mt-4 lead">{nutzen.text}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {nutzen.items.map((item, i) => (
              <Reveal key={item} delay={(i % 4) * 70}>
                <div className="card card-hover h-full">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Check className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  <p className="text-[15px] font-semibold leading-snug text-navy-900">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <FoerdercheckButton source="nutzen" size="lg">
              {ctaLabels.checkFunding}
            </FoerdercheckButton>
          </div>
        </div>
      </section>

      {/* 5 · Fördercheck-Bereich */}
      <section className="section soft-blue">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-4xl border border-navy-900/5 bg-white p-6 shadow-soft sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
              <Reveal>
                <span className="eyebrow">{ctaLabels.foerdercheck}</span>
                <h2 className="mt-4 heading-2">{foerdercheckTeaser.title}</h2>
                <p className="mt-4 lead">{foerdercheckTeaser.text}</p>
                <div className="mt-7">
                  <FoerdercheckButton source="foerdercheck-section" size="lg">
                    {ctaLabels.foerdercheck}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </FoerdercheckButton>
                </div>
                <p className="mt-4 max-w-md text-sm text-ink-500">{foerdercheckTeaser.hint}</p>
              </Reveal>

              <Reveal delay={100}>
                <ol className="flex flex-col gap-1">
                  {foerdercheckTeaser.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal-600/30 bg-white font-mono text-sm font-medium tabular-nums text-teal-700 shadow-soft">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {i < foerdercheckTeaser.steps.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="my-1 h-full min-h-[28px] w-px flex-1 bg-gradient-to-b from-teal-600/40 to-navy-900/10"
                          />
                        )}
                      </div>
                      <div className="pb-7">
                        <h3 className="font-display text-base font-bold text-navy-900">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-600">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · Leistungen */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Leistungen</span>
            <h2 className="mt-4 heading-2">{servicesIntro.title}</h2>
            <p className="mt-4 lead">{servicesIntro.subtitle}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 4) * 60}>
                <ServiceCard service={service} index={i} className="h-full" />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link href={routes.leistungen} className="btn-secondary px-7 py-4 text-base">
              {ctaLabels.allServices}
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7 · Ablauf – Horizont-Roadmap (Signatur: Meilensteine bis zur Sonne) */}
      <section className="section blueprint border-y border-navy-900/8">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mx-auto w-fit">Ablauf</span>
            <h2 className="mt-4 heading-2">{ablauf.title}</h2>
          </Reveal>

          <div className="relative mt-14 sm:mt-16">
            {/* Horizontlinie, auf der die Meilensteine sitzen (Desktop). */}
            <div
              aria-hidden="true"
              className="absolute inset-x-[12%] top-[22px] hidden h-px bg-gradient-to-r from-teal-600/30 via-navy-900/20 to-sunrise-400/60 lg:block"
            />
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {ablauf.steps.map((step, i) => {
                const isLast = i === ablauf.steps.length - 1;
                return (
                  <Reveal key={step.title} delay={(i % 4) * 90} as="li">
                    <div className="flex flex-col items-start lg:items-center lg:text-center">
                      <span
                        className={cn(
                          "relative flex h-11 w-11 items-center justify-center rounded-full border bg-white font-mono text-sm font-medium tabular-nums shadow-soft",
                          isLast
                            ? "border-sunrise-400/60 text-sunrise-600 ring-4 ring-sunrise-400/15"
                            : "border-teal-600/30 text-teal-700",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-5 font-display text-base font-bold text-navy-900">{step.title}</h3>
                      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-ink-600">{step.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </div>

          <div className="mt-14 flex justify-center">
            <FoerdercheckButton source="ablauf" size="lg">
              {ctaLabels.request}
            </FoerdercheckButton>
          </div>
        </div>
      </section>

      {/* 9 · Über-mich-Kurz */}
      <section className="section soft-blue">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <span className="eyebrow">Über mich</span>
              <h2 className="mt-4 heading-2">{aboutShort.title}</h2>
              <p className="mt-5 lead">{aboutShort.text}</p>
              <Link href={routes.ueberMich} className="btn-secondary mt-7 inline-flex">
                {ctaLabels.moreAboutMe}
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </Reveal>
            <Reveal delay={100}>
              <ul className="grid gap-3 rounded-3xl border border-navy-900/5 bg-white p-6 shadow-soft sm:p-8">
                {aboutShort.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] font-medium text-navy-900">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600/10 text-teal-700">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10 · FAQ */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 heading-2">Häufige Fragen</h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion items={faqHome} idPrefix="home-faq" />
            <div className="mt-8 flex justify-center">
              <Link href={routes.faq} className="btn-ghost">
                {ctaLabels.allFaq}
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11 · Abschluss-CTA */}
      <FinalCta source="home-final" />
    </>
  );
}
