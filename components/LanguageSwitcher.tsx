"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  type Locale,
  locales,
  localeNames,
  localeFlags,
} from "@/i18n/config";

export function LanguageSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const switchTo = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    const newPath = segments.join("/") || `/${locale}`;
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365}`;
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-brand-900/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-800 shadow-sm transition hover:border-brand-700/30 hover:bg-brand-50"
      >
        <GlobeIcon className="h-4 w-4" />
        <span>{localeFlags[currentLocale]}</span>
        <ChevronIcon className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-lg">
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition ${
                  l === currentLocale
                    ? "bg-brand-50 font-semibold text-brand-800"
                    : "text-ink-800 hover:bg-brand-50/60"
                }`}
              >
                <span>{localeNames[l]}</span>
                <span className="text-xs uppercase tracking-wider text-ink-700">
                  {localeFlags[l]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
