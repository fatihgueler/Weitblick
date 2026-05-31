#!/usr/bin/env node
/**
 * Prüft die Inhalts-Dateien (i18n/dictionaries/*.json) auf Gültigkeit.
 *
 * Läuft automatisch bei jeder Änderung über die GitHub Action
 * (.github/workflows/validate-content.yml) – und lokal mit:
 *
 *     node scripts/validate-content.mjs
 *
 * Bricht mit Fehlercode ab, wenn eine Datei kein gültiges JSON ist,
 * damit eine kaputte Änderung nicht versehentlich veröffentlicht wird.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = "i18n/dictionaries";
const files = readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

let hasError = false;
const parsed = {};

/* 1) JSON-Syntax jeder Sprachdatei prüfen ------------------------------- */
for (const file of files) {
  const path = join(DIR, file);
  try {
    parsed[file] = JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    hasError = true;
    console.error(`\n❌  ${path} ist kein gültiges JSON:`);
    console.error(`    ${err.message}`);
    console.error(
      `    → Meist fehlt ein Komma, ein Anführungszeichen " oder eine geschweifte Klammer { }.`,
    );
  }
}

if (hasError) {
  console.error(
    `\nBitte den Fehler oben korrigieren. Solange er besteht, wird die Änderung NICHT veröffentlicht.\n`,
  );
  process.exit(1);
}

/* 2) Gleiche Struktur (Schlüssel) in allen Sprachen prüfen -------------- */
function flatKeys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? flatKeys(v, `${prefix}${k}.`)
      : [`${prefix}${k}`],
  );
}

const reference = "de.json";
if (parsed[reference]) {
  const refKeys = new Set(flatKeys(parsed[reference]));
  for (const file of files) {
    if (file === reference) continue;
    const theseKeys = new Set(flatKeys(parsed[file]));
    const missing = [...refKeys].filter((k) => !theseKeys.has(k));
    const extra = [...theseKeys].filter((k) => !refKeys.has(k));
    if (missing.length || extra.length) {
      console.warn(`\n⚠️   ${file} hat eine andere Struktur als ${reference}:`);
      if (missing.length)
        console.warn(`     Fehlt hier:  ${missing.join(", ")}`);
      if (extra.length)
        console.warn(`     Zu viel:     ${extra.join(", ")}`);
      console.warn(
        `     (Kein Abbruch – aber an diesen Stellen könnte Text fehlen oder ungenutzt sein.)`,
      );
    }
  }
}

console.log(`\n✅  Alle ${files.length} Sprachdateien sind gültiges JSON.\n`);
