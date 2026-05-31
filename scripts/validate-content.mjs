#!/usr/bin/env node
/**
 * Prüft alle bearbeitbaren Inhalts-Dateien auf Gültigkeit:
 *   - Website-Texte:     i18n/dictionaries/*.json   (5 Sprachen)
 *   - Fördercheck-Texte: components/foerdercheck/locales/*.json (DE/EN)
 *
 * Läuft automatisch bei jeder Änderung über die GitHub Action
 * (.github/workflows/validate-content.yml) – und lokal mit:
 *
 *     node scripts/validate-content.mjs
 *
 * Bricht mit Fehlercode ab, wenn eine Datei kein gültiges JSON ist,
 * damit eine kaputte Änderung nicht versehentlich veröffentlicht wird.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

/** Gruppen von Sprachdateien. Jede Gruppe nutzt eine Datei als Referenz. */
const GROUPS = [
  { dir: "i18n/dictionaries", reference: "de.json", label: "Website-Texte" },
  {
    dir: "components/foerdercheck/locales",
    reference: "de.json",
    label: "Fördercheck-Texte",
  },
];

function flatKeys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? flatKeys(v, `${prefix}${k}.`)
      : [`${prefix}${k}`],
  );
}

let hasError = false;

for (const group of GROUPS) {
  if (!existsSync(group.dir)) continue;

  const files = readdirSync(group.dir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const parsed = {};
  let groupError = false;

  /* 1) JSON-Syntax jeder Sprachdatei prüfen --------------------------------- */
  for (const file of files) {
    const path = join(group.dir, file);
    try {
      parsed[file] = JSON.parse(readFileSync(path, "utf8"));
    } catch (err) {
      hasError = true;
      groupError = true;
      console.error(`\n❌  ${path} ist kein gültiges JSON:`);
      console.error(`    ${err.message}`);
      console.error(
        `    → Meist fehlt ein Komma, ein Anführungszeichen " oder eine geschweifte Klammer { }.`,
      );
    }
  }

  if (groupError) continue; // Bei Syntaxfehler keine Struktur-Prüfung mehr

  /* 2) Gleiche Struktur (Schlüssel) in allen Sprachen der Gruppe prüfen ------ */
  const ref = parsed[group.reference];
  if (ref) {
    const refKeys = new Set(flatKeys(ref));
    for (const file of files) {
      if (file === group.reference) continue;
      const theseKeys = new Set(flatKeys(parsed[file]));
      const missing = [...refKeys].filter((k) => !theseKeys.has(k));
      const extra = [...theseKeys].filter((k) => !refKeys.has(k));
      if (missing.length || extra.length) {
        console.warn(
          `\n⚠️   ${group.dir}/${file} hat eine andere Struktur als ${group.reference}:`,
        );
        if (missing.length)
          console.warn(`     Fehlt hier:  ${missing.join(", ")}`);
        if (extra.length) console.warn(`     Zu viel:     ${extra.join(", ")}`);
        console.warn(
          `     (Kein Abbruch – aber an diesen Stellen könnte Text fehlen oder ungenutzt sein.)`,
        );
      }
    }
  }

  console.log(`✅  ${group.label}: ${files.length} Datei(en) – gültiges JSON.`);
}

if (hasError) {
  console.error(
    `\nBitte den Fehler oben korrigieren. Solange er besteht, wird die Änderung NICHT veröffentlicht.\n`,
  );
  process.exit(1);
}

console.log(`\n✅  Alle Inhalts-Dateien sind gültig.\n`);
