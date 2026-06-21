/**
 * Leichte, DSGVO-konforme Tracking-Vorbereitung.
 *
 * Es wird KEIN Tracker eingebaut. Wir pushen lediglich Events in den
 * dataLayer (falls vorhanden). Ein Tag-Manager/Consent-Tool kann diese
 * Events später aufgreifen – ohne Code-Änderung.
 */
type EventName =
  | "foerdercheck_open"
  | "foerdercheck_submit"
  | "contact_submit"
  | "tel_click"
  | "mail_click";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: EventName, data: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...data });
}
