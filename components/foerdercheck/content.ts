/**
 * Datenmodell & Texte des Fördercheck-Funnels (7 Schritte).
 *
 * Diese Datei wird sowohl vom Funnel (Frontend) als auch von der Mail-API
 * (app/api/foerdercheck/route.ts) genutzt. Reihenfolge der Schritte:
 *   1 Gebäude · 2 Maßnahmen · 3 Baujahr · 4 Nutzung · 5 PLZ/Ort
 *   6 Zeithorizont · 7 Kontaktdaten
 */

export type FunnelChoice = { value: string; label: string; icon?: string };

export type ChoiceId = "building" | "measures" | "year" | "usage" | "timing";

export type ChoiceQuestion = {
  id: ChoiceId;
  kind: "single" | "multi";
  question: string;
  hint?: string;
  options: FunnelChoice[];
};

export const questions: Record<ChoiceId, ChoiceQuestion> = {
  building: {
    id: "building",
    kind: "single",
    question: "Um welches Gebäude handelt es sich?",
    options: [
      { value: "efh", label: "Einfamilienhaus", icon: "Home" },
      { value: "mfh", label: "Mehrfamilienhaus", icon: "Building2" },
      { value: "neubau", label: "Neubau", icon: "Hammer" },
      { value: "sonstiges", label: "Sonstiges", icon: "HelpCircle" },
    ],
  },
  measures: {
    id: "measures",
    kind: "multi",
    question: "Was möchten Sie umsetzen oder prüfen lassen?",
    hint: "Mehrfachauswahl möglich",
    options: [
      { value: "sanierungsfahrplan", label: "Sanierungsfahrplan", icon: "Route" },
      { value: "komplettsanierung", label: "Komplettsanierung", icon: "Wrench" },
      { value: "heizungstausch", label: "Heizungstausch", icon: "Flame" },
      { value: "waermepumpe", label: "Wärmepumpe", icon: "ThermometerSun" },
      { value: "fassadendaemmung", label: "Fassadendämmung", icon: "Layers" },
      { value: "dachdaemmung", label: "Dachdämmung", icon: "Triangle" },
      { value: "fenstertausch", label: "Fenstertausch", icon: "PanelTop" },
      { value: "kellerdeckendaemmung", label: "Kellerdeckendämmung", icon: "Box" },
      { value: "heizlastberechnung", label: "Heizlastberechnung", icon: "Calculator" },
      { value: "hydraulischer_abgleich", label: "Hydraulischer Abgleich", icon: "Gauge" },
      { value: "lueftungskonzept", label: "Lüftungskonzept", icon: "Wind" },
      { value: "energieausweis", label: "Energieausweis", icon: "FileCheck2" },
      { value: "foerdermittel", label: "Fördermittelberatung", icon: "BadgeEuro" },
      { value: "unsicher", label: "Ich bin mir noch unsicher", icon: "HelpCircle" },
    ],
  },
  year: {
    id: "year",
    kind: "single",
    question: "Wann wurde das Gebäude ungefähr gebaut?",
    options: [
      { value: "vor1977", label: "Vor 1977" },
      { value: "1977_1995", label: "1977 bis 1995" },
      { value: "1996_2010", label: "1996 bis 2010" },
      { value: "nach2010", label: "Nach 2010" },
      { value: "neubau", label: "Neubau" },
      { value: "unklar", label: "Weiß ich nicht" },
    ],
  },
  usage: {
    id: "usage",
    kind: "single",
    question: "Wie nutzen Sie das Gebäude?",
    options: [
      { value: "selbst", label: "Selbst bewohnt" },
      { value: "vermietet", label: "Vermietet" },
      { value: "leer", label: "Leerstehend" },
      { value: "kauf", label: "Kauf geplant" },
    ],
  },
  timing: {
    id: "timing",
    kind: "single",
    question: "Wann möchten Sie starten?",
    options: [
      { value: "sofort", label: "So schnell wie möglich" },
      { value: "3monate", label: "In den nächsten 3 Monaten" },
      { value: "3_6monate", label: "In 3 bis 6 Monaten" },
      { value: "spaeter", label: "Später" },
    ],
  },
};

/** Reihenfolge der 5 Auswahl-Schritte (Standort & Kontakt liegen dazwischen/danach). */
export const choiceOrder: ChoiceId[] = [
  "building",
  "measures",
  "year",
  "usage",
  "timing",
];

export const funnelCopy = {
  intro: {
    badge: "Kostenloser Fördercheck",
    title: "Kostenlosen Fördercheck starten",
    text:
      "Beantworten Sie wenige Fragen zu Ihrem Wohngebäude und Ihrer geplanten Maßnahme. Anschließend prüfen wir Ihre Angaben und melden uns mit einer ersten Einschätzung.",
    bullets: ["Gebäude auswählen", "Maßnahme angeben", "Rückmeldung erhalten"],
    start: "Jetzt starten",
    duration: "Dauert ca. 1 Minute · unverbindlich",
  },
  location: {
    question: "Wo befindet sich das Gebäude?",
    plz: "Postleitzahl",
    ort: "Ort",
  },
  contact: {
    question: "Ihre Kontaktdaten",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    phone: "Telefonnummer",
    message: "Nachricht (optional)",
    consent:
      "Mit dem Absenden erklären Sie sich damit einverstanden, dass Ihre Angaben zur Bearbeitung Ihrer Anfrage verarbeitet werden.",
    submit: "Anfrage absenden",
    submitting: "Wird gesendet …",
  },
  success: {
    title: "Vielen Dank für Ihre Anfrage.",
    text:
      "Wir prüfen Ihre Angaben und melden uns in der Regel innerhalb von 24 Stunden mit einer ersten Einschätzung zu Ihrem Wohngebäude und den möglichen nächsten Schritten.",
    assessmentTitle: "Ihre erste Orientierung",
    assessmentIntro: "Auf Basis Ihrer Angaben könnten folgende Themen relevant sein:",
    assessmentDisclaimer:
      "Diese Orientierung ist unverbindlich und stellt kein Förderversprechen dar. Eine verbindliche Einschätzung erfolgt nach Prüfung Ihrer Gebäudedaten.",
    home: "Zurück zur Startseite",
    restart: "Neuen Fördercheck starten",
  },
  ui: {
    step: "Schritt",
    of: "von",
    back: "Zurück",
    next: "Weiter",
    selected: "ausgewählt",
  },
  errors: {
    choice: "Bitte wählen Sie eine Option aus.",
    multi: "Bitte wählen Sie mindestens eine Option aus.",
    plz: "Bitte geben Sie eine gültige Postleitzahl ein.",
    ort: "Bitte geben Sie einen Ort ein.",
    firstName: "Bitte geben Sie Ihren Vornamen ein.",
    lastName: "Bitte geben Sie Ihren Nachnamen ein.",
    email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    phone: "Bitte geben Sie eine Telefonnummer ein.",
    consent: "Bitte stimmen Sie der Verarbeitung zu.",
    generic: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
  },
} as const;

/** Gesamter Funnel-Datensatz (Form-Werte). */
export type FunnelData = {
  building: string;
  measures: string[];
  year: string;
  usage: string;
  plz: string;
  ort: string;
  timing: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
};

function labelOf(q: ChoiceQuestion, value: string): string {
  return q.options.find((o) => o.value === value)?.label ?? value;
}

/** Antworten als lesbare Frage/Antwort-Paare (für die Lead-E-Mail). */
export function summarizeAnswers(data: Partial<FunnelData>): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  if (data.building) out.push({ q: questions.building.question, a: labelOf(questions.building, data.building) });
  if (data.measures?.length)
    out.push({
      q: questions.measures.question,
      a: data.measures.map((v) => labelOf(questions.measures, v)).join(", "),
    });
  if (data.year) out.push({ q: questions.year.question, a: labelOf(questions.year, data.year) });
  if (data.usage) out.push({ q: questions.usage.question, a: labelOf(questions.usage, data.usage) });
  if (data.plz || data.ort) out.push({ q: "Standort", a: `${data.plz ?? ""} ${data.ort ?? ""}`.trim() });
  if (data.timing) out.push({ q: questions.timing.question, a: labelOf(questions.timing, data.timing) });
  return out;
}

/**
 * Regelbasierte, unverbindliche Sofort-Orientierung: leitet aus den Angaben
 * relevante Themen ab (keine Beträge, kein Förderversprechen).
 */
export function assessThemes(data: Partial<FunnelData>): string[] {
  const measures = data.measures ?? [];
  const has = (v: string) => measures.includes(v);
  const themes: string[] = [];
  const add = (t: string) => {
    if (!themes.includes(t)) themes.push(t);
  };

  const oldBuilding = data.year === "vor1977" || data.year === "1977_1995";

  // Sanierungsfahrplan bei Komplettsanierung, Unsicherheit, mehreren Maßnahmen
  // oder älterem Gebäude.
  if (
    has("sanierungsfahrplan") ||
    has("komplettsanierung") ||
    has("unsicher") ||
    measures.length >= 3 ||
    oldBuilding
  ) {
    add("Individueller Sanierungsfahrplan (iSFP)");
  }

  // Heizung / Wärmepumpe → technische Grundlagen.
  if (has("heizungstausch") || has("waermepumpe")) {
    add("Heizlastberechnung");
    add("Hydraulischer Abgleich");
  }
  if (has("waermepumpe")) add("Wärmepumpen-Eignung prüfen");

  // Dichtere Gebäudehülle → Lüftungskonzept.
  if (
    has("fassadendaemmung") ||
    has("dachdaemmung") ||
    has("fenstertausch") ||
    has("kellerdeckendaemmung")
  ) {
    add("Lüftungskonzept");
  }

  // Energieausweis bei Vermietung, Kauf oder expliziter Auswahl.
  if (has("energieausweis") || data.usage === "vermietet" || data.usage === "kauf") {
    add("Energieausweis");
  }

  // Fördermittelprüfung ist immer relevant.
  add("Fördermittelprüfung (BAFA & KfW)");

  return themes;
}
