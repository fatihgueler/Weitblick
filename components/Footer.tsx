import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Logo } from "./Logo";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-brand-900/5 bg-ink-900 text-brand-50">
      <div className="container grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <div>
              <div className="text-lg font-bold">ENOX</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-300">
                Energy Consulting
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-brand-100/80">
            {dict.footer.tagline}
          </p>
          <p className="mt-3 text-xs text-brand-200/60">{dict.common.owner}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            {dict.footer.company}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-100/80">
            <li>
              <Link href={`/${lang}/about`} className="hover:text-white">
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/career`} className="hover:text-white">
                {dict.nav.career}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/contact`} className="hover:text-white">
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            {dict.footer.services}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-100/80">
            <li>
              <Link href={`/${lang}/services#residential`} className="hover:text-white">
                {dict.services.items.residential.title}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/services#commercial`} className="hover:text-white">
                {dict.services.items.commercial.title}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/services#audit`} className="hover:text-white">
                {dict.services.items.audit.title}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/services#certificate`} className="hover:text-white">
                {dict.services.items.certificate.title}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container flex flex-col items-start justify-between gap-3 py-6 text-xs text-brand-200/70 md:flex-row md:items-center">
          <div>© {year} ENOX Energy Consulting. {dict.footer.rights}</div>
          <div className="flex gap-5">
            <Link href={`/${lang}/imprint`} className="hover:text-white">
              {dict.footer.imprint}
            </Link>
            <Link href={`/${lang}/privacy`} className="hover:text-white">
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
