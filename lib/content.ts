/**
 * Zentrale Inhalts-Quelle (Single Source of Truth) für die gesamte Website.
 * Texte basieren auf docs/inhalte.md + docs/briefing.md.
 *
 * Globale Überschreibung: Der Name lautet überall "Weitblick Energieberatung".
 *
 * Kontaktdaten, Rechtstexte und ähnliche offene Punkte sind als Platzhalter in
 * eckigen Klammern markiert und in CONTENT.md gelistet. Bitte dort pflegen.
 */

/* ---- Marke & Kontakt ----------------------------------------------------- */

export const site = {
  name: "Weitblick Energieberatung",
  shortName: "Weitblick",
  tagline: "Energieberatung & Fördermittelberatung",
  description:
    "Energieberatung für Wohngebäude: Fördermittelberatung, individueller Sanierungsfahrplan, Heizlastberechnung, hydraulischer Abgleich, Energieausweis und Wärmepumpenberatung.",
} as const;

/** Kontakt-Platzhalter – in CONTENT.md gelistet. */
export const contact = {
  email: "[E-Mail-Adresse eintragen]",
  phone: "[Telefonnummer eintragen]",
  location: "[Standort eintragen]",
} as const;

export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith("[");
}

/* ---- Navigation & Routen -------------------------------------------------- */

export const routes = {
  home: "/",
  foerdercheck: "/foerdercheck",
  leistungen: "/leistungen",
  ueberMich: "/ueber-mich",
  faq: "/faq",
  kontakt: "/kontakt",
  impressum: "/impressum",
  datenschutz: "/datenschutz",
} as const;

export const nav: { label: string; href: string }[] = [
  { label: "Leistungen", href: routes.leistungen },
  { label: "Fördercheck", href: routes.foerdercheck },
  { label: "Über mich", href: routes.ueberMich },
  { label: "FAQ", href: routes.faq },
  { label: "Kontakt", href: routes.kontakt },
];

export const ctaLabels = {
  foerdercheck: "Fördercheck starten",
  foerdercheckBox: "Jetzt Fördercheck starten",
  consultation: "Erstgespräch anfragen",
  contact: "Kontakt aufnehmen",
  allServices: "Alle Leistungen ansehen",
  request: "Jetzt Anfrage stellen",
  checkFunding: "Förderung prüfen lassen",
  moreAboutMe: "Mehr über mich erfahren",
  allFaq: "Alle Fragen ansehen",
} as const;

/* ---- Startseite ----------------------------------------------------------- */

export const hero = {
  eyebrow: "Energieberatung für Wohngebäude",
  title: "Energieberatung, Förderung und Sanierungsplanung für Ihr Wohngebäude",
  subtitle:
    "Ich unterstütze Eigentümer, Vermieter und Immobilienkäufer bei energetischer Sanierung, Fördermitteln, individuellem Sanierungsfahrplan, Heizlastberechnung und hydraulischem Abgleich.",
  benefits: [
    "Fördermöglichkeiten prüfen",
    "Sanierung sinnvoll planen",
    "Technische Berechnungen aus einer Hand",
  ],
  box: {
    title: "Kostenloser Fördercheck",
    text:
      "Prüfen Sie in wenigen Schritten, welche nächsten Schritte für Ihr Wohngebäude sinnvoll sind.",
    steps: ["Gebäude auswählen", "Maßnahme angeben", "Rückmeldung erhalten"],
  },
} as const;

export const trustItems = [
  "Energieberatung für Wohngebäude",
  "Individueller Sanierungsfahrplan",
  "Fördermittelberatung für BAFA & KfW",
  "Heizlastberechnung & hydraulischer Abgleich",
] as const;

export const nutzen = {
  title: "Sanieren lohnt sich – wenn es richtig geplant ist",
  text:
    "Ob Heizungstausch, Dämmung, Fenstertausch oder Komplettsanierung: Wer sein Wohngebäude energetisch saniert, sollte Förderung, technische Anforderungen und sinnvolle Reihenfolge frühzeitig prüfen lassen.",
  items: [
    "Klarheit über sinnvolle Sanierungsmaßnahmen",
    "Prüfung möglicher Förderungen",
    "Strukturierter Fahrplan für Ihr Wohngebäude",
    "Technische Grundlage für die Umsetzung",
  ],
} as const;

export const foerdercheckTeaser = {
  title: "Fördermöglichkeiten in wenigen Schritten prüfen",
  text:
    "Starten Sie den Fördercheck und beantworten Sie kurze Fragen zu Ihrem Wohngebäude und Ihrer geplanten Maßnahme. Anschließend prüfe ich Ihre Angaben und melde mich mit einer ersten Einschätzung.",
  steps: [
    {
      title: "Gebäude auswählen",
      text: "Geben Sie an, um welche Art von Wohngebäude es sich handelt.",
    },
    {
      title: "Maßnahme angeben",
      text: "Wählen Sie aus, was geplant ist oder geprüft werden soll.",
    },
    {
      title: "Rückmeldung erhalten",
      text: "Ich prüfe Ihre Angaben und melde mich mit einer ersten Einschätzung.",
    },
  ],
  hint:
    "Der Fördercheck ersetzt keine vollständige Energieberatung, bietet aber eine gute erste Orientierung für die nächsten Schritte.",
} as const;

/* ---- Leistungen ----------------------------------------------------------- */

export type LucideKey =
  | "Route"
  | "BadgeEuro"
  | "Calculator"
  | "Gauge"
  | "FileCheck2"
  | "ThermometerSun"
  | "Wind"
  | "DraftingCompass";

export type Service = {
  slug: string;
  icon: LucideKey;
  title: string;
  short: string;
  /** Ausführlicher Block für /leistungen. */
  detail: string;
  suitedFor: string;
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "sanierungsfahrplan",
    icon: "Route",
    title: "Individueller Sanierungsfahrplan",
    short:
      "Ein Schritt-für-Schritt-Plan für die energetische Sanierung Ihres Wohngebäudes – inklusive sinnvoller Maßnahmen, Reihenfolge und Förderpotenzial.",
    detail:
      "Der individuelle Sanierungsfahrplan zeigt, wie Ihr Wohngebäude Schritt für Schritt energetisch verbessert werden kann – mit sinnvoller Reihenfolge und Blick auf das Förderpotenzial.",
    suitedFor: "Eigentümer, die langfristig und förderfähig modernisieren möchten.",
    includes: ["Bestandsaufnahme", "Maßnahmen & Reihenfolge", "Einschätzung zur Förderung"],
  },
  {
    slug: "foerdermittelberatung",
    icon: "BadgeEuro",
    title: "Fördermittelberatung",
    short:
      "Ich prüfe, welche Fördermöglichkeiten für Ihr Vorhaben infrage kommen und unterstütze Sie bei den nächsten Schritten.",
    detail:
      "Welche Förderung passt zu Ihrem Vorhaben? Ich prüfe mögliche Programme von BAFA und KfW und unterstütze Sie strukturiert bei den nächsten Schritten.",
    suitedFor: "Alle, die Sanierung oder Heizungstausch fördern lassen möchten.",
    includes: ["Prüfung BAFA & KfW", "Förderfähige Maßnahmen", "Nächste Schritte"],
  },
  {
    slug: "heizlastberechnung",
    icon: "Calculator",
    title: "Heizlastberechnung",
    short:
      "Die Heizlastberechnung bildet die Grundlage für die richtige Auslegung von Wärmeerzeugern, Heizflächen und Wärmepumpen.",
    detail:
      "Die Heizlastberechnung bestimmt, wie viel Wärme das Gebäude und die einzelnen Räume benötigen – die Grundlage für die richtige Auslegung von Wärmeerzeuger, Heizflächen und Wärmepumpe.",
    suitedFor: "Wichtig vor Heizungstausch und Wärmepumpen-Einbau.",
    includes: ["Gebäude- & Raumheizlast", "Auslegungsgrundlage", "Basis für Wärmepumpe"],
  },
  {
    slug: "hydraulischer-abgleich",
    icon: "Gauge",
    title: "Hydraulischer Abgleich",
    short:
      "Durch den hydraulischen Abgleich wird Ihre Heizungsanlage effizient eingestellt und die Wärme gleichmäßiger im Gebäude verteilt.",
    detail:
      "Beim hydraulischen Abgleich wird die Heizungsanlage so eingestellt, dass jeder Raum die passende Wärmemenge erhält – das verbessert die Effizienz und ist bei vielen Förderungen relevant.",
    suitedFor: "Sinnvoll bei Heizungsoptimierung und als Förderbedingung.",
    includes: ["Effiziente Einstellung", "Gleichmäßige Wärme", "Förderrelevanz"],
  },
  {
    slug: "energieausweis",
    icon: "FileCheck2",
    title: "Energieausweis",
    short:
      "Ich erstelle Energieausweise für Verkauf, Vermietung, Sanierung oder gesetzliche Nachweise.",
    detail:
      "Den Energieausweis benötigen Sie bei Verkauf, Vermietung oder zum gesetzlichen Nachweis. Ich erstelle ihn passend zu Ihrem Wohngebäude.",
    suitedFor: "Eigentümer bei Verkauf, Vermietung oder Sanierung.",
    includes: ["Verbrauch oder Bedarf", "Gesetzlicher Nachweis", "Für Wohngebäude"],
  },
  {
    slug: "waermepumpenberatung",
    icon: "ThermometerSun",
    title: "Wärmepumpenberatung",
    short:
      "Ich prüfe, ob eine Wärmepumpe für Ihr Wohngebäude sinnvoll ist und welche technischen Voraussetzungen erfüllt sein sollten.",
    detail:
      "Ist eine Wärmepumpe für Ihr Gebäude geeignet? Ich prüfe die technischen Voraussetzungen und ordne ein, was vor einer Entscheidung sinnvoll ist.",
    suitedFor: "Eigentümer, die über einen Heizungstausch nachdenken.",
    includes: ["Eignung des Gebäudes", "Technische Voraussetzungen", "Förderhinweise"],
  },
  {
    slug: "lueftungskonzept",
    icon: "Wind",
    title: "Lüftungskonzept",
    short:
      "Ein Lüftungskonzept zeigt, ob und wie der notwendige Luftwechsel nach einer Sanierung sichergestellt werden kann.",
    detail:
      "Nach Fenstertausch oder Dachsanierung wird die Gebäudehülle dichter. Ein Lüftungskonzept prüft, ob der notwendige Luftwechsel für Feuchteschutz und Raumluftqualität sichergestellt ist.",
    suitedFor: "Relevant bei dichteren Gebäudehüllen nach Sanierung.",
    includes: ["Prüfung Luftwechsel", "Feuchteschutz", "Raumluftqualität"],
  },
  {
    slug: "baubegleitung",
    icon: "DraftingCompass",
    title: "Baubegleitung / Fachplanung",
    short:
      "Ich unterstütze Sie bei der fachlichen Begleitung energetischer Maßnahmen und bei der förderfähigen Umsetzung.",
    detail:
      "Bei der Umsetzung energetischer Maßnahmen begleite ich Sie fachlich – damit die Ausführung zum Plan passt und förderfähig bleibt.",
    suitedFor: "Eigentümer in der Umsetzungsphase ihrer Sanierung.",
    includes: ["Fachliche Begleitung", "Förderfähige Umsetzung", "Qualitätssicherung"],
  },
];

export const servicesIntro = {
  title: "Meine Leistungen",
  subtitle:
    "Von der ersten Förderprüfung bis zur technischen Berechnung unterstütze ich Sie bei der energetischen Sanierung Ihres Wohngebäudes.",
} as const;

/* ---- Zielgruppen ---------------------------------------------------------- */

export const audiences = {
  title: "Für Eigentümer, Vermieter und Immobilienkäufer",
  cards: [
    {
      icon: "Home" as const,
      title: "Private Eigentümer",
      text:
        "Für alle, die ihr Haus energetisch sanieren, Fördermittel nutzen oder ihre Energiekosten langfristig senken möchten.",
      topics: [
        "Sanierungsfahrplan",
        "Heizungstausch",
        "Wärmepumpe",
        "Dämmung",
        "Fenstertausch",
        "Energieausweis",
        "Fördermittelberatung",
      ],
    },
    {
      icon: "Building2" as const,
      title: "Vermieter & Kapitalanleger",
      text:
        "Für Eigentümer, die den energetischen Zustand ihrer Immobilie verbessern, Förderungen nutzen und den Wert langfristig sichern möchten.",
      topics: [
        "Energetische Bewertung",
        "Sanierungsstrategie",
        "Fördermittel",
        "Heizlastberechnung",
        "Energieausweis",
        "Maßnahmenplanung",
      ],
    },
    {
      icon: "KeyRound" as const,
      title: "Immobilienkäufer",
      text:
        "Für Käufer, die vor dem Kauf wissen möchten, welche energetischen Schwachstellen ein Gebäude hat und welche Sanierungskosten oder Maßnahmen auf sie zukommen können.",
      topics: [
        "Einschätzung des energetischen Zustands",
        "Mögliche Sanierungsmaßnahmen",
        "Förderpotenzial",
        "Energieausweis prüfen",
        "Heizung und Gebäudehülle bewerten",
      ],
    },
  ],
} as const;

/* ---- Ablauf --------------------------------------------------------------- */

export const ablauf = {
  title: "So läuft die Beratung ab",
  steps: [
    {
      title: "Anfrage stellen",
      text: "Sie starten den Fördercheck oder senden eine Anfrage über das Kontaktformular.",
    },
    {
      title: "Erstes Gespräch",
      text: "Wir besprechen Ihr Gebäude, Ihr Ziel und die geplanten Maßnahmen.",
    },
    {
      title: "Analyse & Berechnung",
      text:
        "Ich prüfe die relevanten Unterlagen, berechne technische Grundlagen und bewerte mögliche Förderungen.",
    },
    {
      title: "Empfehlung & nächste Schritte",
      text:
        "Sie erhalten eine klare Einschätzung und wissen, welche Maßnahmen sinnvoll sind und wie Sie weiter vorgehen können.",
    },
  ],
} as const;

/* ---- Über mich ------------------------------------------------------------ */

export const aboutShort = {
  title: "Ihr Ansprechpartner für Energieberatung und Sanierungsplanung",
  text:
    "Mein Ziel ist es, energetische Sanierungen verständlich, strukturiert und förderfähig zu planen. Ich verbinde technisches Verständnis, Fördermittelwissen und einen klaren Beratungsansatz. Dabei geht es nicht darum, möglichst viele Maßnahmen zu empfehlen, sondern die passenden Schritte für Ihr Gebäude zu finden.",
  points: [
    "Energieberatung für Wohngebäude",
    "Individueller Sanierungsfahrplan",
    "Fördermittelberatung",
    "Heizlastberechnung und hydraulischer Abgleich",
    "Fokus auf verständliche und praxisnahe Beratung",
  ],
} as const;

export const aboutPage = {
  title: "Energieberatung mit technischem Verständnis und klarem Blick für Förderung",
  intro:
    "Ich unterstütze Eigentümer, Vermieter und Immobilienkäufer dabei, energetische Sanierungen sinnvoll zu planen, Fördermöglichkeiten zu prüfen und technische Anforderungen verständlich umzusetzen.",
  intro2:
    "Mein Anspruch ist eine Beratung, die Klarheit schafft: Welche Maßnahme ist sinnvoll? Welche Förderung kommt infrage? Welche Berechnung wird benötigt? Und wie geht man strukturiert vor?",
  approachTitle: "Mein Ansatz",
  approach: [
    "Energetische Sanierung ist mehr als nur Dämmung, Heizung oder Förderung. Entscheidend ist, dass die Maßnahmen zum Gebäude, zum Budget und zum Ziel des Eigentümers passen.",
    "Deshalb betrachte ich nicht nur einzelne Bauteile, sondern das Wohngebäude als Gesamtsystem. So lassen sich Maßnahmen besser einordnen und Fehlentscheidungen vermeiden.",
  ],
  focusTitle: "Meine Schwerpunkte",
  focus: [
    "Energieberatung für Wohngebäude",
    "Individueller Sanierungsfahrplan",
    "Fördermittelberatung",
    "Heizlastberechnung",
    "Hydraulischer Abgleich",
    "Lüftungskonzepte",
    "Wärmepumpenberatung",
    "Energieausweis",
    "Energetische Sanierungsplanung",
    "Fachplanung und Baubegleitung",
  ],
  whyTitle: "Warum Weitblick Energieberatung?",
  why: [
    "Der Name Weitblick steht für eine Beratung, die nicht nur die einzelne Maßnahme betrachtet, sondern die langfristige Entwicklung des Gebäudes.",
    "Ziel ist eine Sanierungsstrategie, die technisch sinnvoll, förderfähig und verständlich ist.",
  ],
} as const;

/* ---- FAQ ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

/** 6 Fragen für die Startseite. */
export const faqHome: Faq[] = [
  {
    q: "Was ist ein individueller Sanierungsfahrplan?",
    a: "Ein individueller Sanierungsfahrplan zeigt, wie ein Wohngebäude Schritt für Schritt energetisch verbessert werden kann. Er hilft dabei, Maßnahmen sinnvoll zu planen und Fördermöglichkeiten besser zu nutzen.",
  },
  {
    q: "Wann brauche ich eine Heizlastberechnung?",
    a: "Eine Heizlastberechnung wird benötigt, um die passende Heizleistung für ein Gebäude zu bestimmen. Sie ist besonders wichtig beim Einbau einer Wärmepumpe oder bei der Erneuerung der Heizungsanlage.",
  },
  {
    q: "Was ist ein hydraulischer Abgleich?",
    a: "Beim hydraulischen Abgleich wird das Heizsystem so eingestellt, dass alle Räume effizient und gleichmäßig mit Wärme versorgt werden.",
  },
  {
    q: "Welche Förderungen sind möglich?",
    a: "Das hängt vom Gebäude und der geplanten Maßnahme ab. Förderungen können zum Beispiel für Gebäudehülle, Heizungstausch, Wärmepumpe, Sanierungsfahrplan oder Fachplanung möglich sein.",
  },
  {
    q: "Welche Unterlagen werden benötigt?",
    a: "Je nach Leistung werden Grundrisse, Baujahr, Fotos, Energieverbräuche, Heizungsdaten, Angebote oder vorhandene Unterlagen zum Gebäude benötigt.",
  },
  {
    q: "Beraten Sie auch Mehrfamilienhäuser?",
    a: "Ja, die Beratung ist für Einfamilienhäuser, Zweifamilienhäuser, Mehrfamilienhäuser und Wohnungen möglich.",
  },
];

/** Vollständige FAQ-Liste für /faq. */
export const faqAll: Faq[] = [
  {
    q: "Was ist ein individueller Sanierungsfahrplan?",
    a: "Ein individueller Sanierungsfahrplan zeigt, wie ein Wohngebäude Schritt für Schritt energetisch verbessert werden kann. Er enthält sinnvolle Maßnahmen, eine mögliche Reihenfolge und eine Einschätzung zur energetischen Verbesserung.",
  },
  {
    q: "Wann lohnt sich ein Sanierungsfahrplan?",
    a: "Ein Sanierungsfahrplan lohnt sich besonders, wenn Sie Ihr Gebäude langfristig modernisieren möchten und noch nicht genau wissen, welche Maßnahmen zuerst sinnvoll sind. Er eignet sich auch, wenn mehrere Maßnahmen wie Heizung, Dämmung, Fenster oder Dachsanierung im Raum stehen.",
  },
  {
    q: "Welche Förderungen sind möglich?",
    a: "Das hängt vom Gebäude und der geplanten Maßnahme ab. Fördermöglichkeiten können zum Beispiel für Dämmung, Fenstertausch, Heizungstausch, Wärmepumpe, Sanierungsfahrplan oder Fachplanung bestehen. Eine genaue Einschätzung ist erst möglich, wenn die Gebäudedaten und das Vorhaben geprüft wurden.",
  },
  {
    q: "Wann brauche ich eine Heizlastberechnung?",
    a: "Eine Heizlastberechnung ist wichtig, wenn eine neue Heizung geplant wird oder eine Wärmepumpe eingebaut werden soll. Sie zeigt, wie viel Wärme das Gebäude und die einzelnen Räume benötigen. Dadurch kann die Heizungsanlage passend ausgelegt werden.",
  },
  {
    q: "Was ist ein hydraulischer Abgleich?",
    a: "Beim hydraulischen Abgleich wird die Heizungsanlage so eingestellt, dass jeder Raum die passende Wärmemenge erhält. Das verbessert die Effizienz, kann den Komfort erhöhen und ist bei bestimmten Förderungen oder technischen Anforderungen relevant.",
  },
  {
    q: "Wann brauche ich ein Lüftungskonzept?",
    a: "Ein Lüftungskonzept kann erforderlich sein, wenn die Gebäudehülle dichter wird, zum Beispiel durch Fenstertausch, Dachsanierung oder größere energetische Maßnahmen. Es hilft zu prüfen, ob der notwendige Luftwechsel für Feuchteschutz und Raumluftqualität sichergestellt ist.",
  },
  {
    q: "Wird eine Wärmepumpe gefördert?",
    a: "Für Wärmepumpen können Fördermöglichkeiten bestehen. Entscheidend sind unter anderem die technischen Anforderungen, das Gebäude und die konkrete Umsetzung. Vor einer Entscheidung sollte geprüft werden, ob das Gebäude für eine Wärmepumpe geeignet ist und welche Voraussetzungen erfüllt werden müssen.",
  },
  {
    q: "Welche Unterlagen werden benötigt?",
    a: "Das hängt von der Leistung ab. Häufig hilfreich sind Grundrisse, Baujahr, Wohnfläche, Fotos vom Gebäude, Heizungsdaten, Energieverbräuche, Angebote von Handwerkern, vorhandene Energieausweise und – wenn vorhanden – Bauteilinformationen.",
  },
  {
    q: "Wie läuft die Beratung ab?",
    a: "Zuerst stellen Sie eine Anfrage oder starten den Fördercheck. Danach klären wir Ihr Anliegen, prüfen die vorhandenen Informationen und besprechen die nächsten sinnvollen Schritte. Je nach Leistung folgen dann Berechnung, Beratung, Sanierungsfahrplan oder Fördermittelprüfung.",
  },
  {
    q: "Beraten Sie auch Mehrfamilienhäuser?",
    a: "Ja, die Beratung ist für Einfamilienhäuser, Zweifamilienhäuser, Mehrfamilienhäuser und Wohnungen möglich.",
  },
];

/* ---- CTAs / Abschluss ----------------------------------------------------- */

export const finalCta = {
  title: "Sie möchten Ihre Sanierung oder Förderung prüfen lassen?",
  text:
    "Starten Sie den Fördercheck und erhalten Sie eine erste Einschätzung zu Ihrem Wohngebäude und den möglichen nächsten Schritten.",
} as const;

export const footer = {
  short:
    "Weitblick Energieberatung unterstützt Eigentümer, Vermieter und Immobilienkäufer bei Energieberatung, Fördermittelberatung und Sanierungsplanung für Wohngebäude.",
  legalLinks: [
    { label: "Impressum", href: routes.impressum },
    { label: "Datenschutz", href: routes.datenschutz },
  ],
} as const;

/* ---- Unterseiten-Hero ----------------------------------------------------- */

export const servicesPage = {
  title: "Leistungen für Ihre energetische Sanierung",
  text:
    "Ob Fördermittel, Sanierungsfahrplan, Heizlastberechnung oder hydraulischer Abgleich – ich unterstütze Sie mit einer strukturierten und verständlichen Energieberatung für Ihr Wohngebäude.",
} as const;

export const faqPage = {
  title: "Häufige Fragen zur Energieberatung",
  text:
    "Antworten auf die häufigsten Fragen zu Förderung, Sanierungsfahrplan und technischen Berechnungen.",
  closing: "Sie haben weitere Fragen?",
} as const;

export const kontaktPage = {
  title: "Kontakt aufnehmen",
  text:
    "Sie planen eine Sanierung, benötigen eine Energieberatung oder möchten Fördermöglichkeiten prüfen lassen? Senden Sie mir gerne eine Anfrage. Wenn Sie noch nicht genau wissen, welche Leistung Sie benötigen, starten Sie am besten den Fördercheck.",
  subjects: [
    "Fördercheck",
    "Sanierungsfahrplan",
    "Fördermittelberatung",
    "Heizlastberechnung",
    "Hydraulischer Abgleich",
    "Energieausweis",
    "Wärmepumpenberatung",
    "Lüftungskonzept",
    "Baubegleitung / Fachplanung",
    "Sonstiges",
  ],
  privacyNote:
    "Mit dem Absenden erklären Sie sich damit einverstanden, dass Ihre Angaben zur Bearbeitung Ihrer Anfrage verarbeitet werden.",
} as const;
