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
    <article id={serviceKey} className="card h-full">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-700/10 transition group-hover:bg-brand-100">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-bold text-ink-900">{title}</h3>
      <p className="text-[15px] leading-relaxed text-ink-600">{description}</p>
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
