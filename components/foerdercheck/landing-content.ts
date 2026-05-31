// Landing-Inhalte unter dem Fördercheck-Funnel.
// Eigene, originale ENOX-Texte – inhaltlich orientiert an üblichen
// Förderberatungs-Themen (Programme, Ablauf, FAQ). Die genannten
// Förderquoten sind öffentliche Eckdaten der Bundesprogramme; maßgeblich
// sind stets die jeweils aktuellen Richtlinien (siehe Disclaimer).

import type { FunnelLocale } from "./content";

export type ProgramItem = {
  tag: string;
  rate: string;
  title: string;
  description: string;
};

export type Step = { title: string; description: string };
export type Stat = { value: string; label: string };
export type Faq = { q: string; a: string };

export type LandingContent = {
  programs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: ProgramItem[];
    note: string;
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: Step[];
  };
  trust: {
    eyebrow: string;
    title: string;
    subtitle: string;
    points: { title: string; description: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Faq[];
  };
  finalCta: {
    title: string;
    subtitle: string;
    button: string;
  };
};

const de: LandingContent = {
  programs: {
    eyebrow: "Förderprogramme",
    title: "Diese Förderungen prüfen wir für dich",
    subtitle:
      "Bund und Länder fördern energetische Maßnahmen über mehrere Programme – oft kombinierbar. Wir finden die für dein Vorhaben passende Variante.",
    items: [
      {
        tag: "Heizung (BEG / KfW 458)",
        rate: "bis zu 70 %",
        title: "Heizungstausch & Wärmepumpe",
        description:
          "Zuschuss für den Umstieg auf erneuerbare Heizsysteme – aus Grundförderung sowie Klimageschwindigkeits- und Einkommensbonus zusammensetzbar.",
      },
      {
        tag: "Einzelmaßnahmen (BAFA / BEG EM)",
        rate: "bis zu 20 %",
        title: "Dämmung, Fenster & Anlagentechnik",
        description:
          "Zuschuss für einzelne Sanierungsschritte an Gebäudehülle und Technik. Mit individuellem Sanierungsfahrplan (iSFP) steigt der Fördersatz zusätzlich.",
      },
      {
        tag: "Effizienzhaus (KfW 261)",
        rate: "Kredit + Tilgungszuschuss",
        title: "Sanierung zum Effizienzhaus",
        description:
          "Zinsgünstiger Förderkredit mit Tilgungszuschuss für die Komplettsanierung auf einen Effizienzhaus-Standard – je besser die Stufe, desto höher der Zuschuss.",
      },
    ],
    note: "Förderhöhen sind Eckwerte der Bundesprogramme und können sich ändern. Maßgeblich sind die jeweils aktuellen Richtlinien und die individuelle Prüfung.",
  },
  process: {
    eyebrow: "So läuft's ab",
    title: "Von der ersten Frage bis zur Auszahlung",
    subtitle:
      "Wir begleiten dich durch den gesamten Förderprozess – transparent, in deinem Tempo und ohne Fachchinesisch.",
    steps: [
      {
        title: "Kostenloser Fördercheck",
        description:
          "In rund 60 Sekunden erfassen wir dein Vorhaben und schätzen dein Förderpotenzial – unverbindlich.",
      },
      {
        title: "Persönliche Auswertung",
        description:
          "Enes Talha Aktürk prüft deine Angaben und meldet sich mit einer klaren Einschätzung der passenden Programme.",
      },
      {
        title: "Immobilien- & Maßnahmenanalyse",
        description:
          "Wir schauen uns Gebäude und Ziele genau an und legen die sinnvolle Reihenfolge der Maßnahmen fest.",
      },
      {
        title: "Förderantrag & Nachweise",
        description:
          "Wir bereiten die Anträge bei BAFA bzw. KfW vor und sorgen für eine vollständige, fristgerechte Dokumentation.",
      },
      {
        title: "Umsetzung & Handwerk",
        description:
          "Auf Wunsch prüfen wir Angebote auf Förderfähigkeit und stimmen uns mit den ausführenden Betrieben ab.",
      },
      {
        title: "Verwendungsnachweis & Auszahlung",
        description:
          "Zum Abschluss begleiten wir den Verwendungsnachweis, damit die Förderung sicher ausgezahlt wird.",
      },
    ],
  },
  trust: {
    eyebrow: "Warum ENOX",
    title: "Förderberatung, die für dich arbeitet",
    subtitle:
      "Unabhängig, gründlich und entlang aktueller Förderbedingungen – damit kein Zuschuss verschenkt wird.",
    points: [
      {
        title: "Produkt- & herstellerneutral",
        description:
          "Wir empfehlen, was zu deinem Gebäude passt – nicht, was eine Marke verkaufen will.",
      },
      {
        title: "Vollständige Dokumentation",
        description:
          "Lückenlose, prüffeste Nachweise sind die Grundlage jeder erfolgreichen Förderung.",
      },
      {
        title: "Ein Ansprechpartner",
        description:
          "Von der ersten Frage bis zur Auszahlung bleibst du bei einer festen Kontaktperson.",
      },
      {
        title: "International & mehrsprachig",
        description:
          "Beratung auf Deutsch und Englisch – auf Wunsch auch in weiteren Sprachen.",
      },
    ],
  },
  faq: {
    eyebrow: "Häufige Fragen",
    title: "Was du zur Förderung wissen solltest",
    items: [
      {
        q: "Was kostet der Fördercheck?",
        a: "Der Fördercheck ist kostenlos und unverbindlich. Du erhältst eine erste Einschätzung deines Förderpotenzials, ohne dich zu etwas zu verpflichten.",
      },
      {
        q: "Brauche ich für die Förderung wirklich einen Energieberater?",
        a: "Für die meisten Bundesprogramme (z. B. BAFA-Einzelmaßnahmen und KfW-Effizienzhaus) ist die Einbindung einer zugelassenen Fachperson für die Antragstellung vorgeschrieben. Wir übernehmen diesen Part für dich.",
      },
      {
        q: "Wie lange dauert der gesamte Prozess?",
        a: "Das hängt vom Vorhaben ab. Die erste Einschätzung gibt es kurzfristig; Antragsvorbereitung und Bewilligung dauern je nach Programm und Auslastung der Fördergeber typischerweise einige Wochen.",
      },
      {
        q: "Kann ich auch fördern, wenn ich schon mit der Sanierung begonnen habe?",
        a: "Förderanträge müssen in der Regel vor dem Vorhabenbeginn gestellt werden. Hast du schon begonnen, prüfen wir, welche Maßnahmen noch förderfähig sind – sprich uns am besten früh an.",
      },
      {
        q: "Übernimmt ENOX die Antragstellung?",
        a: "Ja. Wir bereiten die Anträge bei BAFA bzw. KfW vor, kümmern uns um die nötigen Nachweise und begleiten dich bis zum Verwendungsnachweis und zur Auszahlung.",
      },
      {
        q: "Lohnt sich die Beratung auch bei älteren Gebäuden?",
        a: "Gerade ältere Gebäude profitieren oft besonders, weil hier viele förderfähige Maßnahmen zusammenkommen und die Einsparpotenziale hoch sind.",
      },
    ],
  },
  finalCta: {
    title: "Bereit, deine Förderung zu sichern?",
    subtitle:
      "Starte den kostenlosen Fördercheck – in unter einer Minute weißt du, was für dein Vorhaben möglich ist.",
    button: "Jetzt Fördercheck starten",
  },
};

const en: LandingContent = {
  programs: {
    eyebrow: "Funding programmes",
    title: "The funding we check for you",
    subtitle:
      "Germany funds energy measures through several programmes – often combinable. We find the right fit for your project.",
    items: [
      {
        tag: "Heating (BEG / KfW 458)",
        rate: "up to 70%",
        title: "Heating replacement & heat pump",
        description:
          "Grant for switching to renewable heating – combinable from a base subsidy plus speed and income bonuses.",
      },
      {
        tag: "Single measures (BAFA / BEG EM)",
        rate: "up to 20%",
        title: "Insulation, windows & systems",
        description:
          "Grant for individual renovation steps on the building envelope and systems. An individual renovation roadmap (iSFP) raises the rate further.",
      },
      {
        tag: "Efficiency house (KfW 261)",
        rate: "Loan + repayment bonus",
        title: "Renovation to an efficiency house",
        description:
          "Low-interest loan with a repayment bonus for a full renovation to an efficiency-house standard – the better the level, the higher the bonus.",
      },
    ],
    note: "Funding rates are headline figures of the federal programmes and may change. The current guidelines and an individual review are decisive.",
  },
  process: {
    eyebrow: "How it works",
    title: "From the first question to the payout",
    subtitle:
      "We guide you through the entire funding process – transparently, at your pace and without jargon.",
    steps: [
      {
        title: "Free funding check",
        description:
          "In about 60 seconds we capture your project and estimate your funding potential – no obligation.",
      },
      {
        title: "Personal review",
        description:
          "Enes Talha Aktürk reviews your answers and comes back with a clear take on the right programmes.",
      },
      {
        title: "Property & measures analysis",
        description:
          "We look closely at the building and your goals and define a sensible order of measures.",
      },
      {
        title: "Application & evidence",
        description:
          "We prepare the BAFA / KfW applications and ensure complete, on-time documentation.",
      },
      {
        title: "Implementation & trades",
        description:
          "On request we check quotes for eligibility and coordinate with the contractors.",
      },
      {
        title: "Proof of use & payout",
        description:
          "Finally we support the proof of use so the funding is paid out reliably.",
      },
    ],
  },
  trust: {
    eyebrow: "Why ENOX",
    title: "Funding advice that works for you",
    subtitle:
      "Independent, thorough and aligned with current funding conditions – so no subsidy is left on the table.",
    points: [
      {
        title: "Product- & vendor-neutral",
        description:
          "We recommend what fits your building – not what a brand wants to sell.",
      },
      {
        title: "Complete documentation",
        description:
          "Gap-free, audit-proof evidence is the basis of every successful application.",
      },
      {
        title: "One point of contact",
        description:
          "From the first question to the payout you stay with one dedicated contact.",
      },
      {
        title: "International & multilingual",
        description:
          "Advice in German and English – and further languages on request.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "What you should know about funding",
    items: [
      {
        q: "What does the funding check cost?",
        a: "The funding check is free and non-binding. You get an initial estimate of your funding potential without committing to anything.",
      },
      {
        q: "Do I really need an energy consultant for funding?",
        a: "Most federal programmes (e.g. BAFA single measures and KfW efficiency house) require an accredited expert for the application. We take care of that part for you.",
      },
      {
        q: "How long does the whole process take?",
        a: "It depends on the project. The initial assessment is quick; application and approval typically take a few weeks depending on the programme and the funding bodies' workload.",
      },
      {
        q: "Can I still get funding if I've already started?",
        a: "Applications usually have to be submitted before work begins. If you've already started, we check which measures are still eligible – best to talk to us early.",
      },
      {
        q: "Does ENOX handle the application?",
        a: "Yes. We prepare the BAFA / KfW applications, take care of the required evidence and support you through to the proof of use and payout.",
      },
      {
        q: "Is advice worth it for older buildings too?",
        a: "Older buildings often benefit the most, because many eligible measures come together and the savings potential is high.",
      },
    ],
  },
  finalCta: {
    title: "Ready to secure your funding?",
    subtitle:
      "Start the free funding check – in under a minute you'll know what's possible for your project.",
    button: "Start the funding check",
  },
};

const landing: Record<FunnelLocale, LandingContent> = { de, en };

export function getLandingContent(locale: FunnelLocale): LandingContent {
  return landing[locale];
}
