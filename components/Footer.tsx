import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Logo } from "./Logo";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer data-chrome="footer" className="relative overflow-hidden bg-ink-900 text-brand-50">
      <div
        aria-hidden="true"
        className="absolute inset-0 dark-mesh opacity-80"
      />
      <div className="relative">
        <div className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-12">
          <div>
            <Link href={`/${lang}`} className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <div>
                <div className="text-lg font-bold">ENOX</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-300">
                  Energy Consulting
                </div>
              </div>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-100/80 sm:text-base">
              {dict.footer.tagline}
            </p>
            <p className="mt-3 text-xs text-brand-200/60">
              {dict.common.owner}
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">
              {dict.footer.company}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-100/80">
              <li>
                <Link href={`/${lang}/foerdercheck`} className="font-semibold text-brand-300 transition hover:text-white">
                  {dict.nav.foerdercheck}
                </Link>
              </li>
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
            <ul className="mt-4 space-y-2.5 text-sm text-brand-100/80">
              <li>
                <Link
                  href={`/${lang}/services#residential`}
                  className="transition hover:text-white"
                >
                  {dict.services.items.residential.title}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/services#commercial`}
                  className="transition hover:text-white"
                >
                  {dict.services.items.commercial.title}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/services#audit`}
                  className="transition hover:text-white"
                >
                  {dict.services.items.audit.title}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/services#certificate`}
                  className="transition hover:text-white"
                >
                  {dict.services.items.certificate.title}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="container flex flex-col items-start justify-between gap-3 py-5 text-xs text-brand-200/70 md:flex-row md:items-center">
            <div>© {year} ENOX Energy Consulting. {dict.footer.rights}</div>
            <div className="flex flex-wrap gap-5">
              <Link
                href={`/${lang}/imprint`}
                className="transition hover:text-white"
              >
                {dict.footer.imprint}
              </Link>
              <Link
                href={`/${lang}/privacy`}
                className="transition hover:text-white"
              >
                {dict.footer.privacy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
