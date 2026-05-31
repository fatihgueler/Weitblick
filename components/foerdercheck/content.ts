// Inhalt & Logik des ENOX-Förderchecks.
//
// WICHTIG FÜR REDAKTEURE:
// Die sichtbaren TEXTE des Förderchecks liegen NICHT in dieser Datei, sondern in
//   components/foerdercheck/locales/de.json   (Deutsch)
//   components/foerdercheck/locales/en.json   (Englisch)
// Dort können sie gefahrlos bearbeitet werden – siehe INHALTE-BEARBEITEN.md.
//
// Diese Datei enthält nur die STRUKTUR (Reihenfolge der Fragen, interne Werte,
// Icons) und die BERECHNUNGSLOGIK. Beides bitte unverändert lassen.

import deText from "./locales/de.json";
import enText from "./locales/en.json";

export type FunnelLocale = "de" | "en";

export type IconKey =
  | "heat"
  | "insulation"
  | "window"
  | "solar"
  | "renovation"
  | "buy"
  | "question"
  | "house"
  | "building"
  | "apartment"
  | "commercial"
  | "owner"
  | "owner-plan"
  | "tenant"
  | "old"
  | "mid"
  | "new"
  | "gas"
  | "oil"
  | "district"
  | "heatpump"
  | "power"
  | "more"
  | "rocket"
  | "calendar"
  | "clock"
  | "info"
  | "wallet"
  | "bank"
  | "open";

export type OptionDef = {
  value: string;
  label: string;
  description?: string;
  icon?: IconKey;
};

export type QuestionDef = {
  id: string;
  type: "single" | "multi";
  question: string;
  help?: string;
  options: OptionDef[];
  /** Mindestauswahl bei Multi-Select, Standard 1 */
  min?: number;
};

export type FunnelContent = {
  intro: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    bullets: string[];
    start: string;
    duration: string;
    privacy: string;
  };
  questions: QuestionDef[];
  calculating: {
    title: string;
    steps: string[];
  };
  result: {
    badge: string;
    title: string;
    upTo: string;
    perYear: string;
    breakdownTitle: string;
    items: { bafa: string; kfw: string; tax: string };
    disclaimer: string;
    cta: string;
    secondary: string;
  };
  lead: {
    title: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    phoneHint: string;
    consent: string;
    submit: string;
    submitting: string;
    securenote: string;
    errors: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      consent: string;
      generic: string;
    };
  };
  success: {
    badge: string;
    title: string;
    subtitle: string;
    bookTitle: string;
    bookText: string;
    book: string;
    nextTitle: string;
    next: string[];
    restart: string;
    resultLabel: string;
  };
  ui: {
    step: string;
    of: string;
    back: string;
    continue: string;
    multiHint: string;
    selectedHint: string;
    skip: string;
    resumeTitle: string;
    resumeText: string;
    resumeYes: string;
    resumeNo: string;
  };
};

/* -------------------------------------------------------------------------- */
/*  Struktur des Fragebogens – NICHT vom Klienten bearbeiten.                  */
/*  Reihenfolge, interne Werte (value) und Icons. Die Texte dazu stehen in     */
/*  den JSON-Dateien unter ./locales/ und werden unten zusammengeführt.        */
/* -------------------------------------------------------------------------- */

type QuestionSkeleton = {
  id: string;
  type: "single" | "multi";
  min?: number;
  options: { value: string; icon?: IconKey }[];
};

const questionSkeleton: QuestionSkeleton[] = [
  {
    id: "goal",
    type: "multi",
    options: [
      { value: "heizung", icon: "heat" },
      { value: "daemmung", icon: "insulation" },
      { value: "fenster", icon: "window" },
      { value: "solar", icon: "solar" },
      { value: "komplett", icon: "renovation" },
      { value: "kaufen", icon: "buy" },
      { value: "unklar", icon: "question" },
    ],
  },
  {
    id: "building",
    type: "single",
    options: [
      { value: "efh", icon: "house" },
      { value: "mfh", icon: "building" },
      { value: "etw", icon: "apartment" },
      { value: "gewerbe", icon: "commercial" },
    ],
  },
  {
    id: "owner",
    type: "single",
    options: [
      { value: "ja", icon: "owner" },
      { value: "kauf", icon: "owner-plan" },
      { value: "nein", icon: "tenant" },
    ],
  },
  {
    id: "year",
    type: "single",
    options: [
      { value: "vor1979", icon: "old" },
      { value: "1979_2001", icon: "mid" },
      { value: "nach2002", icon: "new" },
      { value: "unklar", icon: "question" },
    ],
  },
  {
    id: "heating",
    type: "single",
    options: [
      { value: "gas", icon: "gas" },
      { value: "oel", icon: "oil" },
      { value: "fernwaerme", icon: "district" },
      { value: "waermepumpe", icon: "heatpump" },
      { value: "strom", icon: "power" },
      { value: "sonstiges", icon: "more" },
    ],
  },
  {
    id: "timing",
    type: "single",
    options: [
      { value: "sofort", icon: "rocket" },
      { value: "3monate", icon: "calendar" },
      { value: "jahr", icon: "clock" },
      { value: "info", icon: "info" },
    ],
  },
  {
    id: "finance",
    type: "single",
    options: [
      { value: "eigenkapital", icon: "wallet" },
      { value: "kredit", icon: "bank" },
      { value: "offen", icon: "open" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Texte (aus den JSON-Dateien) + Zusammenführung mit der Struktur            */
/* -------------------------------------------------------------------------- */

type OptionText = { label: string; description?: string };
type QuestionText = {
  question: string;
  help?: string;
  options: Record<string, OptionText>;
};

/** Form der Dateien in ./locales – nur Texte, keine Struktur/Logik. */
type FunnelText = {
  intro: FunnelContent["intro"];
  questions: Record<string, QuestionText>;
  calculating: FunnelContent["calculating"];
  result: FunnelContent["result"];
  lead: FunnelContent["lead"];
  success: FunnelContent["success"];
  ui: FunnelContent["ui"];
};

/** Führt Struktur (Skeleton) und Texte (JSON) zu fertigem Funnel-Inhalt zusammen. */
function assemble(text: FunnelText): FunnelContent {
  const questions: QuestionDef[] = questionSkeleton.map((q) => {
    const qt = text.questions[q.id];
    const options: OptionDef[] = q.options.map((o) => {
      const ot = qt?.options?.[o.value];
      return {
        value: o.value,
        label: ot?.label ?? "",
        description: ot?.description,
        icon: o.icon,
      };
    });
    return {
      id: q.id,
      type: q.type,
      question: qt?.question ?? "",
      help: qt?.help,
      min: q.min,
      options,
    };
  });

  return {
    intro: text.intro,
    questions,
    calculating: text.calculating,
    result: text.result,
    lead: text.lead,
    success: text.success,
    ui: text.ui,
  };
}

const de: FunnelContent = assemble(deText);
const en: FunnelContent = assemble(enText);

export const funnelContent: Record<FunnelLocale, FunnelContent> = { de, en };

export function getFunnelContent(locale: string): {
  locale: FunnelLocale;
  content: FunnelContent;
} {
  const l: FunnelLocale = locale === "en" ? "en" : "de";
  return { locale: l, content: funnelContent[l] };
}

/* -------------------------------------------------------------------------- */
/*  Förderpotenzial-Schätzung                                                 */
/* -------------------------------------------------------------------------- */

export type Answers = Record<string, string[]>;

export type Estimate = {
  total: number;
  bafa: number;
  kfw: number;
  tax: number;
};

const GOAL_GRANTS: Record<string, number> = {
  heizung: 21000,
  daemmung: 12000,
  fenster: 6000,
  solar: 3000,
  komplett: 37500,
  kaufen: 24000,
  unklar: 4000,
};

const BUILDING_FACTOR: Record<string, number> = {
  efh: 1,
  etw: 0.8,
  mfh: 1.8,
  gewerbe: 1.4,
};

const YEAR_BONUS: Record<string, number> = {
  vor1979: 0.18,
  "1979_2001": 0.08,
  nach2002: 0,
  unklar: 0.05,
};

const OWNER_FACTOR: Record<string, number> = {
  ja: 1,
  kauf: 0.9,
  nein: 0.25,
};

const CAP = 90000;

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

/** Grobe, bewusst „bis zu"-orientierte Schätzung des Förderpotenzials. */
export function computeEstimate(answers: Answers): Estimate {
  const goals = answers.goal ?? [];
  let base = goals.reduce((sum, g) => sum + (GOAL_GRANTS[g] ?? 0), 0);
  if (base === 0) base = GOAL_GRANTS.unklar;

  const building = answers.building?.[0];
  const year = answers.year?.[0];
  const owner = answers.owner?.[0];

  const buildingFactor = BUILDING_FACTOR[building ?? "efh"] ?? 1;
  const yearBonus = YEAR_BONUS[year ?? "unklar"] ?? 0;
  const ownerFactor = OWNER_FACTOR[owner ?? "ja"] ?? 1;

  let total = base * buildingFactor * (1 + yearBonus) * ownerFactor;
  total = Math.min(roundTo(total, 500), CAP);

  const bafa = roundTo(total * 0.55, 100);
  const kfw = roundTo(total * 0.34, 100);
  const tax = Math.max(total - bafa - kfw, 0);

  return { total, bafa, kfw, tax };
}

export function formatEuro(value: number, locale: FunnelLocale): string {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
