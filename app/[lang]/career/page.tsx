import Link from "next/link";
import { assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { Reveal } from "@/components/Reveal";

export default async function CareerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = assertLocale(raw);
  const dict = await getDictionary(lang);
  const positions = Object.entries(dict.career.positions);

  return (
    <>
      <section className="relative overflow-hidden gradient-hero">
        <div className="fx-aurora-light -z-10" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
        <div className="container py-14 sm:py-20 lg:py-28">
          <div className="max-w-3xl animate-fade-up">
            <span className="eyebrow">{dict.nav.career}</span>
            <h1 className="mt-4 heading-1">
              <span className="text-gradient-brand">{dict.career.title}</span>
            </h1>
            <p className="mt-5 lead">{dict.career.subtitle}</p>
            <p className="mt-4 text-base text-ink-700 sm:text-lg">
              {dict.career.body}
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <h2 className="heading-2">{dict.career.openings}</h2>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {positions.map(([key, pos], i) => (
              <Reveal
                as="li"
                key={key}
                delay={i * 70}
                className="surface fx-spotlight-light group flex flex-col gap-4 p-5 transition hover:-translate-y-1 hover:shadow-lift sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-ink-900 sm:text-xl">
                    {pos.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="chip">📍 {pos.location}</span>
                    <span className="chip">⏱ {pos.type}</span>
                  </div>
                </div>
                <Link
                  href={`/${lang}/contact?subject=${encodeURIComponent(pos.title)}`}
                  className="btn-secondary self-start transition group-hover:border-brand-700/40 group-hover:bg-brand-50 sm:self-auto"
                >
                  {dict.career.apply}
                  <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 rounded-4xl border border-dashed border-brand-700/30 bg-brand-50/40 p-6 text-center sm:p-10">
            <p className="text-sm text-ink-700 sm:text-base">
              {dict.career.subtitle}
            </p>
            <Link
              href={`/${lang}/contact?subject=${encodeURIComponent(dict.career.speculative)}`}
              className="btn-primary fx-sheen mt-5"
            >
              {dict.career.speculative}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
