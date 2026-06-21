# Weitblick Energieberatung

Conversion-Landingpage für eine **Energieberatung für Wohngebäude**
(Weitblick Energieberatung). Zentrales Element ist der **Fördercheck** – ein
schrittweiser Fragebogen zur Lead-Generierung, immer erreichbar über einen
Sticky-Launcher und einen Slide-over-Drawer.

## Tech-Stack

- [Next.js 16](https://nextjs.org/) (App Router, React Server Components)
- [Tailwind CSS v3](https://tailwindcss.com/) – Designsystem (Navy + Türkis)
- shadcn-Style UI (Radix: Dialog/Sheet, Accordion), [lucide-react](https://lucide.dev/) Icons
- Formulare: react-hook-form + zod
- E-Mail-Versand: [Resend](https://resend.com/) (per `fetch`, ohne Extra-Paket)

## Seitenstruktur (Deutsch, flache Slugs)

```
/                Startseite (Hero, Vertrauen, Nutzen, Fördercheck, Leistungen,
                 Zielgruppen, Ablauf, Über-mich, FAQ, Abschluss-CTA)
/foerdercheck    Fördercheck-Funnel (8 Schritte) als eigene Route
/leistungen      Leistungen (Übersicht + Detailblöcke)
/ueber-mich      Über mich
/faq             Häufige Fragen
/kontakt         Kontaktformular
/impressum       Impressum (Platzhalter – siehe CONTENT.md)
/datenschutz     Datenschutz (Platzhalter – siehe CONTENT.md)
```

## Inhalte pflegen

- **Website-Texte:** zentral in [`lib/content.ts`](./lib/content.ts).
- **Fördercheck-Texte/-Struktur:** [`components/foerdercheck/content.ts`](./components/foerdercheck/content.ts).
- **Kontaktdaten & Rechtstexte:** Platzhalter in `lib/content.ts` – alle offenen
  Punkte sind in [`CONTENT.md`](./CONTENT.md) gelistet.
- Anleitung zum Bearbeiten: [`INHALTE-BEARBEITEN.md`](./INHALTE-BEARBEITEN.md).

## E-Mail / Environment

Damit Fördercheck- und Kontaktformular E-Mails versenden, müssen `RESEND_API_KEY`,
`LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` gesetzt sein (siehe [`.env.example`](./.env.example)).
Ohne diese Werte läuft die Seite normal, versendet aber keine Mail.

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
```

## Barrierefreiheit & SEO

`<html lang="de">`, Skip-Link, semantisches HTML, WCAG-AA-Kontraste,
Tastaturbedienung, `prefers-reduced-motion`. SEO: `generateMetadata` je Seite,
`app/sitemap.ts`, `app/robots.ts`, JSON-LD (ProfessionalService + FAQPage),
Open-Graph-Bild.
