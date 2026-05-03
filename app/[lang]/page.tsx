import Link from "next/link";
import { assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ServiceCard, type ServiceKey } from "@/components/ServiceCard";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { AboutIllustration } from "@/components/illustrations/AboutIllustration";
import { FounderPortrait } from "@/components/illustrations/FounderPortrait";
import { TrustBar } from "@/components/illustrations/TrustBar";

const SERVICE_KEYS: ServiceKey[] = [
  "residential",
  "commercial",
  "audit",
  "certificate",
  "thermography",
  "photovoltaic",
  "architecture",
  "international",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = assertLocale(raw);
  const dict = await getDictionary(lang);
  const stats = [
    { value: "350+", label: dict.hero.stats.projects },
    { value: "12", label: dict.hero.stats.countries },
    { value: "38%", label: dict.hero.stats.savings },
    { value: "15+", label: dict.hero.stats.experience },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-200/40 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-14 lg:py-24">
          <div className="animate-fade-up">
            <span className="eyebrow">
              <LeafIcon className="h-3.5 w-3.5" />
              {dict.hero.eyebrow}
            </span>
            <h1 className="mt-5 heading-1">{dict.hero.title}</h1>
            <p className="mt-5 lead max-w-xl">{dict.hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${lang}/contact`}
                className="btn-primary w-full sm:w-auto"
              >
                {dict.hero.ctaPrimary}
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={`/${lang}/services`}
                className="btn-secondary w-full sm:w-auto"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm animate-fade-up lg:max-w-md" style={{ animationDelay: "120ms" }}>
            <HeroIllustration className="w-full rounded-3xl shadow-soft" />
          </div>
        </div>

        <div className="border-t border-ink-200/50 bg-white/60 backdrop-blur">
          <div className="container">
            <dl className="grid grid-cols-2 divide-ink-200/60 sm:grid-cols-4 sm:divide-x">
              {stats.map((stat) => (
                <div key={stat.label} className="px-2 py-5 text-center sm:py-6">
                  <dd className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 sm:text-xs">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container">
          <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-500">
            {dict.about.values.title}
          </p>
          <TrustBar />
        </div>
      </section>

      <section className="section bg-ink-50/40 border-y border-ink-200/40">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">{dict.nav.services}</span>
            <h2 className="mt-4 heading-2">{dict.services.title}</h2>
            <p className="mt-4 lead">{dict.services.subtitle}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_KEYS.map((key, i) => (
              <div
                key={key}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <ServiceCard
                  serviceKey={key}
                  title={dict.services.items[key].title}
                  description={dict.services.items[key].description}
                  cta={dict.services.cta}
                  lang={lang}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="order-2 lg:order-1">
            <AboutIllustration className="mx-auto w-full max-w-sm lg:max-w-md" />
          </div>

          <div className="order-1 lg:order-2">
            <span className="eyebrow">{dict.about.title}</span>
            <h2 className="mt-4 heading-2">{dict.about.lead}</h2>
            <p className="mt-5 lead">{dict.about.body}</p>

            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-ink-200/60 bg-ink-50/30 p-5">
              <FounderPortrait className="h-14 w-14 shrink-0 sm:h-16 sm:w-16" />
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                  {dict.about.founder.title}
                </div>
                <div className="mt-1 text-base font-bold text-ink-900">
                  {dict.about.founder.name}
                </div>
                <div className="text-sm text-ink-600">
                  {dict.about.founder.role}
                </div>
                <blockquote className="mt-3 border-l-2 border-brand-600 pl-3 text-sm italic text-ink-700">
                  „{dict.about.founder.quote}"
                </blockquote>
              </div>
            </div>

            <Link
              href={`/${lang}/about`}
              className="btn-secondary mt-6 inline-flex"
            >
              {dict.common.readMore}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ink-900 text-white">
        <div className="container py-14 text-center sm:py-20">
          <h2 className="font-display text-display-sm font-bold tracking-tight text-white">
            {dict.hero.ctaPrimary}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-brand-100/80 sm:text-lg">
            {dict.contact.subtitle}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-400 px-7 py-3.5 text-sm font-semibold text-ink-900 transition hover:bg-brand-300 active:scale-95"
            >
              {dict.nav.consultation}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 21c8 0 14-6 14-14V5h-2C9 5 3 11 3 19v2z" />
      <path d="M5 21c4-7 8-11 14-14" />
    </svg>
  );
}
