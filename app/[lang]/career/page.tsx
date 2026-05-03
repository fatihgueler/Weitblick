import Link from "next/link";
import { assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

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
      <section className="relative overflow-hidden border-b border-ink-200/40 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container py-14 sm:py-16 lg:py-20">
          <div className="max-w-3xl animate-fade-up">
            <span className="eyebrow">{dict.nav.career}</span>
            <h1 className="mt-4 heading-1">{dict.career.title}</h1>
            <p className="mt-5 lead">{dict.career.subtitle}</p>
            <p className="mt-4 body">{dict.career.body}</p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <h2 className="heading-2">{dict.career.openings}</h2>

          <ul className="mt-8 space-y-3">
            {positions.map(([key, pos], i) => (
              <li
                key={key}
                className="surface flex flex-col gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lift sm:flex-row sm:items-center sm:justify-between sm:p-6 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
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
                  className="btn-secondary self-start sm:self-auto"
                >
                  {dict.career.apply}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-4xl border border-dashed border-brand-700/30 bg-brand-50/40 p-6 text-center sm:p-10">
            <p className="text-sm text-ink-700 sm:text-base">
              {dict.career.subtitle}
            </p>
            <Link
              href={`/${lang}/contact?subject=${encodeURIComponent(dict.career.speculative)}`}
              className="btn-primary mt-5"
            >
              {dict.career.speculative}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
