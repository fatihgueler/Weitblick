# ENOX – Internationale Energieberatung

Mehrsprachige Marketing-Website für die internationale Energieberatung **ENOX**
(Inhaber: **Enes Talha Aktürk**). Vorbild und Referenz: greenox-group.de.

## Sprachen

Die Website unterstützt fünf Sprachen, die über den Sprachumschalter im Header
oder über das `/{locale}`-Präfix in der URL gewählt werden können:

| Code | Sprache    |
| ---- | ---------- |
| `de` | Deutsch    |
| `en` | English    |
| `zh` | 中文       |
| `es` | Español    |
| `ru` | Русский    |

Die Übersetzungen liegen in [`i18n/dictionaries`](./i18n/dictionaries/).

## Tech-Stack

- [Next.js 14](https://nextjs.org/) (App Router) mit Locale-Routing
- [Tailwind CSS](https://tailwindcss.com/) für das eigene Eco-/Green-Theme
- TypeScript, React Server Components

## Entwicklung

```bash
npm install
npm run dev
```

Die App ist dann unter http://localhost:3000 erreichbar – ein Aufruf der
Wurzel-URL leitet automatisch auf die bevorzugte Sprache des Browsers weiter.

## Build

```bash
npm run build
npm start
```

## Struktur

```
app/
  [lang]/             Locale-spezifische Seiten (Home, Services, About, Career, Contact, Imprint, Privacy)
components/           Header, Footer, LanguageSwitcher, ServiceCard, Logo
i18n/                 Konfiguration und JSON-Wörterbücher
middleware.ts         Locale-Detection & Redirect von `/`
```
