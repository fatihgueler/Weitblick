import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const navItems = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/career`, label: dict.nav.career },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-900/5 bg-white/80 backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <Logo className="h-9 w-9" />
          <div className="leading-tight">
            <div className="text-lg font-bold tracking-tight text-ink-900">
              ENOX
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700">
              Energy Consulting
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-800 transition hover:bg-brand-50 hover:text-brand-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLocale={lang} label={dict.common.language} />
          <Link
            href={`/${lang}/contact`}
            className="hidden btn-primary md:inline-flex"
          >
            {dict.nav.consultation}
          </Link>
        </div>
      </div>

      <nav className="container flex items-center gap-1 overflow-x-auto pb-3 lg:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold text-ink-800 transition hover:bg-brand-50 hover:text-brand-800"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
