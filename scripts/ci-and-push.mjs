#!/usr/bin/env node
// Self-gating pipeline: patch dictionaries -> build -> (only on success) commit & push.
// Written to be safe to run blind: nothing is pushed unless the build passes.

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const BRANCH = "claude/sharp-clarke-BlfVA";

function log(msg) {
  console.log(`[pipeline] ${msg}`);
}

function run(cmd, opts = {}) {
  log(`$ ${cmd}`);
  return execSync(cmd, { cwd: ROOT, stdio: "inherit", ...opts });
}

/* 1) Ensure nav.foerdercheck exists in every dictionary (idempotent). */
const labels = {
  de: "Fördercheck",
  en: "Funding Check",
  zh: "补贴自查",
  es: "Chequeo de subvenciones",
  ru: "Проверка субсидий",
};
for (const [loc, label] of Object.entries(labels)) {
  const p = resolve(ROOT, `i18n/dictionaries/${loc}.json`);
  const json = JSON.parse(readFileSync(p, "utf8"));
  json.nav ??= {};
  if (json.nav.foerdercheck !== label) {
    json.nav.foerdercheck = label;
    writeFileSync(p, JSON.stringify(json, null, 2) + "\n", "utf8");
    log(`patched ${loc}.json nav.foerdercheck`);
  } else {
    log(`${loc}.json already has nav.foerdercheck`);
  }
}

/* 2) Build (this is the gate). */
try {
  run("npm run build");
  log("BUILD_OK");
} catch (e) {
  log("BUILD_FAILED");
  console.error(String(e?.message ?? e));
  process.exit(1);
}

/* 3) Commit & push only if there is something to commit. */
run(`git add -A`);
let hasChanges = true;
try {
  execSync("git diff --cached --quiet", { cwd: ROOT });
  hasChanges = false;
} catch {
  hasChanges = true;
}

if (!hasChanges) {
  log("NOTHING_TO_COMMIT");
  process.exit(0);
}

const msg = [
  "Add multilingual Fördercheck funnel for Enes Talha Aktürk",
  "",
  "- New /[lang]/foerdercheck route: animated multi-step funding-check funnel",
  "- Funding-potential estimate (BAFA/KfW/tax) with animated result breakdown",
  "- Lead capture (name, email, phone) posting to /api/foerdercheck",
  "- API route emails the lead (Resend) + optional webhook; booking link on success",
  "- Embed mode (?embed=1) hides header/footer/CTA for Linktree iframe embedding",
  "- Header/Footer/MobileMenu: Fördercheck highlighted in nav",
  "- DE/EN funnel copy, OG image, dictionary keys for all 5 locales",
].join("\n");

const escaped = msg.replace(/"/g, '\\"');
run(`git commit -m "${escaped}"`);
log("COMMITTED");

/* 4) Push with exponential backoff. */
const delays = [0, 2000, 4000, 8000, 16000];
let pushed = false;
for (let i = 0; i < delays.length; i++) {
  if (delays[i] > 0) {
    log(`retry push in ${delays[i]}ms`);
    execSync(`sleep ${delays[i] / 1000}`);
  }
  try {
    run(`git push -u origin ${BRANCH}`);
    pushed = true;
    break;
  } catch {
    log(`push attempt ${i + 1} failed`);
  }
}

log(pushed ? "PUSHED_OK" : "PUSH_FAILED");
process.exit(pushed ? 0 : 2);
