import type { Metadata } from "next";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { services, servicesPage, ctaLabels } from "@/lib/content";
import { serviceIcons } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { FoerdercheckButton } from "@/components/FoerdercheckButton";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Leistungen",
  description: servicesPage.text,
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenPage() {
  return (
    <>
      <PageHero eyebrow="Leistungen" title={servicesPage.title} text={servicesPage.text}>
        <FoerdercheckButton source="leistungen-hero" size="lg">
          {ctaLabels.foerdercheck}
        </FoerdercheckButton>
      </PageHero>

      {/* Übersicht */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} className="h-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Detailblöcke */}
      {services.map((service, i) => {
        const Icon = serviceIcons[service.icon];
        const alt = i % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={cn("scroll-mt-24 py-14 sm:py-16", alt ? "bg-ink-50/70" : "bg-white")}
          >
            <div className="container">
              <Reveal className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-14">
                <div className={cn(alt && "lg:order-2")}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                      {Icon ? <Icon className="h-6 w-6" strokeWidth={1.8} /> : null}
                    </span>
                    <span className="index-tag text-navy-900/40">
                      Leistung {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 lead">{service.detail}</p>
                </div>
                <div className={cn("rounded-2xl border border-navy-900/8 bg-white p-6 shadow-soft sm:p-8", alt && "lg:order-1")}>
                  <h3 className="label">Typische Inhalte</h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-navy-900">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600/10 text-teal-700">
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <FinalCta source="leistungen-final" />
    </>
  );
}
