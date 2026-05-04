import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { ServiceIcons } from "./ServiceIcons";

export type ServiceKey = "consulting" | "renovation" | "smart" | "energy";

const accentMap: Record<ServiceKey, { ring: string; iconBg: string; iconText: string; chip: string; glow: string }> = {
  consulting: {
    ring: "hover:border-brand-500/30",
    iconBg: "from-brand-100 to-white",
    iconText: "text-brand-700",
    chip: "chip-brand",
    glow: "before:bg-brand-500/30",
  },
  renovation: {
    ring: "hover:border-ink-900/20",
    iconBg: "from-ink-100 to-white",
    iconText: "text-ink-900",
    chip: "chip",
    glow: "before:bg-ink-900/20",
  },
  smart: {
    ring: "hover:border-tech-500/30",
    iconBg: "from-tech-100 to-white",
    iconText: "text-tech-700",
    chip: "chip-tech",
    glow: "before:bg-tech-500/30",
  },
  energy: {
    ring: "hover:border-brand-500/30",
    iconBg: "from-brand-100 via-tech-50 to-white",
    iconText: "text-brand-700",
    chip: "chip-brand",
    glow: "before:bg-brand-400/30",
  },
};

export function ServiceCard({
  serviceKey,
  title,
  tagline,
  description,
  features,
  cta,
  lang,
}: {
  serviceKey: ServiceKey;
  title: string;
  tagline?: string;
  description: string;
  features?: string[];
  cta: string;
  lang: Locale;
}) {
  const Icon = ServiceIcons[serviceKey];
  const tone = accentMap[serviceKey];
  return (
    <article
      id={serviceKey}
      className={`card h-full ${tone.ring} relative overflow-hidden`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full ${tone.glow.replace("before:", "")} opacity-30 blur-3xl transition group-hover:opacity-60`}
      />
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tone.iconBg} ${tone.iconText} ring-1 ring-ink-900/5 transition group-hover:scale-105`}
        >
          <Icon className="h-6 w-6" />
        </div>
        {tagline && <span className={tone.chip}>{tagline}</span>}
      </div>
      <h3 className="text-xl font-bold tracking-tight text-ink-900">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-600">{description}</p>
      {features && features.length > 0 && (
        <ul className="mt-1 space-y-2 text-sm text-ink-700">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-600" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/${lang}/services#${serviceKey}`}
        className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-ink-900 transition group-hover:gap-2 group-hover:text-brand-700"
      >
        {cta}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
