"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  type Locale,
  locales,
  localeNames,
  localeFlags,
} from "@/i18n/config";

type NavItem = { href: string; label: string };

export function MobileMenu({
  navItems,
  lang,
  consultationLabel,
  languageLabel,
  highlightHref,
  highlightLabel,
}: {
  navItems: NavItem[];
  lang: Locale;
  consultationLabel: string;
  languageLabel: string;
  highlightHref?: string;
  highlightLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  const switchLang = (next: Locale) => {
    const segments = pathname.split("/");
    segments[1] = next;
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=${60 * 60 * 24 * 365}`;
    window.location.href = segments.join("/") || `/${next}`;
  };

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-900/10 bg-white text-ink-900 shadow-soft transition active:scale-95 lg:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="14" y2="17" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm animate-fade-in"
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(92vw,380px)] flex-col bg-white shadow-2xl">
            <div className="flex h-20 items-center justify-between px-6">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                ENOX
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-900/10 bg-white text-ink-900 transition active:scale-95"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 pb-4">
              {highlightHref && highlightLabel && (
                <Link
                  href={highlightHref}
                  onClick={() => setOpen(false)}
                  className="mb-3 flex items-center justify-between rounded-2xl bg-accent-500 px-4 py-4 text-lg font-bold text-ink-900 shadow-soft transition active:scale-[0.98]"
                >
                  <span>{highlightLabel}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              )}
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="nav-link-mobile"
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-brand-700">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 px-2">
                <div className="label mb-3">{languageLabel}</div>
                <div className="grid grid-cols-2 gap-2">
                  {locales.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => switchLang(l)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                        l === lang
                          ? "border-brand-700 bg-brand-50 text-brand-900"
                          : "border-brand-900/10 bg-white text-ink-800 hover:border-brand-700/30 hover:bg-brand-50"
                      }`}
                    >
                      <span>{localeNames[l]}</span>
                      <span className="text-xs uppercase tracking-wider text-ink-500">
                        {localeFlags[l]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            <div className="border-t border-brand-900/5 p-5">
              <Link
                href={`/${lang}/contact`}
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                {consultationLabel}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
