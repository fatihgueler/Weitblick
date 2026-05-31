// Inhalt & Logik des ENOX-Förderchecks.
// Eigenständige, mehrsprachige Funnel-Daten – bewusst getrennt von den großen
// Seiten-Wörterbüchern, damit der Funnel kompakt und wartbar bleibt.

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
/*  Inhalt: Deutsch                                                           */
/* -------------------------------------------------------------------------- */

const de: FunnelContent = {
  intro: {
    badge: "Kostenlos · Unverbindlich · 60 Sekunden",
    title: "Welche Förderung steht dir zu?",
    highlight: "Bis zu 70 % Zuschuss",
    subtitle:
      "Finde in unter einer Minute heraus, welche staatlichen Förderungen (BAFA, KfW & Steuerbonus) für dein Vorhaben realistisch sind – persönlich ausgewertet von ENOX.",
    bullets: [
      "Auf deine Immobilie zugeschnitten",
      "Geprüft nach aktuellen Förderprogrammen",
      "Persönliche Auswertung durch Enes Talha Aktürk",
    ],
    start: "Fördercheck starten",
    duration: "Dauert ca. 60 Sekunden",
    privacy: "Keine Kosten. Deine Daten werden DSGVO-konform behandelt.",
  },
  questions: [
    {
      id: "goal",
      type: "multi",
      question: "Worum geht es bei deinem Vorhaben?",
      help: "Mehrfachauswahl möglich – wähle alles, was zutrifft.",
      options: [
        { value: "heizung", label: "Heizung / Wärmepumpe", description: "Heizungstausch, Wärmepumpe, Solarthermie", icon: "heat" },
        { value: "daemmung", label: "Dämmung & Sanierung", description: "Dach, Fassade, Kellerdecke", icon: "insulation" },
        { value: "fenster", label: "Fenster & Türen", description: "Austausch, neue Verglasung", icon: "window" },
        { value: "solar", label: "Photovoltaik & Speicher", description: "Solaranlage, Stromspeicher, Wallbox", icon: "solar" },
        { value: "komplett", label: "Komplettsanierung", description: "Sanierung zum Effizienzhaus", icon: "renovation" },
        { value: "kaufen", label: "Kauf / Neubau", description: "Erwerb oder Bau einer Immobilie", icon: "buy" },
        { value: "unklar", label: "Noch unklar", description: "Ich möchte mich erst informieren", icon: "question" },
      ],
    },
    {
      id: "building",
      type: "single",
      question: "Um welche Art von Gebäude geht es?",
      options: [
        { value: "efh", label: "Einfamilienhaus", icon: "house" },
        { value: "mfh", label: "Mehrfamilienhaus", icon: "building" },
        { value: "etw", label: "Eigentumswohnung", icon: "apartment" },
        { value: "gewerbe", label: "Gewerbe / Nichtwohngebäude", icon: "commercial" },
      ],
    },
    {
      id: "owner",
      type: "single",
      question: "In welcher Rolle bist du bei der Immobilie?",
      options: [
        { value: "ja", label: "Ich bin Eigentümer:in", icon: "owner" },
        { value: "kauf", label: "Ich plane den Kauf", icon: "owner-plan" },
        { value: "nein", label: "Ich bin Mieter:in", description: "Hinweis: Förderungen erhalten meist Eigentümer", icon: "tenant" },
      ],
    },
    {
      id: "year",
      type: "single",
      question: "Aus welchem Baujahr stammt das Gebäude?",
      help: "Das Alter beeinflusst, welche Programme infrage kommen.",
      options: [
        { value: "vor1979", label: "Vor 1979", description: "Oft besonders hohe Förderquoten", icon: "old" },
        { value: "1979_2001", label: "1979 – 2001", icon: "mid" },
        { value: "nach2002", label: "Nach 2002", icon: "new" },
        { value: "unklar", label: "Weiß ich nicht genau", icon: "question" },
      ],
    },
    {
      id: "heating",
      type: "single",
      question: "Wie wird aktuell geheizt?",
      options: [
        { value: "gas", label: "Gas", icon: "gas" },
        { value: "oel", label: "Öl", icon: "oil" },
        { value: "fernwaerme", label: "Fernwärme", icon: "district" },
        { value: "waermepumpe", label: "Wärmepumpe", icon: "heatpump" },
        { value: "strom", label: "Strom / Nachtspeicher", icon: "power" },
        { value: "sonstiges", label: "Sonstiges / Unklar", icon: "more" },
      ],
    },
    {
      id: "timing",
      type: "single",
      question: "Wann möchtest du dein Vorhaben umsetzen?",
      options: [
        { value: "sofort", label: "So schnell wie möglich", icon: "rocket" },
        { value: "3monate", label: "In den nächsten 3 Monaten", icon: "calendar" },
        { value: "jahr", label: "Innerhalb dieses Jahres", icon: "clock" },
        { value: "info", label: "Erst mal nur informieren", icon: "info" },
      ],
    },
    {
      id: "finance",
      type: "single",
      question: "Wie möchtest du finanzieren?",
      help: "Optional – hilft uns, die passenden Programme zu finden.",
      options: [
        { value: "eigenkapital", label: "Überwiegend Eigenkapital", icon: "wallet" },
        { value: "kredit", label: "Förderkredit / Finanzierung", icon: "bank" },
        { value: "offen", label: "Noch offen", icon: "open" },
      ],
    },
  ],
  calculating: {
    title: "Wir berechnen dein Förderpotenzial …",
    steps: [
      "Angaben werden ausgewertet",
      "BAFA- & KfW-Programme werden abgeglichen",
      "Steuerliche Vorteile werden geprüft",
      "Dein persönliches Ergebnis wird erstellt",
    ],
  },
  result: {
    badge: "Dein Ergebnis steht fest",
    title: "Gute Nachrichten – für dein Vorhaben ist Förderung drin!",
    upTo: "Bis zu",
    perYear: "an möglichen Zuschüssen & Förderkrediten",
    breakdownTitle: "So setzt sich dein Potenzial zusammen",
    items: {
      bafa: "BAFA-Zuschuss (Einzelmaßnahmen)",
      kfw: "KfW-Förderkredit & Tilgungszuschuss",
      tax: "Steuerlicher Bonus (§ 35c EStG)",
    },
    disclaimer:
      "Unverbindliche Schätzung auf Basis deiner Angaben. Die tatsächliche Förderhöhe hängt von der individuellen Prüfung und den jeweils aktuellen Förderbedingungen ab.",
    cta: "Förderpotenzial jetzt sichern",
    secondary: "Ergebnis per E-Mail erhalten",
  },
  lead: {
    title: "Wohin dürfen wir dein Förderergebnis senden?",
    subtitle:
      "Enes Talha Aktürk wertet deinen Fördercheck persönlich aus und meldet sich mit den konkreten nächsten Schritten.",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail-Adresse",
    phone: "Telefonnummer",
    phoneHint: "Für eine schnelle, persönliche Rückmeldung.",
    consent:
      "Ich bin damit einverstanden, dass ENOX (Enes Talha Aktürk) meine Angaben zur Beratung verarbeitet und mich kontaktiert. Hinweise in der Datenschutzerklärung.",
    submit: "Förderergebnis anfordern",
    submitting: "Wird gesendet …",
    securenote: "SSL-verschlüsselt · Kein Spam · Jederzeit widerrufbar",
    errors: {
      firstName: "Bitte gib deinen Vornamen ein.",
      lastName: "Bitte gib deinen Nachnamen ein.",
      email: "Bitte gib eine gültige E-Mail-Adresse ein.",
      phone: "Bitte gib eine gültige Telefonnummer ein.",
      consent: "Bitte stimme der Verarbeitung deiner Daten zu.",
      generic: "Leider hat etwas nicht geklappt. Bitte versuche es erneut.",
    },
  },
  success: {
    badge: "Geschafft",
    title: "Dein Fördercheck ist abgeschlossen!",
    subtitle:
      "Wir haben deine Angaben erhalten. Du bekommst dein persönliches Förderergebnis in Kürze per E-Mail – in der Regel innerhalb von 24 Stunden.",
    bookTitle: "Direkt durchstarten?",
    bookText:
      "Sichere dir jetzt dein kostenloses Beratungsgespräch und kläre alle Fragen zu deiner Förderung persönlich.",
    book: "Kostenloses Beratungsgespräch buchen",
    nextTitle: "So geht es weiter",
    next: [
      "Wir prüfen deine Angaben und identifizieren die passenden Förderprogramme.",
      "Du erhältst dein persönliches Förderergebnis per E-Mail.",
      "Im kostenlosen Gespräch planen wir die nächsten Schritte.",
    ],
    restart: "Neuen Fördercheck starten",
    resultLabel: "Dein geschätztes Förderpotenzial",
  },
  ui: {
    step: "Schritt",
    of: "von",
    back: "Zurück",
    continue: "Weiter",
    multiHint: "Mehrfachauswahl möglich",
    selectedHint: "ausgewählt",
    skip: "Überspringen",
    resumeTitle: "Weitermachen?",
    resumeText: "Du hast deinen Fördercheck noch nicht abgeschlossen. Möchtest du dort weitermachen, wo du aufgehört hast?",
    resumeYes: "Weitermachen",
    resumeNo: "Neu starten",
  },
};

/* -------------------------------------------------------------------------- */
/*  Inhalt: Englisch                                                          */
/* -------------------------------------------------------------------------- */

const en: FunnelContent = {
  intro: {
    badge: "Free · No obligation · 60 seconds",
    title: "Which funding are you entitled to?",
    highlight: "Up to 70% subsidy",
    subtitle:
      "Find out in under a minute which government funding (BAFA, KfW & tax bonus) is realistic for your project – personally reviewed by ENOX.",
    bullets: [
      "Tailored to your property",
      "Checked against current funding programmes",
      "Personally reviewed by Enes Talha Aktürk",
    ],
    start: "Start funding check",
    duration: "Takes about 60 seconds",
    privacy: "No costs. Your data is handled in line with GDPR.",
  },
  questions: [
    {
      id: "goal",
      type: "multi",
      question: "What is your project about?",
      help: "Multiple answers possible – pick everything that applies.",
      options: [
        { value: "heizung", label: "Heating / Heat pump", description: "Heating replacement, heat pump, solar thermal", icon: "heat" },
        { value: "daemmung", label: "Insulation & renovation", description: "Roof, facade, basement ceiling", icon: "insulation" },
        { value: "fenster", label: "Windows & doors", description: "Replacement, new glazing", icon: "window" },
        { value: "solar", label: "Photovoltaics & storage", description: "Solar system, battery, wallbox", icon: "solar" },
        { value: "komplett", label: "Full renovation", description: "Renovation to an efficiency house", icon: "renovation" },
        { value: "kaufen", label: "Purchase / new build", description: "Buying or building a property", icon: "buy" },
        { value: "unklar", label: "Not sure yet", description: "I just want to inform myself", icon: "question" },
      ],
    },
    {
      id: "building",
      type: "single",
      question: "What type of building is it?",
      options: [
        { value: "efh", label: "Detached house", icon: "house" },
        { value: "mfh", label: "Apartment building", icon: "building" },
        { value: "etw", label: "Owner-occupied flat", icon: "apartment" },
        { value: "gewerbe", label: "Commercial / non-residential", icon: "commercial" },
      ],
    },
    {
      id: "owner",
      type: "single",
      question: "What is your role regarding the property?",
      options: [
        { value: "ja", label: "I am the owner", icon: "owner" },
        { value: "kauf", label: "I am planning to buy", icon: "owner-plan" },
        { value: "nein", label: "I am a tenant", description: "Note: funding usually goes to owners", icon: "tenant" },
      ],
    },
    {
      id: "year",
      type: "single",
      question: "What year was the building constructed?",
      help: "The age affects which programmes apply.",
      options: [
        { value: "vor1979", label: "Before 1979", description: "Often particularly high funding rates", icon: "old" },
        { value: "1979_2001", label: "1979 – 2001", icon: "mid" },
        { value: "nach2002", label: "After 2002", icon: "new" },
        { value: "unklar", label: "I'm not sure", icon: "question" },
      ],
    },
    {
      id: "heating",
      type: "single",
      question: "How is it currently heated?",
      options: [
        { value: "gas", label: "Gas", icon: "gas" },
        { value: "oel", label: "Oil", icon: "oil" },
        { value: "fernwaerme", label: "District heating", icon: "district" },
        { value: "waermepumpe", label: "Heat pump", icon: "heatpump" },
        { value: "strom", label: "Electric / night storage", icon: "power" },
        { value: "sonstiges", label: "Other / not sure", icon: "more" },
      ],
    },
    {
      id: "timing",
      type: "single",
      question: "When would you like to start?",
      options: [
        { value: "sofort", label: "As soon as possible", icon: "rocket" },
        { value: "3monate", label: "Within the next 3 months", icon: "calendar" },
        { value: "jahr", label: "Within this year", icon: "clock" },
        { value: "info", label: "Just gathering information", icon: "info" },
      ],
    },
    {
      id: "finance",
      type: "single",
      question: "How would you like to finance it?",
      help: "Optional – helps us find the right programmes.",
      options: [
        { value: "eigenkapital", label: "Mostly equity", icon: "wallet" },
        { value: "kredit", label: "Subsidised loan / financing", icon: "bank" },
        { value: "offen", label: "Still open", icon: "open" },
      ],
    },
  ],
  calculating: {
    title: "Calculating your funding potential …",
    steps: [
      "Analysing your answers",
      "Matching BAFA & KfW programmes",
      "Checking tax advantages",
      "Creating your personal result",
    ],
  },
  result: {
    badge: "Your result is ready",
    title: "Good news – funding is available for your project!",
    upTo: "Up to",
    perYear: "in possible grants & subsidised loans",
    breakdownTitle: "How your potential breaks down",
    items: {
      bafa: "BAFA grant (individual measures)",
      kfw: "KfW subsidised loan & repayment bonus",
      tax: "Tax bonus (§ 35c EStG)",
    },
    disclaimer:
      "Non-binding estimate based on your answers. The actual funding amount depends on an individual review and the current funding conditions.",
    cta: "Secure your funding potential now",
    secondary: "Get the result by email",
  },
  lead: {
    title: "Where should we send your funding result?",
    subtitle:
      "Enes Talha Aktürk reviews your funding check personally and gets back to you with the concrete next steps.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    phone: "Phone number",
    phoneHint: "For a quick, personal response.",
    consent:
      "I agree that ENOX (Enes Talha Aktürk) may process my details for consulting and contact me. See the privacy policy.",
    submit: "Request funding result",
    submitting: "Sending …",
    securenote: "SSL-encrypted · No spam · Revocable anytime",
    errors: {
      firstName: "Please enter your first name.",
      lastName: "Please enter your last name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a valid phone number.",
      consent: "Please agree to the processing of your data.",
      generic: "Something went wrong. Please try again.",
    },
  },
  success: {
    badge: "Done",
    title: "Your funding check is complete!",
    subtitle:
      "We have received your details. You'll get your personal funding result by email shortly – usually within 24 hours.",
    bookTitle: "Want to get started right away?",
    bookText:
      "Book your free consultation now and clarify all questions about your funding personally.",
    book: "Book a free consultation",
    nextTitle: "What happens next",
    next: [
      "We review your details and identify the right funding programmes.",
      "You receive your personal funding result by email.",
      "In a free call we plan the next steps together.",
    ],
    restart: "Start a new funding check",
    resultLabel: "Your estimated funding potential",
  },
  ui: {
    step: "Step",
    of: "of",
    back: "Back",
    continue: "Continue",
    multiHint: "Multiple choice",
    selectedHint: "selected",
    skip: "Skip",
    resumeTitle: "Continue?",
    resumeText: "You haven't finished your funding check yet. Would you like to continue where you left off?",
    resumeYes: "Continue",
    resumeNo: "Start over",
  },
};

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
