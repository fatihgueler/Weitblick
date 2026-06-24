import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ContactLink } from "@/components/ContactLink";
import { nav, footer, contact, routes, site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-ink-300">
      {/* Horizont-Akzent + Morgenlicht am oberen Rand. */}
      <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-[8%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(242,180,65,0.18)_0%,rgba(242,180,65,0)_70%)]"
      />
      <div className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.6fr_1fr_1.2fr] lg:gap-12">
        {/* Marke + Kurztext */}
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-400">
            {footer.short}
          </p>
          {/* Nachweis: gelistet für Förderprogramme des Bundes. */}
          <div className="mt-6 inline-flex items-center rounded-xl bg-white p-3 shadow-soft">
            <img
              src="/eee-experte.svg"
              alt="Energieeffizienz-Experte für Förderprogramme des Bundes"
              width={200}
              height={56}
              className="h-12 w-auto"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer-Navigation">
          <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-teal-300">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            {footer.legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kontakt */}
        <div>
          <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-teal-300">
            Kontakt
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-teal-300" strokeWidth={2} />
              <ContactLink type="email" value={contact.email} className="hover:text-white" />
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-teal-300" strokeWidth={2} />
              <ContactLink type="phone" value={contact.phone} className="hover:text-white" />
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-teal-300" strokeWidth={2} />
              <span className="opacity-80">{contact.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container flex flex-col items-start justify-between gap-3 py-5 text-xs text-ink-400 md:flex-row md:items-center">
          <div>
            © {year} {site.name}
          </div>
          <div className="flex flex-wrap gap-5">
            {footer.legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
