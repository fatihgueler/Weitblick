import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import {
  hero,
  trustItems,
  nutzen,
  foerdercheckTeaser,
  services,
  servicesIntro,
  audiences,
  ablauf,
  aboutShort,
  faqHome,
  ctaLabels,
  routes,
} from "@/lib/content";
import { serviceIcons, audienceIcons } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { FoerdercheckButton } from "@/components/FoerdercheckButton";
import { FoerdercheckBox } from "@/components/FoerdercheckBox";
import { ServiceCard } from "@/components/ServiceCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FinalCta } from "@/components/FinalCta";

export default function HomePage() {
  return (
    <>
      {/* 2 · Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 hero-glow" />
        <div className="container grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
          <div className="animate-fade-up">
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1 className="mt-5 heading-1">{hero.title}</h1>
            <p className="mt-5 lead max-w-xl">{hero.subtitle}</p>

            <ul className="mt-7 flex flex-col gap-2.5">
              {hero.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[15px] font-medium text-navy-900">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

      {/* 3 · Vertrauensleiste */}
      <section className="border-y border-navy-900/5 bg-navy-50/60">
        <div className="container py-6 sm:py-7">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-navy-900">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600/10 text-teal-700">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                {item}
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
                <ol className="flex flex-col gap-4">
                  {foerdercheckTeaser.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                          {i + 1}
                        </span>
                        {i < foerdercheckTeaser.steps.length - 1 && (
                          <span aria-hidden="true" className="mt-1 h-full w-px flex-1 bg-navy-900/10" />
                        )}
                      </div>
                      <div className="pb-2">
                        <h3 className="text-base font-bold text-navy-900">{step.title}</h3>
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
                <ServiceCard service={service} className="h-full" />
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

      {/* 7 · Zielgruppen */}
      <section className="section bg-ink-50/70">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2">{audiences.title}</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-3">
            {audiences.cards.map((card, i) => {
              const Icon = audienceIcons[card.icon];
              return (
                <Reveal key={card.title} delay={i * 80}>
                  <div className="card h-full">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-teal-300">
                      {Icon ? <Icon className="h-6 w-6" strokeWidth={1.8} /> : null}
                    </span>
                    <h3 className="text-lg font-bold text-navy-900">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-600">{card.text}</p>
                    <ul className="mt-1 flex flex-col gap-2">
                      {card.topics.map((t) => (
                        <li key={t} className="flex items-center gap-2 text-sm text-navy-900">
                          <Check className="h-4 w-4 shrink-0 text-teal-600" strokeWidth={2.4} />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 · Ablauf */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Ablauf</span>
            <h2 className="mt-4 heading-2">{ablauf.title}</h2>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {ablauf.steps.map((step, i) => (
              <Reveal key={step.title} delay={(i % 4) * 70} as="li">
                <div className="relative h-full rounded-3xl border border-navy-900/5 bg-white p-6 shadow-soft">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 font-display text-lg font-extrabold text-teal-700">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10 flex justify-center">
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
