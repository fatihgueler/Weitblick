import Link from "next/link";
import { assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ServiceCard, type ServiceKey } from "@/components/ServiceCard";

const SERVICE_KEYS: ServiceKey[] = ["consulting", "renovation", "smart", "energy"];

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
        <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
        <div className="container py-16 sm:py-20 lg:py-28">
          <div className="max-w-3xl animate-fade-up">
            <span className="eyebrow">{dict.nav.services}</span>
            <h1 className="mt-4 heading-1">{dict.services.title}</h1>
            <p className="mt-5 lead">{dict.services.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
          {SERVICE_KEYS.map((key, i) => {
            const item = dict.services.items[key];
            return (
              <div
                key={key}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
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
      </section>

      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-brand-50 via-white to-tech-50 px-6 py-12 sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-300/40 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-tech-300/40 blur-3xl"
            />
            <div className="relative grid gap-6 md:grid-cols-[2fr_1fr] md:items-center">
              <div>
                <h2 className="heading-2">{dict.finalCta.title}</h2>
                <p className="mt-3 lead">{dict.finalCta.subtitle}</p>
              </div>
              <div className="md:text-right">
                <Link href={`/${lang}/contact`} className="btn-primary w-full md:w-auto">
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
