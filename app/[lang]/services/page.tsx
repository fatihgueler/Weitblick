import Link from "next/link";
import { assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ServiceCard, type ServiceKey } from "@/components/ServiceCard";
import { Reveal } from "@/components/Reveal";

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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = assertLocale(raw);
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="relative overflow-hidden gradient-hero">
        <div className="fx-aurora-light -z-10" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
        <div className="container py-14 sm:py-20 lg:py-28">
          <div className="max-w-3xl animate-fade-up">
            <span className="eyebrow">{dict.nav.services}</span>
            <h1 className="mt-4 heading-1">
              <span className="text-gradient-brand">{dict.services.title}</span>
            </h1>
            <p className="mt-5 lead">{dict.services.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SERVICE_KEYS.map((key, i) => (
            <Reveal key={key} delay={(i % 3) * 80}>
              <ServiceCard
                serviceKey={key}
                title={dict.services.items[key].title}
                description={dict.services.items[key].description}
                cta={dict.services.cta}
                lang={lang}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="relative overflow-hidden rounded-4xl bg-ink-900 px-6 py-12 shadow-lift sm:px-12 sm:py-16">
            <div aria-hidden className="absolute inset-0 dark-mesh opacity-90" />
            <div aria-hidden className="fx-aurora opacity-60" />
            <div className="relative grid gap-6 md:grid-cols-[2fr_1fr] md:items-center">
              <div>
                <h2 className="font-display text-display-sm font-bold tracking-tight text-white">
                  {dict.hero.ctaPrimary}
                </h2>
                <p className="mt-3 text-base text-brand-100/80 sm:text-lg">
                  {dict.contact.subtitle}
                </p>
              </div>
              <div className="md:text-right">
                <Link
                  href={`/${lang}/contact`}
                  className="fx-sheen inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-400 to-brand-500 px-7 py-3.5 text-sm font-bold text-ink-950 shadow-glow transition hover:shadow-[0_14px_50px_-6px_rgba(34,197,94,0.95)] active:scale-95 md:w-auto"
                >
                  {dict.nav.consultation}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
