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
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
        <div className="container grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:py-28">
          <div className="animate-fade-up">
            <span className="eyebrow">{dict.about.title}</span>
            <h1 className="mt-4 heading-1">
              <span className="gradient-text">{dict.about.lead}</span>
            </h1>
            <p className="mt-5 lead">{dict.about.body}</p>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <AboutIllustration className="mx-auto w-full max-w-md" />
          </div>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container">
          <div className="rounded-4xl border border-ink-900/5 bg-ink-50/40 p-6 sm:p-10">
            <p className="mb-6 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500">
              {dict.partners.title}
            </p>
            <TrustBar items={dict.partners.items} />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
          <div className="relative overflow-hidden rounded-4xl bg-ink-900 p-8 text-white shadow-lift sm:p-10">
            <div aria-hidden="true" className="absolute inset-0 dark-mesh opacity-90" />
            <div className="relative">
              <FounderPortrait className="h-28 w-28 sm:h-32 sm:w-32" />
              <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-200">
                {dict.about.founder.title}
              </div>
              <div className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                {dict.about.founder.name}
              </div>
              <div className="text-sm text-white/70">{dict.about.founder.role}</div>
              <blockquote className="mt-7 border-l-2 border-brand-400 pl-4 text-base italic text-white/90 sm:text-lg">
                „{dict.about.founder.quote}"
              </blockquote>
            </div>
          </div>

          <div>
            <span className="eyebrow">{dict.about.values.title}</span>
            <h2 className="mt-4 heading-2">{dict.about.values.title}</h2>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map(([key, value]) => (
                <div
                  key={key}
                  className="surface p-6 transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <dt className="text-base font-bold text-ink-900">{value.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-600">
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
