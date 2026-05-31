import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const navItems = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/career`, label: dict.nav.career },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const foerderHref = `/${lang}/foerdercheck`;

  return (
    <header
      data-chrome="header"
      className="sticky top-0 z-40 border-b border-brand-900/5 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
    >
      <div className="container flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2.5 transition active:scale-95 sm:gap-3"
          aria-label="ENOX"
        >
          <Logo className="h-9 w-9 sm:h-10 sm:w-10" />
          <div className="leading-tight">
            <div className="text-base font-bold tracking-tight text-ink-900 sm:text-lg">
              ENOX
            </div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-brand-700 sm:text-[10px]">
              Energy Consulting
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher
              currentLocale={lang}
              label={dict.common.language}
            />
          </div>
          <Link
            href={foerderHref}
            className="hidden items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-bold text-ink-900 shadow-soft transition hover:bg-accent-400 hover:shadow-lift active:scale-95 lg:inline-flex"
          >
            {dict.nav.foerdercheck}
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="btn-secondary hidden lg:inline-flex"
          >
            {dict.nav.consultation}
          </Link>
          <MobileMenu
            navItems={navItems}
            lang={lang}
            consultationLabel={dict.nav.consultation}
            languageLabel={dict.common.language}
            highlightHref={foerderHref}
            highlightLabel={dict.nav.foerdercheck}
          />
        </div>
      </div>
    </header>
  );
}
