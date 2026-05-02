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
      <section className="gradient-hero">
        <div className="container py-20 sm:py-24">
          <span className="eyebrow">{dict.nav.career}</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            {dict.career.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-700">
            {dict.career.subtitle}
          </p>
          <p className="mt-6 max-w-3xl text-base text-ink-700">
            {dict.career.body}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
            {dict.career.openings}
          </h2>

          <ul className="mt-8 divide-y divide-brand-900/5 overflow-hidden rounded-3xl border border-brand-900/5 bg-white shadow-sm">
            {positions.map(([key, pos]) => (
              <li
                key={key}
                className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-ink-900">
                    {pos.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-2 text-sm text-ink-700">
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800">
                      {pos.location}
                    </span>
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800">
                      {pos.type}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/${lang}/contact?subject=${encodeURIComponent(pos.title)}`}
                  className="btn-secondary self-start sm:self-auto"
                >
                  {dict.career.apply}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl bg-brand-50 p-6 text-center">
            <Link
              href={`/${lang}/contact?subject=${encodeURIComponent(dict.career.speculative)}`}
              className="btn-primary"
            >
              {dict.career.speculative}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
