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
      <section className="gradient-hero relative overflow-hidden">
        <div className="container grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="eyebrow">
              <LeafIcon className="h-3.5 w-3.5" />
              {dict.hero.eyebrow}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-700">
              {dict.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${lang}/contact`} className="btn-primary">
                {dict.hero.ctaPrimary}
              </Link>
              <Link href={`/${lang}/services`} className="btn-secondary">
                {dict.hero.ctaSecondary}
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-700">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-brand-800">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/60 via-brand-100/30 to-transparent blur-2xl" />
            <HeroIllustration className="w-full rounded-3xl shadow-xl" />
            <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-3 gap-3 rounded-2xl border border-brand-900/5 bg-white/95 p-4 shadow-lg backdrop-blur">
              <Mini label="kWh/m²·a" value="42" />
              <Mini label="CO₂ −%" value="62" />
              <Mini label="ROI" value="7y" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{dict.nav.services}</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              {dict.services.title}
            </h2>
            <p className="mt-4 text-base text-ink-700">{dict.services.subtitle}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_KEYS.map((key) => (
              <ServiceCard
                key={key}
                serviceKey={key}
                title={dict.services.items[key].title}
                description={dict.services.items[key].description}
                cta={dict.services.cta}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="rounded-3xl bg-brand-50/60 p-8 sm:p-10">
            <div className="text-center">
              <span className="eyebrow">{dict.about.title}</span>
            </div>
            <TrustBar className="mt-8" />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <AboutIllustration className="w-full" />

          <div>
            <span className="eyebrow">{dict.about.title}</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              {dict.about.lead}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-700">
              {dict.about.body}
            </p>

            <div className="mt-8 flex items-start gap-5 rounded-2xl border border-brand-900/5 bg-gradient-to-br from-brand-50 to-white p-5">
              <FounderPortrait className="h-20 w-20 shrink-0" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                  {dict.about.founder.title}
                </div>
                <div className="mt-1 text-lg font-bold text-ink-900">
                  {dict.about.founder.name}
                </div>
                <div className="text-sm text-ink-700">
                  {dict.about.founder.role}
                </div>
                <blockquote className="mt-3 border-l-2 border-brand-700 pl-3 text-sm italic text-ink-800">
                  “{dict.about.founder.quote}”
                </blockquote>
              </div>
            </div>

            <Link
              href={`/${lang}/about`}
              className="mt-6 inline-flex btn-secondary"
            >
              {dict.common.readMore}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="rounded-3xl bg-ink-900 px-8 py-14 text-center shadow-xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {dict.hero.ctaPrimary}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-brand-100/80">
              {dict.contact.subtitle}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-3 text-sm font-semibold text-ink-900 shadow-sm transition hover:bg-brand-400"
              >
                {dict.nav.consultation}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-ink-700">{label}</div>
      <div className="mt-0.5 text-base font-bold text-ink-900">{value}</div>
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
