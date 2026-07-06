import { Resend } from "resend";

/**
 * Feste E-Mail-Rollen (siehe Resend-Domain-Setup für
 * weitblick-energieberatung.de). info@ ist nur eine Absender-Identität
 * ohne Postfach, kontakt@ ist das echte Postfach für interne Benachrichtigungen.
 */
export const FROM_EMAIL = "Weitblick Energieberatung <info@weitblick-energieberatung.de>";
export const KONTAKT_EMAIL = "kontakt@weitblick-energieberatung.de";

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function formatTimestampBerlin(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
