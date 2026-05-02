import { assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { AboutIllustration } from "@/components/illustrations/AboutIllustration";
import { FounderPortrait } from "@/components/illustrations/FounderPortrait";
import { TrustBar } from "@/components/illustrations/TrustBar";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = assertLocale(raw);
  const dict = await getDictionary(lang);
  const values = Object.entries(dict.about.values.items);

  return (
    <>
      <section className="gradient-hero">
        <div className="container grid gap-10 py-20 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="eyebrow">{dict.about.title}</span>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              {dict.about.lead}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-ink-700">{dict.about.body}</p>
          </div>
          <AboutIllustration className="w-full max-w-md justify-self-center lg:justify-self-end" />
        </div>
      </section>

      <section className="bg-white pt-16">
        <div className="container">
          <TrustBar />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-10 text-white shadow-xl">
            <FounderPortrait className="h-28 w-28" />
            <div className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
              {dict.about.founder.title}
            </div>
            <div className="mt-2 text-2xl font-bold">{dict.about.founder.name}</div>
            <div className="text-sm text-brand-100/90">
              {dict.about.founder.role}
            </div>
            <blockquote className="mt-8 border-l-2 border-brand-300 pl-4 text-base italic text-brand-50">
              “{dict.about.founder.quote}”
            </blockquote>
          </div>

          <div>
            <span className="eyebrow">{dict.about.values.title}</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-900">
              {dict.about.values.title}
            </h2>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-2xl border border-brand-900/5 bg-white p-5 shadow-sm"
                >
                  <dt className="text-base font-semibold text-ink-900">
                    {value.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-700">
                    {value.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
