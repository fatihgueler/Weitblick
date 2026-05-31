import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { ServiceIcons } from "./ServiceIcons";

export type ServiceKey =
  | "residential"
  | "commercial"
  | "audit"
  | "certificate"
  | "thermography"
  | "photovoltaic"
  | "architecture"
  | "international";

export function ServiceCard({
  serviceKey,
  title,
  description,
  cta,
  lang,
}: {
  serviceKey: ServiceKey;
  title: string;
  description: string;
  cta: string;
  lang: Locale;
}) {
  const Icon = ServiceIcons[serviceKey];
  return (
    <article id={serviceKey} className="group card h-full">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 ring-1 ring-brand-700/10 transition group-hover:scale-105 group-hover:from-brand-200 group-hover:to-brand-100">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-ink-900">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-700">{description}</p>
      <Link
        href={`/${lang}/services#${serviceKey}`}
        className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2 group-hover:text-brand-900"
      >
        {cta}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
