import Link from "next/link";
import { assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ServiceCard, type ServiceKey } from "@/components/ServiceCard";
import { ServiceIcons } from "@/components/ServiceIcons";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { AboutIllustration } from "@/components/illustrations/AboutIllustration";
import { FounderPortrait } from "@/components/illustrations/FounderPortrait";
import { PartnersMarquee } from "@/components/PartnersMarquee";
import { SavingsCalculator } from "@/components/SavingsCalculator";

const SERVICE_KEYS: ServiceKey[] = ["consulting", "renovation", "smart", "energy"];
const PROBLEM_KEYS = ["costs", "regulation", "blindspot", "fragmented"] as const;
const USP_KEYS = ["endToEnd", "tech", "digital", "roi"] as const;
const STEP_KEYS = ["analyze", "concept", "deploy"] as const;
const STAT_KEYS = ["savings", "co2", "projects", "roi"] as const;

const PROBLEM_ICONS: Record<(typeof PROBLEM_KEYS)[number], keyof typeof ServiceIcons> = {
  costs: "chart",
  regulation: "shield",
  blindspot: "monitoring",
  fragmented: "iot",
};

const USP_ICONS: Record<(typeof USP_KEYS)[number], keyof typeof ServiceIcons> = {
  endToEnd: "shield",
  tech: "iot",
  digital: "smart",
  roi: "chart",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = assertLocale(raw);
  const dict = await getDictionary(lang);

  const heroStats: Array<{ value: string; label: string }> = [
    { value: "350+", label: dict.hero.stats.projects },
    { value: "−42%", label: dict.hero.stats.savings },
    { value: "5,8 J.", label: dict.hero.stats.roi },
    { value: "15+", label: dict.hero.stats.experience },
  ];

  return (
    <>
      {/* HERO ----------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 mesh-bg" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 grid-bg opacity-50" />
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-32 -z-10 h-[32rem] w-[32rem] animate-blob rounded-full bg-brand-300/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 -z-10 h-[32rem] w-[32rem] animate-blob rounded-full bg-tech-300/30 blur-3xl"
          style={{ animationDelay: "5s" }}
        />

        <div className="container relative pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32">
          <div className="mx-auto max-w-4xl text-center animate-fade-up">
            <span className="eyebrow">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-70" />
                <span className="relative inline-block h-2 w-2 rounded-full bg-brand-500" />
              </span>
              {dict.hero.eyebrow}
            </span>
            <h1 className="mt-7 font-display text-[clamp(2.75rem,7vw+0.5rem,5.5rem)] font-black leading-[1] tracking-tighter text-ink-900">
              {dict.hero.title}
              <br />
              <span className="gradient-text">{dict.hero.highlight}</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg sm:leading-relaxed">
              {dict.hero.subtitle}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={`/${lang}/contact`} className="btn-primary btn-lg w-full sm:w-auto">
                {dict.hero.ctaPrimary}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="#process" className="btn-secondary btn-lg w-full sm:w-auto">
                {dict.hero.ctaSecondary}
              </Link>
            </div>

            <p className="mt-5 text-xs text-ink-500">
              {dict.finalCta.trust}
            </p>
          </div>

          <div className="relative mx-auto mt-14 max-w-5xl animate-fade-up sm:mt-20" style={{ animationDelay: "180ms" }}>
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-[2.75rem] bg-gradient-to-br from-brand-200/40 via-tech-100/30 to-transparent blur-3xl"
            />
            <div className="relative overflow-hidden rounded-4xl border border-ink-900/5 bg-white shadow-lift">
              <HeroIllustration className="w-full" />

              {/* Live status pill */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink-900 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lift sm:top-6 sm:left-6">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand-400 opacity-70" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-brand-400" />
                </span>
                {dict.hero.live}
              </div>

              {/* Floating mini-metrics */}
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 rounded-2xl border border-ink-900/5 bg-white/95 p-3 shadow-lift backdrop-blur sm:bottom-6 sm:left-6 sm:right-6 sm:gap-4 sm:p-4">
                <Mini label={dict.hero.panel.consumption} value="42" unit="kWh/m²" />
                <Mini label={dict.hero.panel.co2} value="−68%" />
                <Mini label={dict.hero.panel.efficiency} value="A+" />
              </div>
            </div>
          </div>

          {/* Stats Strip */}
          <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${260 + i * 60}ms` }}
              >
                <dd className="font-display text-3xl font-black tracking-tight text-ink-900 sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* PARTNERS MARQUEE ---------------------------------------------- */}
      <section className="border-y border-ink-900/5 bg-white py-8">
        <div className="container">
          <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500">
            {dict.partners.title}
          </p>
          <PartnersMarquee items={dict.partners.items} />
        </div>
      </section>

      {/* PROBLEM → SOLUTION -------------------------------------------- */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{dict.problem.eyebrow}</span>
            <h2 className="mt-4 heading-2">{dict.problem.title}</h2>
            <p className="mt-5 lead">{dict.problem.subtitle}</p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {PROBLEM_KEYS.map((key, i) => {
              const item = dict.problem.items[key];
              const Icon = ServiceIcons[PROBLEM_ICONS[key]];
              return (
                <div
                  key={key}
                  className="rounded-3xl border border-ink-900/5 bg-ink-50/60 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lift animate-fade-up"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-ink-900 ring-1 ring-ink-900/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="relative mt-14 overflow-hidden rounded-4xl border border-ink-900/5 bg-gradient-to-br from-brand-50 via-white to-tech-50 p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-300/40 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-tech-300/40 blur-3xl"
            />
            <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
              <div>
                <span className="eyebrow">EnOX</span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                  {dict.problem.solutionTitle}
                </h3>
                <p className="mt-4 lead">{dict.problem.solutionBody}</p>
                <Link href={`/${lang}/services`} className="btn-primary mt-7 inline-flex">
                  {dict.nav.services}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FlowChip step="01" text={dict.process.steps.analyze.title} />
                <FlowChip step="02" text={dict.process.steps.concept.title} />
                <FlowChip step="03" text={dict.process.steps.deploy.title} />
                <FlowChip step="∞" text="Monitoring" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES ------------------------------------------------------- */}
      <section id="services" className="section bg-ink-50/40">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{dict.nav.services}</span>
            <h2 className="mt-4 heading-2">{dict.services.title}</h2>
            <p className="mt-5 lead">{dict.services.subtitle}</p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {SERVICE_KEYS.map((key, i) => {
              const item = dict.services.items[key];
              return (
                <div key={key} className="animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
                  <ServiceCard
                    serviceKey={key}
                    title={item.title}
                    tagline={item.tagline}
                    description={item.description}
                    features={item.features}
                    cta={dict.services.cta}
                    lang={lang}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* USP / DIFFERENTIATION ----------------------------------------- */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-start">
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow">{dict.usp.eyebrow}</span>
              <h2 className="mt-4 heading-2">{dict.usp.title}</h2>
              <p className="mt-5 lead">{dict.usp.subtitle}</p>
              <Link href={`/${lang}/contact`} className="btn-primary mt-7 inline-flex">
                {dict.nav.consultation}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {USP_KEYS.map((key, i) => {
                const item = dict.usp.items[key];
                const Icon = ServiceIcons[USP_ICONS[key]];
                return (
                  <div
                    key={key}
                    className="group relative overflow-hidden rounded-3xl border border-ink-900/5 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift animate-fade-up"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-brand-400/20 to-tech-400/20 blur-2xl transition group-hover:scale-125"
                    />
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-tech-600 text-white shadow-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="relative mt-5 text-base font-bold text-ink-900">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-ink-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS -------------------------------------------------------- */}
      <section
        id="process"
        className="relative overflow-hidden bg-ink-900 text-white"
      >
        <div aria-hidden="true" className="absolute inset-0 dark-mesh opacity-90" />
        <div aria-hidden="true" className="absolute inset-0 grid-bg-dense opacity-40" />
        <div className="relative section">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow-dark">{dict.process.eyebrow}</span>
              <h2 className="mt-4 font-display text-display-sm font-bold tracking-tight text-white">
                {dict.process.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
                {dict.process.subtitle}
              </p>
            </div>

            <ol className="mt-14 grid gap-6 lg:grid-cols-3">
              {STEP_KEYS.map((key, i) => {
                const step = dict.process.steps[key];
                return (
                  <li
                    key={key}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:bg-white/10 animate-fade-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-5xl font-extrabold tracking-tighter text-brand-300/60">
                        {step.step}
                      </span>
                      {i < STEP_KEYS.length - 1 && (
                        <div className="hidden lg:block">
                          <ArrowIcon className="h-6 w-6 text-white/30" />
                        </div>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {step.description}
                    </p>
                    <div className="mt-6 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-300">
                      <span>Step {i + 1}/3</span>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-12 flex justify-center">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-glow transition hover:bg-brand-400 active:scale-95"
              >
                {dict.process.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF / STATS / TESTIMONIALS ---------------------------------- */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
            <div>
              <span className="eyebrow">{dict.proof.eyebrow}</span>
              <h2 className="mt-4 heading-2">{dict.proof.title}</h2>
              <p className="mt-5 lead">{dict.proof.subtitle}</p>
            </div>
            <AboutIllustration className="w-full rounded-4xl shadow-soft" />
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {STAT_KEYS.map((key, i) => {
              const stat = dict.proof.stats[key];
              return (
                <div
                  key={key}
                  className="surface p-6 transition hover:-translate-y-1 hover:shadow-lift animate-fade-up"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="font-display text-4xl font-extrabold tracking-tight gradient-text sm:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-sm font-bold text-ink-900">{stat.label}</div>
                  <div className="mt-1 text-xs leading-relaxed text-ink-600">
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16">
            <h3 className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-500">
              {dict.proof.testimonialsTitle}
            </h3>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {dict.proof.testimonials.map((t, i) => (
                <figure
                  key={t.author}
                  className="relative overflow-hidden rounded-3xl border border-ink-900/5 bg-gradient-to-br from-white to-ink-50/60 p-6 transition hover:-translate-y-1 hover:shadow-lift animate-fade-up"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <QuoteIcon className="h-6 w-6 text-brand-500" />
                  <blockquote className="mt-4 text-sm leading-relaxed text-ink-800 sm:text-base">
                    „{t.quote}"
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-900/5 pt-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-tech-600 text-xs font-bold text-white">
                      {initials(t.author)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink-900">{t.author}</div>
                      <div className="text-xs text-ink-600">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SAVINGS CALCULATOR -------------------------------------------- */}
      <section className="section-tight bg-ink-50/40">
        <div className="container">
          <SavingsCalculator
            strings={{
              title: dict.calculator.title,
              subtitle: dict.calculator.subtitle,
              area: dict.calculator.area,
              consumption: dict.calculator.consumption,
              result: dict.calculator.result,
              resultLabel: dict.calculator.resultLabel,
              co2Label: dict.calculator.co2Label,
              paybackLabel: dict.calculator.paybackLabel,
              cta: dict.calculator.cta,
              ctaHref: `/${lang}/contact`,
            }}
          />
        </div>
      </section>

      {/* ABOUT FOUNDER -------------------------------------------------- */}
      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
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
            <span className="eyebrow">{dict.about.title}</span>
            <h2 className="mt-4 heading-2">{dict.about.lead}</h2>
            <p className="mt-5 lead">{dict.about.body}</p>
            <Link href={`/${lang}/about`} className="btn-secondary mt-7 inline-flex">
              {dict.common.readMore}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA ------------------------------------------------------ */}
      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-4xl bg-ink-900 px-6 py-16 text-center shadow-lift sm:rounded-5xl sm:px-12 sm:py-24">
            <div aria-hidden="true" className="absolute inset-0 dark-mesh opacity-90" />
            <div aria-hidden="true" className="absolute inset-0 grid-bg-dense opacity-50" />
            <div
              aria-hidden="true"
              className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl"
            />
            <div className="relative mx-auto max-w-3xl">
              <span className="eyebrow-dark">{dict.finalCta.eyebrow}</span>
              <h2 className="mt-5 font-display text-display-sm font-bold tracking-tight text-white sm:text-display">
                {dict.finalCta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
                {dict.finalCta.subtitle}
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-glow transition hover:bg-brand-400 active:scale-95"
                >
                  {dict.finalCta.ctaPrimary}
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href={`/${lang}/services`}
                  className="btn-glass"
                >
                  {dict.finalCta.ctaSecondary}
                </Link>
              </div>
              <p className="mt-6 text-xs text-white/55">{dict.finalCta.trust}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Mini({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="text-center">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 sm:text-xs">
        {label}
      </div>
      <div className="mt-0.5 font-display text-base font-bold text-ink-900 sm:text-lg">
        {value}
        {unit && (
          <span className="ml-1 text-[10px] font-medium text-ink-500">{unit}</span>
        )}
      </div>
    </div>
  );
}

function FlowChip({ step, text }: { step: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-ink-900/5 bg-white/80 p-3 shadow-soft backdrop-blur">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-tech-600 text-xs font-extrabold text-white">
        {step}
      </div>
      <div className="text-sm font-semibold text-ink-900">{text}</div>
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 7h4v4H8c0 2 1 3 3 3v3c-3 0-5-2-5-5V7zm9 0h4v4h-3c0 2 1 3 3 3v3c-3 0-5-2-5-5V7z" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .replace(/Dr\.?/, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}
