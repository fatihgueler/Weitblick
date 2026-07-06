import { NextResponse } from "next/server";
import { z } from "zod";
import { summarizeAnswers, estimateFunding, formatEuro, type FunnelData } from "@/components/foerdercheck/content";
import { createLead } from "@/lib/leads";
import { escapeHtml, formatTimestampBerlin, getResendClient, FROM_EMAIL, KONTAKT_EMAIL } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const payloadSchema = z.object({
  building: z.string().min(1),
  measures: z.array(z.string()).default([]),
  year: z.string().min(1),
  usage: z.string().min(1),
  plz: z.string().min(1),
  ort: z.string().min(1),
  timing: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

/**
 * Kein Feld für Heizungsalter vorhanden – als nächstbeste Näherung gilt ein
 * Gebäude als "hoher Handlungsdruck", wenn es vor 1996 gebaut wurde (Baujahr
 * "vor1977" oder "1977_1995"), da die Heizungsanlage in diesen Fällen
 * erfahrungsgemäß mindestens so alt wie das Gebäude und damit über 20 Jahre
 * alt ist.
 */
const URGENT_YEARS = new Set(["vor1977", "1977_1995"]);

function isUrgent(data: Pick<FunnelData, "year">): boolean {
  return URGENT_YEARS.has(data.year);
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }
  const body = parsed.data;
  const { firstName, lastName, email, phone, message } = body;
  const timestamp = formatTimestampBerlin();

  const summary = summarizeAnswers(body);
  const estimate = estimateFunding(body);
  const fullName = `${firstName} ${lastName}`;
  const urgent = isUrgent(body);
  const subject = urgent ? "🔥 Hoher Handlungsdruck – Neuer Fördercheck-Lead" : "Neuer Fördercheck-Lead";

  const textLines = [
    `Neue Fördercheck-Anfrage über Weitblick Energieberatung`,
    ``,
    `Zeitpunkt: ${timestamp}`,
    `Name:      ${fullName}`,
    `E-Mail:    ${email}`,
    `Telefon:   ${phone}`,
    ``,
    `Angaben:`,
    ...summary.map((s) => `  • ${s.q}\n    ${s.a}`),
    ``,
    `Erste Förder-Einschätzung (Beispielwerte, unverbindlich):`,
    ...estimate.items.map((i) => `  • ${i.label}: ${formatEuro(i.min)}–${formatEuro(i.max)}`),
    estimate.items.length > 0 ? `  Gesamt: ${formatEuro(estimate.totalMin)}–${formatEuro(estimate.totalMax)}` : `  Keine Maßnahmen ausgewählt.`,
    ``,
    message ? `Nachricht:\n${message}` : `Nachricht: –`,
    ``,
    `Meta: ${JSON.stringify(body.meta ?? {})}`,
  ];
  const text = textLines.join("\n");

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;color:#1e293b">
    <div style="background:linear-gradient(135deg,#1f3666,#121f3a);color:#fff;padding:24px;border-radius:16px 16px 0 0">
      <div style="font-size:12px;letter-spacing:2px;color:#63e4c8">WEITBLICK · FÖRDERCHECK</div>
      <div style="font-size:22px;font-weight:800;margin-top:4px">Neue Anfrage: ${escapeHtml(fullName)}</div>
    </div>
    <div style="border:1px solid #e0e7f0;border-top:none;border-radius:0 0 16px 16px;padding:24px">
      <table style="width:100%;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 0;color:#64748b">Zeitpunkt</td><td style="padding:6px 0;font-weight:600">${escapeHtml(timestamp)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Name</td><td style="padding:6px 0;font-weight:600">${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">E-Mail</td><td style="padding:6px 0;font-weight:600"><a href="mailto:${escapeHtml(email)}" style="color:#0b7063">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Telefon</td><td style="padding:6px 0;font-weight:600"><a href="tel:${escapeHtml(phone)}" style="color:#0b7063">${escapeHtml(phone)}</a></td></tr>
      </table>
      <h3 style="margin:20px 0 8px;font-size:14px;color:#121f3a">Angaben</h3>
      ${summary
        .map(
          (s) =>
            `<div style="margin-bottom:10px"><div style="color:#64748b;font-size:13px">${escapeHtml(
              s.q,
            )}</div><div style="font-weight:600">${escapeHtml(s.a)}</div></div>`,
        )
        .join("")}
      <h3 style="margin:20px 0 8px;font-size:14px;color:#121f3a">Erste Förder-Einschätzung</h3>
      ${estimate.items.map((i) => `<div style="margin-bottom:6px;font-size:13px;display:flex;justify-content:space-between"><span style="color:#334155">${escapeHtml(i.label)}</span><span style="font-weight:600;color:#0b7063">${escapeHtml(formatEuro(i.min))}–${escapeHtml(formatEuro(i.max))}</span></div>`).join("")}
      ${estimate.items.length > 0 ? `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #e0e7f0;font-size:13px;font-weight:700;display:flex;justify-content:space-between"><span>Gesamt</span><span style="color:#0b7063">${escapeHtml(formatEuro(estimate.totalMin))}–${escapeHtml(formatEuro(estimate.totalMax))}</span></div>` : ""}
      <div style="margin-top:4px;font-size:11px;color:#94a3b8">Beispielwerte auf Basis BEG/BAFA (Stand 2025), unverbindlich.</div>
      ${
        message
          ? `<h3 style="margin:20px 0 8px;font-size:14px;color:#121f3a">Nachricht</h3><div style="font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</div>`
          : ""
      }
      <p style="margin-top:20px;font-size:12px;color:#94a3b8">Automatisch generiert vom Weitblick-Fördercheck.</p>
    </div>
  </div>`;

  const resend = getResendClient();
  if (resend) {
    try {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: KONTAKT_EMAIL,
        replyTo: email,
        subject,
        html,
        text,
      });
      if (error) {
        console.error("[foerdercheck] Resend error", error);
        return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
      }
    } catch (err) {
      console.error("[foerdercheck] Resend exception", err);
      return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
    }

    try {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: KONTAKT_EMAIL,
        subject: "Ihre Fördercheck-Anfrage bei Weitblick Energieberatung",
        html: confirmationHtml(firstName, lastName),
        text: confirmationText(firstName, lastName),
      });
      if (error) {
        console.error("[foerdercheck] Bestätigungsmail-Fehler", error);
      }
    } catch (err) {
      console.error("[foerdercheck] Bestätigungsmail-Exception", err);
    }
  } else {
    console.warn("[foerdercheck] E-Mail nicht versendet – RESEND_API_KEY fehlt.");
  }

  // Optionaler Webhook (Zapier / Make / CRM).
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: { firstName, lastName, email, phone, message },
          answers: summary,
          meta: body.meta ?? {},
        }),
      });
      if (!res.ok) console.error("[foerdercheck] Webhook error", res.status);
    } catch (err) {
      console.error("[foerdercheck] Webhook exception", err);
    }
  }

  try {
    await createLead("foerdercheck", body);
  } catch (err) {
    console.error("[foerdercheck] Lead-Persistierung fehlgeschlagen", err);
  }

  return NextResponse.json({ ok: true });
}

function confirmationText(firstName: string, lastName: string): string {
  return [
    `Sehr geehrte(r) ${firstName} ${lastName},`,
    ``,
    `vielen Dank für Ihre Anfrage über den Fördercheck von Weitblick Energieberatung.`,
    `Wir haben Ihre Angaben sorgfältig erfasst und werden diese zeitnah prüfen. Ein Berater aus unserem Team meldet sich in Kürze persönlich bei Ihnen, um die möglichen nächsten Schritte und Fördermöglichkeiten für Ihr Vorhaben zu besprechen.`,
    ``,
    `Bei Rückfragen erreichen Sie uns jederzeit unter kontakt@weitblick-energieberatung.de.`,
    ``,
    `Mit freundlichen Grüßen`,
    `Ihr Team von Weitblick Energieberatung`,
  ].join("\n");
}

function confirmationHtml(firstName: string, lastName: string): string {
  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:480px;margin:auto;color:#1e293b;font-size:15px;line-height:1.6">
    <p>Sehr geehrte(r) ${escapeHtml(firstName)} ${escapeHtml(lastName)},</p>
    <p>vielen Dank für Ihre Anfrage über den Fördercheck von Weitblick Energieberatung. Wir haben Ihre Angaben sorgfältig erfasst und werden diese zeitnah prüfen. Ein Berater aus unserem Team meldet sich in Kürze persönlich bei Ihnen, um die möglichen nächsten Schritte und Fördermöglichkeiten für Ihr Vorhaben zu besprechen.</p>
    <p>Bei Rückfragen erreichen Sie uns jederzeit unter <a href="mailto:kontakt@weitblick-energieberatung.de" style="color:#0b7063">kontakt@weitblick-energieberatung.de</a>.</p>
    <p>Mit freundlichen Grüßen<br/>Ihr Team von Weitblick Energieberatung</p>
  </div>`;
}
