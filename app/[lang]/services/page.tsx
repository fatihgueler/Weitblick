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
      <section className="gradient-hero">
        <div className="container py-20 sm:py-24">
          <span className="eyebrow">{dict.nav.services}</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            {dict.services.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-700">
            {dict.services.subtitle}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>

      <section className="section bg-white">
        <div className="container rounded-3xl bg-brand-50 px-8 py-12 sm:px-12">
          <div className="grid gap-6 md:grid-cols-[2fr_1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                {dict.hero.ctaPrimary}
              </h2>
              <p className="mt-2 text-ink-700">{dict.contact.subtitle}</p>
            </div>
            <div className="md:text-right">
              <Link href={`/${lang}/contact`} className="btn-primary">
                {dict.nav.consultation}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
