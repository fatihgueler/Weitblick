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
      className={`card group h-full ${tone.ring} relative overflow-hidden`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full ${tone.glow.replace("before:", "")} opacity-20 blur-3xl transition duration-500 group-hover:scale-125 group-hover:opacity-50`}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tone.iconBg} ${tone.iconText} ring-1 ring-ink-900/5 transition duration-300 group-hover:scale-110 group-hover:rotate-3`}
        >
          <Icon className="h-7 w-7" />
        </div>
        {tagline && <span className={tone.chip}>{tagline}</span>}
      </div>
      <h3 className="relative font-display text-xl font-extrabold tracking-tight text-ink-900 sm:text-[1.375rem]">{title}</h3>
      <p className="relative text-sm leading-relaxed text-ink-600">{description}</p>
      {features && features.length > 0 && (
        <ul className="relative mt-1 space-y-2.5 text-sm text-ink-700">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <CheckIcon className="h-2.5 w-2.5" />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/${lang}/services#${serviceKey}`}
        className="relative mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-ink-900 transition group-hover:gap-3 group-hover:text-brand-700"
      >
        {cta}
        <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
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
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
