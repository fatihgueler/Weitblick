import Link from "next/link";
import { assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ServiceCard, type ServiceKey } from "@/components/ServiceCard";

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
        <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
        <div className="container py-14 sm:py-20 lg:py-28">
          <div className="max-w-3xl animate-fade-up">
            <span className="eyebrow">{dict.nav.services}</span>
            <h1 className="mt-4 heading-1">{dict.services.title}</h1>
            <p className="mt-5 lead">{dict.services.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
      </section>

      <section className="section">
        <div className="container">
          <div className="rounded-4xl bg-brand-50 px-6 py-10 sm:px-12 sm:py-14">
            <div className="grid gap-6 md:grid-cols-[2fr_1fr] md:items-center">
              <div>
                <h2 className="heading-2">{dict.hero.ctaPrimary}</h2>
                <p className="mt-3 lead">{dict.contact.subtitle}</p>
              </div>
              <div className="md:text-right">
                <Link
                  href={`/${lang}/contact`}
                  className="btn-primary w-full md:w-auto"
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
