import Link from "next/link";
import type { FunnelLocale } from "./content";
import { getLandingContent } from "./landing-content";
import { Reveal } from "./fx";

export function LandingSections({
  funnelLocale,
  lang,
}: {
  funnelLocale: FunnelLocale;
  lang: string;
}) {
  const c = getLandingContent(funnelLocale);

  // FAQ-Strukturdaten für Suchmaschinen (rich results).
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div data-chrome="landing" className="relative bg-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Förderprogramme */}
      <section className="section bg-gradient-to-b from-white to-brand-50/40">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{c.programs.eyebrow}</span>
            <h2 className="mt-4 heading-2">{c.programs.title}</h2>
            <p className="mt-4 lead">{c.programs.subtitle}</p>
          </Reveal>

          <Reveal className="mt-12 grid gap-5 lg:grid-cols-3">
            {c.programs.items.map((p) => (
              <article key={p.title} className="group card h-full">
                <div className="flex items-center justify-between gap-3">
                  <span className="chip">{p.tag}</span>
                </div>
                <div className="font-display text-3xl font-extrabold tracking-tight text-brand-700">
                  {p.rate}
                </div>
                <h3 className="text-lg font-bold text-ink-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-700">{p.description}</p>
              </article>
            ))}
          </Reveal>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-ink-400">
            {c.programs.note}
          </p>
        </div>
      </section>

      {/* Ablauf */}
      <section className="section">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{c.process.eyebrow}</span>
            <h2 className="mt-4 heading-2">{c.process.title}</h2>
            <p className="mt-4 lead">{c.process.subtitle}</p>
          </Reveal>

          <Reveal>
            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {c.process.steps.map((s, i) => (
                <li
                  key={s.title}
                  className="relative rounded-3xl border border-brand-900/5 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-bold text-white shadow-soft">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                    {s.description}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Warum ENOX */}
      <section className="section bg-gradient-to-b from-brand-50/40 to-white">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{c.trust.eyebrow}</span>
            <h2 className="mt-4 heading-2">{c.trust.title}</h2>
            <p className="mt-4 lead">{c.trust.subtitle}</p>
          </Reveal>

          <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.trust.points.map((p) => (
              <div key={p.title} className="rounded-3xl border border-brand-900/5 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 ring-1 ring-brand-700/10">
                  <CheckIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{p.description}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-3xl">
          <Reveal className="text-center">
            <span className="eyebrow">{c.faq.eyebrow}</span>
            <h2 className="mt-4 heading-2">{c.faq.title}</h2>
          </Reveal>

          <Reveal className="mt-10 divide-y divide-brand-900/5 overflow-hidden rounded-3xl border border-brand-900/5 bg-white shadow-soft">
            {c.faq.items.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-ink-900 transition hover:bg-brand-50/40 sm:px-6">
                  {f.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-open:rotate-45">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-ink-700 sm:px-6">
                  {f.a}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Abschluss-CTA */}
      <section className="section pt-0">
        <div className="container">
          <Reveal>
            <div className="relative overflow-hidden rounded-4xl bg-ink-900 px-6 py-14 text-center shadow-lift sm:rounded-5xl sm:px-12 sm:py-20">
              <div aria-hidden className="absolute inset-0 dark-mesh opacity-90" />
              <div aria-hidden className="fx-aurora opacity-60" />
              <div
                aria-hidden
                className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl"
              />
              <div className="relative">
                <h2 className="font-display text-display-sm font-bold tracking-tight text-white">
                  {c.finalCta.title}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-brand-100/80 sm:text-lg">
                  {c.finalCta.subtitle}
                </p>
                <div className="mt-8 flex justify-center">
                  <Link
                    href={`/${lang}/foerdercheck#top`}
                    className="fx-sheen inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-400 to-accent-500 px-7 py-3.5 text-sm font-bold text-ink-950 shadow-[0_10px_40px_-8px_rgba(245,158,11,0.7)] transition hover:shadow-[0_14px_50px_-6px_rgba(245,158,11,0.9)] active:scale-95"
                  >
                    {c.finalCta.button}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}
