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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 mesh-bg" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 -z-10 h-96 w-96 animate-blob rounded-full bg-brand-300/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-32 -z-10 h-96 w-96 animate-blob rounded-full bg-brand-500/30 blur-3xl"
          style={{ animationDelay: "4s" }}
        />

        <div className="container grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24 lg:items-center">
          <div className="animate-fade-up">
            <span className="eyebrow">
              <LeafIcon className="h-3.5 w-3.5" />
              {dict.hero.eyebrow}
            </span>
            <h1 className="mt-6 heading-1">
              {dict.hero.title}
            </h1>
            <p className="mt-5 lead max-w-xl">
              {dict.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            <dl className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/60 p-4 ring-1 ring-brand-900/5 backdrop-blur sm:bg-transparent sm:p-0 sm:ring-0"
                >
                  <dd className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-700">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="relative animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-200/60 via-brand-100/30 to-transparent blur-2xl"
            />
            <HeroIllustration className="w-full rounded-4xl shadow-lift" />
            <div className="absolute -bottom-5 left-4 right-4 grid grid-cols-3 gap-2 rounded-2xl border border-brand-900/5 bg-white/95 p-3 shadow-lift backdrop-blur sm:left-6 sm:right-6 sm:gap-3 sm:p-4">
              <Mini label="kWh/m²·a" value="42" />
              <Mini label="CO₂ −%" value="62" />
              <Mini label="ROI" value="7y" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container">
          <div className="rounded-4xl border border-brand-900/5 bg-brand-50/40 p-6 sm:p-10">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
              {dict.about.values.title}
            </p>
            <TrustBar />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{dict.nav.services}</span>
            <h2 className="mt-4 heading-2">{dict.services.title}</h2>
            <p className="mt-4 lead">{dict.services.subtitle}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {SERVICE_KEYS.map((key, i) => (
              <div
                key={key}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
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

      <section className="section bg-gradient-to-b from-white to-brand-50/40">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <AboutIllustration className="w-full" />
          </div>

          <div className="order-1 lg:order-2">
            <span className="eyebrow">{dict.about.title}</span>
            <h2 className="mt-4 heading-2">{dict.about.lead}</h2>
            <p className="mt-5 lead">{dict.about.body}</p>

            <div className="mt-8 surface flex items-start gap-4 p-5 sm:gap-5 sm:p-6">
              <FounderPortrait className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" />
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  {dict.about.founder.title}
                </div>
                <div className="mt-1 text-base font-bold text-ink-900 sm:text-lg">
                  {dict.about.founder.name}
                </div>
                <div className="text-sm text-ink-700">
                  {dict.about.founder.role}
                </div>
                <blockquote className="mt-3 border-l-2 border-brand-700 pl-3 text-sm italic text-ink-800">
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

      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-4xl bg-ink-900 px-6 py-14 text-center shadow-lift sm:rounded-5xl sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0 dark-mesh opacity-90"
            />
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl"
            />
            <div className="relative">
              <h2 className="font-display text-display-sm font-bold tracking-tight text-white">
                {dict.hero.ctaPrimary}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-brand-100/80 sm:text-lg">
                {dict.contact.subtitle}
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-400 px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-glow transition hover:bg-brand-300 active:scale-95"
                >
                  {dict.nav.consultation}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 sm:text-xs">
        {label}
      </div>
      <div className="mt-0.5 font-display text-base font-bold text-ink-900 sm:text-lg">
        {value}
      </div>
    </div>
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
