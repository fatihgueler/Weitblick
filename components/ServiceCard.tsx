"use client";

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
  const track = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <article
      id={serviceKey}
      onMouseMove={track}
      className="group card fx-spotlight-light h-full"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 ring-1 ring-brand-700/10 transition duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:from-brand-200 group-hover:to-brand-100 group-hover:shadow-[0_8px_24px_-8px_rgba(34,197,94,0.6)]">
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
