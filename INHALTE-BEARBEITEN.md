# Inhalte selbst bearbeiten – Website & Fördercheck

Diese Anleitung erklärt, wie du **alle Texte selbst direkt auf GitHub** ändern
kannst – sowohl die **Website** als auch den **Fördercheck-Fragebogen** – ohne
Programmierkenntnisse. Nach dem Speichern wird die Seite **automatisch innerhalb
von 1–2 Minuten** neu veröffentlicht.

> **Wichtig zur Beruhigung:** Die Live-Website kann durch einen Tippfehler
> **nicht abstürzen**. Falls eine Änderung fehlerhaft ist, behält das System
> automatisch die letzte funktionierende Version – im schlimmsten Fall
> erscheint deine Änderung einfach nicht, mehr passiert nicht.

---

## 1. Wo stehen die Texte?

Alle Texte liegen als einfache Dateien im Ordner **`i18n/dictionaries/`** –
**eine Datei pro Sprache**:

| Datei | Sprache |
|-------|---------|
| `de.json` | 🇩🇪 Deutsch (Hauptsprache) |
| `en.json` | 🇬🇧 Englisch |
| `es.json` | 🇪🇸 Spanisch |
| `ru.json` | 🇷🇺 Russisch |
| `zh.json` | 🇨🇳 Chinesisch |

In den meisten Fällen änderst du nur **`de.json`** (Deutsch). Die anderen
Sprachen ändern sich **nicht automatisch mit** – wenn ein Text auch auf
Englisch o. ä. geändert werden soll, musst du ihn in der jeweiligen Datei
ebenfalls anpassen.

### „Wo steht was?" – Landkarte (`de.json`)

| Abschnitt in der Datei | Was es auf der Website ist |
|------------------------|----------------------------|
| `meta` | Seitentitel & Beschreibung (für Google & Browser-Tab) |
| `nav` | Menüpunkte oben (Startseite, Leistungen, Kontakt …) |
| `hero` | Großer Titel & Untertitel ganz oben auf der Startseite |
| `hero.stats` | Die Kennzahlen (Projekte, Länder, Einsparung, Erfahrung) |
| `services` | Überschrift & die 8 Leistungs-Kacheln |
| `about` | Abschnitt „Über ENOX", inkl. Gründer-Zitat & Werte |
| `career` | Karriere-Seite & offene Stellen |
| `contact` | Kontakt-Seite & Formular-Beschriftungen |
| `footer` | Fußzeile unten |

### Fördercheck-Fragebogen (Fragen, Antworten, Ergebnis-Texte)

Die Texte des Förderchecks liegen im Ordner **`components/foerdercheck/locales/`**
– ebenfalls eine Datei pro Sprache (der Fragebogen läuft aktuell auf **Deutsch
& Englisch**):

| Datei | Sprache |
|-------|---------|
| `components/foerdercheck/locales/de.json` | 🇩🇪 Deutsch |
| `components/foerdercheck/locales/en.json` | 🇬🇧 Englisch |

Diese Dateien werden **genauso bearbeitet** wie die Website-Texte. „Wo steht was?":

| Abschnitt in der Datei | Was es im Fragebogen ist |
|------------------------|--------------------------|
| `intro` | Startbildschirm (Titel, Aufzählung, Start-Button) |
| `questions` | Die Fragen und ihre Antwort-Optionen |
| `calculating` | Text während der „Berechnung …" |
| `result` | Ergebnis-Seite (Förderpotenzial) |
| `lead` | Kontaktformular am Ende |
| `success` | Bestätigungs-Seite nach dem Absenden |
| `ui` | Knöpfe wie „Weiter", „Zurück", „Überspringen" |

**Eine zusätzliche Regel beim Fragebogen:** Unter `questions` steht vor jeder
Frage und jeder Antwort ein **kurzes Wort** (z. B. `goal`, `heizung`). Das ist
der interne Name – **nur den Text in den Anführungszeichen ändern** (also
`question`, `help`, `label`, `description`); die kurzen Wörter davor bitte
**nicht** anfassen. Beispiel – hier nur „Heizung / Wärmepumpe" und die
Beschreibung ändern, `heizung`, `label` und `description` stehen lassen:

```json
"heizung": { "label": "Heizung / Wärmepumpe", "description": "Heizungstausch, Wärmepumpe, Solarthermie" }
```

> Die **Förderbeträge und die Berechnung** (wie hoch das geschätzte Potenzial
> ausfällt) liegen bewusst **nicht** hier, sondern in `content.ts`. Änderungen
> daran bitte mit dem Entwickler abstimmen.

---

## 2. Einen Text ändern – Schritt für Schritt

### Der sichere Weg (empfohlen)

So siehst du deine Änderung in einer **Vorschau**, bevor sie live geht:

1. Öffne das Repository auf **GitHub** und gehe in den passenden Ordner –
   `i18n/dictionaries/` für die **Website** oder
   `components/foerdercheck/locales/` für den **Fördercheck**.
2. Klicke auf die Datei, z. B. **`de.json`**.
3. Klicke oben rechts auf das **Stift-Symbol ✏️** („Edit this file").
4. Ändere den gewünschten Text (siehe **Regeln** unten).
5. Klicke oben rechts auf **„Commit changes…"**.
6. Wähle **„Create a new branch for this commit and start a pull request"**
   und klicke **„Propose changes"** → danach **„Create pull request"**.
7. Im Pull Request erscheint nach kurzer Zeit:
   - ein **grünes ✅** der Prüfung „Inhalte prüfen" (Format ist in Ordnung)
   - ein **Vorschau-Link von Vercel** („Visit Preview") – dort siehst du
     deine Änderung, **bevor** sie öffentlich ist.
8. Passt alles? Dann auf **„Merge pull request"** klicken – fertig, die
   Änderung geht live.

### Der schnelle Weg (für kleine Textänderungen)

1.–4. wie oben.
5. Bei **„Commit changes…"** die Option **„Commit directly to the `main`
   branch"** wählen und bestätigen.
6. Die Website aktualisiert sich automatisch in 1–2 Minuten.

> Beim schnellen Weg gibt es **keine Vorschau**. Für größere Änderungen
> lieber den sicheren Weg nehmen.

---

## 3. Die goldenen Regeln beim Bearbeiten

Die Texte stehen immer **zwischen Anführungszeichen**, nach diesem Muster:

```json
"title": "Energie effizient. Gebäude zukunftsfähig.",
```

- ✅ **Nur den Text** zwischen den **zweiten** Anführungszeichen ändern –
  im Beispiel also `Energie effizient. Gebäude zukunftsfähig.`
- ❌ Den Teil **vor** dem Doppelpunkt (`"title"`) **nicht** ändern – das ist
  der „Name" des Feldes, den die Website braucht.
- ❌ **Anführungszeichen `"`, Kommas `,` und Klammern `{ } [ ]` in Ruhe
  lassen.** Sie halten die Struktur zusammen.
- ✅ Am **Zeilenende** muss ein **Komma** stehen – außer es ist die
  **letzte** Zeile vor einer schließenden Klammer `}`.
- ⚠️ Brauchst du ein Anführungszeichen **im Text selbst**, schreibe einen
  Backslash davor: `\"`. Beispiel: `"Das \"Effizienzhaus\" ist …"`.
- Umlaute (ä, ö, ü, ß) und Emojis sind problemlos erlaubt.

---

## 4. Was passiert, wenn etwas nicht stimmt?

Es gibt **zwei Sicherheitsnetze**:

1. **Automatische Prüfung:** Nach jeder Änderung läuft die Prüfung
   „Inhalte prüfen". Ist das Format kaputt, erscheint ein **rotes ❌** mit
   einem Hinweis, in welcher Datei der Fehler steckt. Dann einfach die
   Änderung korrigieren (meist ein fehlendes Komma oder Anführungszeichen).
2. **Vercel hält die alte Version:** Sollte trotzdem etwas nicht bauen,
   bleibt die **letzte funktionierende Website weiter online**. Die Live-Seite
   geht also nie kaputt.

Im Zweifel: Änderung rückgängig machen (auf GitHub unter dem Commit auf
„Revert" klicken) oder kurz beim Entwickler melden.

---

## 5. Tipp: Lokal prüfen (optional, für Technik-Affine)

Wer die Dateien lokal bearbeitet, kann vor dem Hochladen prüfen:

```bash
node scripts/validate-content.mjs
```

Das meldet sofort, ob alle Sprachdateien gültig sind.
