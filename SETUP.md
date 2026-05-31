# ENOX Fördercheck – Einrichtung & Go-Live

Diese Anleitung bringt den Fördercheck in ~15 Minuten online und verknüpft ihn
mit dem Linktree von Enes.

---

## 1. Was ist der Fördercheck?

Ein mehrstufiger, animierter Fragebogen unter **`/{sprache}/foerdercheck`**
(z. B. `https://deine-domain.de/de/foerdercheck`), der

1. den Nutzer durch 7 Fragen führt (Vorhaben, Gebäude, Eigentümer, Baujahr,
   Heizung, Zeithorizont, Finanzierung),
2. ein geschätztes **Förderpotenzial** (BAFA / KfW / Steuerbonus) anzeigt,
3. **Name, E-Mail & Telefon** abfragt,
4. die Anfrage **per E-Mail an Enes** schickt und
5. einen **Termin-Button** (Calendly/Cal.com) anbietet.

Ohne Konfiguration läuft alles durch – die Lead-Daten landen dann nur im
Server-Log. Für den Echtbetrieb sind die Schritte unten nötig.

---

## 2. Deployment auf Vercel

1. Repository auf **[vercel.com](https://vercel.com)** importieren
   (New Project → GitHub → `fatihgueler/Enox` → Branch wählen).
2. Framework wird automatisch als **Next.js** erkannt – nichts ändern.
   (`vercel.json` setzt bereits Region `fra1` = Frankfurt und die iFrame-Freigabe
   für Linktree.)
3. Unter **Settings → Environment Variables** die Werte aus `.env.example`
   eintragen (siehe Schritt 3).
4. **Deploy** klicken. Danach ist die Seite z. B. unter
   `https://enox-xxx.vercel.app/de/foerdercheck` erreichbar.
5. **Domain verbinden** (Settings → Domains), z. B.
   `foerdercheck.enox.de` → und diese als `SITE_URL` setzen.

---

## 3. Umgebungsvariablen

| Variable           | Pflicht | Zweck                                                        |
| ------------------ | :-----: | ----------------------------------------------------------- |
| `SITE_URL`         |   ✅    | Basis-URL für OG-Bilder & Linktree-Vorschau                 |
| `RESEND_API_KEY`   |   ✅    | E-Mail-Versand der Leads über Resend                        |
| `LEAD_EMAIL_TO`    |   ✅    | Empfänger (Enes' E-Mail). Mehrere mit Komma.                |
| `LEAD_EMAIL_FROM`  |   ✅    | Verifizierter Absender bei Resend (z. B. `mail@enox.de`)    |
| `BOOKING_URL`      |   –     | Termin-Link (Calendly/Cal.com). Leer → führt zu `/contact`. |
| `LEAD_WEBHOOK_URL` |   –     | Optionaler Webhook an CRM / Zapier / Make                   |

### E-Mail in 3 Schritten (Resend)

1. Account auf **[resend.com](https://resend.com)** anlegen.
2. **Domain verifizieren** (Resend führt durch die DNS-Einträge) – damit Mails
   nicht im Spam landen.
3. **API-Key** erstellen → als `RESEND_API_KEY` hinterlegen,
   `LEAD_EMAIL_FROM` auf eine Adresse deiner verifizierten Domain setzen,
   `LEAD_EMAIL_TO` auf Enes' Posteingang.

> Alternativ lässt sich der E-Mail-Block in `app/api/foerdercheck/route.ts`
> leicht auf einen anderen Anbieter (Postmark, SendGrid …) umstellen – es ist
> nur ein `fetch`-Aufruf.

---

## 4. In Linktree einbinden

Linktree zeigt externe Seiten in der Bio als **normalen Link** (kein iFrame nötig):

1. In Linktree **„Add link"** wählen.
2. URL eintragen: `https://deine-domain.de/de/foerdercheck`
3. Titel z. B. **„🔍 Kostenloser Fördercheck – bis zu 70 % Zuschuss"**.

Das beim Teilen angezeigte Vorschaubild kommt automatisch von der Seite
(`opengraph-image`), sobald `SITE_URL` gesetzt ist.

### Echtes Einbetten (iFrame)

Für Seiten, die iFrames erlauben (eigene Website, Notion, manche
Linktree-Alternativen), den **Embed-Modus** nutzen – blendet Header/Footer aus:

```html
<iframe
  src="https://deine-domain.de/de/foerdercheck?embed=1"
  style="width:100%;height:760px;border:0;border-radius:24px"
  loading="lazy"
  title="ENOX Fördercheck">
</iframe>
```

Die erlaubten Einbettungs-Hosts stehen in `vercel.json`
(`frame-ancestors`) und können dort erweitert werden.

---

## 5. Lokal entwickeln

```bash
npm install
cp .env.example .env.local   # Werte eintragen
npm run dev                  # http://localhost:3000/de/foerdercheck
```

---

## 6. Inhalte anpassen

- **Fragen, Antworten, Texte (DE/EN):** `components/foerdercheck/content.ts`
- **Förderbeträge / Schätzlogik:** `computeEstimate` in derselben Datei
- **Icons:** `components/foerdercheck/icons.tsx`
- **Ablauf / Design:** `components/foerdercheck/FoerderCheck.tsx`
- **E-Mail-Text & Versand:** `app/api/foerdercheck/route.ts`

> Hinweis: Die Förderbeträge sind bewusst grobe „bis zu"-Schätzungen für die
> Lead-Generierung – sie ersetzen keine verbindliche Förderberatung (steht so
> auch im Disclaimer auf der Ergebnisseite).
