# Inhalte selbst bearbeiten

Diese Anleitung erklärt, wie du die **Texte der Website** und des
**Förderchecks** selbst änderst – auch ohne Programmierkenntnisse.

> **Beruhigung:** Die Live-Website kann durch einen Tippfehler **nicht
> abstürzen**. Wenn eine Änderung fehlerhaft ist, schlägt der automatische Build
> fehl und die **letzte funktionierende Version bleibt online**. Nutze am besten
> den „sicheren Weg" mit Vorschau (siehe unten).

---

## 1. Wo stehen die Texte?

| Datei | Inhalt |
|-------|--------|
| `lib/content.ts` | **Alle Website-Texte** (Startseite, Leistungen, Über mich, FAQ, Kontakt, Footer, Impressum-/Datenschutz-Platzhalter, Kontaktdaten) |
| `components/foerdercheck/content.ts` | **Texte & Fragen des Förderchecks** (8 Schritte) |

Die Kontaktdaten (E-Mail, Telefon, Standort) stehen in `lib/content.ts` ganz oben
im Abschnitt `contact`. Weitere offene Platzhalter sind in `CONTENT.md` gelistet.

---

## 2. Die goldenen Regeln

Die Texte stehen immer **zwischen Anführungszeichen**, nach diesem Muster:

```ts
title: "Energieberatung, Förderung und Sanierungsplanung für Ihr Wohngebäude",
```

- ✅ **Nur den Text** zwischen den Anführungszeichen ändern.
- ❌ Den Teil **vor** dem Doppelpunkt (`title:`) **nicht** ändern – das ist der
  interne Name, den die Seite braucht.
- ❌ **Anführungszeichen `"`, Kommas `,`, Klammern `{ } [ ]` und Backticks
  `` ` `` in Ruhe lassen.** Sie halten die Struktur zusammen.
- ⚠️ Brauchst du ein Anführungszeichen **im Text selbst**, nimm ein Apostroph
  `’` oder schreibe einen Backslash davor: `\"`.
- Umlaute (ä, ö, ü, ß) sind problemlos erlaubt.

**Beim Fördercheck zusätzlich:** Ändere nur die `label`- und `question`-Texte.
Die kurzen internen Werte davor (z. B. `value: "efh"`) bitte **nicht** anfassen –
sie verbinden die Fragen mit der E-Mail-Auswertung.

---

## 3. Schritt für Schritt (sicherer Weg mit Vorschau)

1. Datei auf **GitHub** öffnen (`lib/content.ts` bzw.
   `components/foerdercheck/content.ts`).
2. Oben rechts auf das **Stift-Symbol ✏️** klicken.
3. Text ändern (siehe Regeln oben).
4. **„Commit changes…"** → **„Create a new branch … and start a pull request"**.
5. Im Pull Request erscheint nach kurzer Zeit ein **Vorschau-Link von Vercel**
   („Visit Preview") – dort die Änderung prüfen, **bevor** sie live ist.
6. Passt alles? **„Merge pull request"** – fertig.

> Schlägt der Build im Pull Request fehl (rotes ❌), stimmt etwas mit der
> Struktur nicht (meist ein fehlendes Komma oder Anführungszeichen). Dann die
> Änderung korrigieren oder kurz beim Entwickler melden. Die Live-Seite bleibt
> in der Zwischenzeit unverändert online.
