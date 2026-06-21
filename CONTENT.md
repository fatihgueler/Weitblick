# Offene Inhalte & Platzhalter

Diese Liste enthält alle Stellen, die vor dem Live-Gang noch mit echten Inhalten
gefüllt werden müssen. Nichts davon ist erfunden – es sind bewusst markierte
Platzhalter.

## 1. Kontaktdaten  →  `lib/content.ts` (Objekt `contact`)

| Feld | Aktueller Platzhalter | Wo sichtbar |
|------|-----------------------|-------------|
| E-Mail   | `[E-Mail-Adresse eintragen]` | Footer, Kontaktseite |
| Telefon  | `[Telefonnummer eintragen]`  | Footer, Kontaktseite |
| Standort | `[Standort eintragen]`       | Footer, Kontaktseite |

> Solange dort eckige Klammern stehen, werden sie als reiner Text angezeigt
> (kein klickbarer `mailto:`/`tel:`-Link). Sobald echte Werte eingetragen sind,
> werden sie automatisch zu Links.

## 2. Impressum  →  `lib/content.ts` (Objekt `impressum`)

Reine Template-Platzhalter. Bitte mit einem rechtssicheren Text ersetzen
(z. B. Impressum-Generator von **e-recht24.de**):

- Name / Firmierung, Anschrift (Straße, PLZ, Ort)
- Telefon, E-Mail
- USt-IdNr. (falls vorhanden)
- Inhaltlich Verantwortliche/r (§ 18 Abs. 2 MStV)
- Berufsbezeichnung / Eintragung (z. B. Energieeffizienz-Expertenliste, Kammer,
  Registernummer) – **nur falls zutreffend, nichts erfinden**

## 3. Datenschutzerklärung  →  `lib/content.ts` (Objekt `datenschutz`)

Reine Template-Platzhalter. Bitte mit einem rechtssicheren Text ersetzen
(z. B. Datenschutz-Generator von **e-recht24.de**). Zu ergänzen u. a.:
Verantwortlicher, Hosting/Server-Logs, Rechtsgrundlagen, Empfänger,
Speicherdauer, Kontakt für Betroffenenrechte.

## 4. E-Mail-Versand (Resend)  →  Environment-Variablen

Damit Fördercheck- und Kontaktformular tatsächlich E-Mails versenden, müssen in
Vercel (bzw. `.env.local`) folgende Variablen gesetzt sein – siehe `.env.example`:

| Variable | Zweck |
|----------|-------|
| `RESEND_API_KEY`  | API-Key von resend.com |
| `LEAD_EMAIL_TO`   | Empfänger der Anfragen (aktuell Beispielwert) |
| `LEAD_EMAIL_FROM` | Verifizierter Absender bei Resend (aktuell Beispielwert) |
| `SITE_URL`        | Öffentliche Basis-URL (für OG/Canonical/Sitemap) |
| `LEAD_WEBHOOK_URL` | optional: CRM/Zapier/Make |

> Ohne diese Werte funktioniert die Seite normal, die Formulare bestätigen den
> Versand, aber es wird **keine** E-Mail verschickt (es erscheint nur eine
> Server-Warnung im Log). **Keine echten Keys ins Repository committen.**

## 5. Bilder / Personenfotos

Es werden bewusst **keine** Stockfotos von Personen verwendet (nur Icons und
Flächen). Falls ein echtes, lizenziertes Foto (z. B. Porträt für „Über mich")
vorhanden ist, kann es ergänzt werden – sonst beim icon-/flächenbasierten Stil
bleiben.

## 6. Keine erfundenen Inhalte

Nicht enthalten (bewusst, da nicht vorhanden/belegt):
- Testimonials / Kundenstimmen
- Zertifikate, Qualifikationen, Mitgliedschaften, Referenzen
- konkrete Kennzahlen/Statistiken

Diese erst ergänzen, wenn belegbare Angaben vorliegen.

---

## Technische Hinweise (für Entwickler)

- **Texte der Website** liegen zentral in `lib/content.ts`.
- **Texte des Förderchecks** liegen in `components/foerdercheck/content.ts`
  (Struktur + Logik). Das Mail-Backend (`app/api/foerdercheck/route.ts`) liest
  dieses Modell – Frage-IDs/Option-Values bitte nicht ohne Backend-Abgleich ändern.
- **Legacy/ungenutzt:** `components/foerdercheck/locales/*.json` werden seit dem
  Redesign nicht mehr verwendet (Funnel-Texte liegen jetzt in `content.ts`). Die
  CI-Prüfung „Inhalte prüfen" validiert sie weiterhin (harmlos). Können bei
  Bedarf entfernt werden.
- **Ungenutzt:** `components/illustrations/*` (alte grüne SVGs) werden nicht mehr
  eingebunden – optionaler Aufräumkandidat.
- **`vercel.json`:** Die CSP-Regel zeigt noch auf den alten Pfad
  `/(de|en|zh|es|ru)/foerdercheck`. Falls das iFrame-Embedding des Förderchecks
  (z. B. Linktree) wieder gebraucht wird, den Pfad auf `/foerdercheck` ändern.
  (Deployment-Konfig – bewusst nicht angefasst.)
