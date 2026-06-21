"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, ctaLabels, routes, site } from "@/lib/content";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useFoerdercheck } from "@/components/foerdercheck/provider";

export function Header() {
  const pathname = usePathname();
  const { open } = useFoerdercheck();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobilmenü bei Routenwechsel schließen + Escape-Handling.
  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === routes.home ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-md transition-shadow",
        scrolled ? "border-navy-900/8 shadow-soft" : "border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link
          href={routes.home}
          aria-label={`${site.name} – Startseite`}
          className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          <Logo />
        </Link>

        {/* Desktop-Navigation */}
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "nav-link",
                isActive(item.href) && "bg-navy-50 text-navy-900",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => open("header")}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {ctaLabels.foerdercheck}
          </Button>

          {/* Mobile: Burger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-navy-900/10 text-navy-900 transition hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile-Navigation */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t border-navy-900/8 bg-white px-5 pb-6 pt-2 lg:hidden"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link-mobile"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            size="block"
            className="mt-4"
            onClick={() => {
              setMobileOpen(false);
              open("mobile-menu");
            }}
          >
            {ctaLabels.foerdercheck}
          </Button>
        </div>
      )}
    </header>
  );
}
