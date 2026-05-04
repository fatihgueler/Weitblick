import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Logo } from "./Logo";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white">
      <div aria-hidden="true" className="absolute inset-0 dark-mesh opacity-90" />
      <div aria-hidden="true" className="absolute inset-0 grid-bg-dense opacity-50" />

      <div className="relative">
        <div className="container py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <Link href={`/${lang}`} className="flex items-center gap-3">
                <Logo className="h-11 w-11" />
                <div>
                  <div className="text-lg font-bold">
                    En<span className="gradient-text">O</span>X
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-200">
                    Energy · Smart Building
                  </div>
                </div>
              </Link>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                {dict.footer.tagline}
              </p>

              <Link
                href={`/${lang}/contact`}
                className="btn-accent mt-6 inline-flex"
              >
                {dict.footer.cta}
                <span aria-hidden="true">→</span>
              </Link>

              <p className="mt-6 text-xs text-white/40">{dict.common.owner}</p>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">
                {dict.footer.company}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                <li>
                  <Link href={`/${lang}/about`} className="transition hover:text-white">
                    {dict.nav.about}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/career`} className="transition hover:text-white">
                    {dict.nav.career}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/contact`} className="transition hover:text-white">
                    {dict.nav.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">
                {dict.footer.services}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                <li>
                  <Link href={`/${lang}/services#consulting`} className="transition hover:text-white">
                    {dict.services.items.consulting.title}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/services#renovation`} className="transition hover:text-white">
                    {dict.services.items.renovation.title}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/services#smart`} className="transition hover:text-white">
                    {dict.services.items.smart.title}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/services#energy`} className="transition hover:text-white">
                    {dict.services.items.energy.title}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">
                {dict.footer.legal}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                <li>
                  <Link href={`/${lang}/imprint`} className="transition hover:text-white">
                    {dict.footer.imprint}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/privacy`} className="transition hover:text-white">
                    {dict.footer.privacy}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container flex flex-col items-start justify-between gap-3 py-5 text-xs text-white/50 md:flex-row md:items-center">
            <div>© {year} EnOX. {dict.footer.rights}</div>
            <div className="flex flex-wrap items-center gap-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-200">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
                Live
              </span>
              <span>Made in Germany</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
