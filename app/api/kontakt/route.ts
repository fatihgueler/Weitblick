import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/leads";
import { escapeHtml, formatTimestampBerlin, getResendClient, FROM_EMAIL, KONTAKT_EMAIL } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const payloadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1),
  meta: z.record(z.string(), z.unknown()).optional(),
});

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
  const { name, email, phone, subject, message } = parsed.data;
  const timestamp = formatTimestampBerlin();

  const mailSubject = "Neue Kontaktanfrage";

  const text = [
    `Neue Kontaktanfrage über Weitblick Energieberatung`,
    ``,
    `Zeitpunkt: ${timestamp}`,
    `Name:      ${name}`,
    `E-Mail:    ${email}`,
    `Telefon:   ${phone || "–"}`,
    `Anliegen:  ${subject || "–"}`,
    ``,
    `Nachricht:`,
    message,
  ].join("\n");

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;color:#1e293b">
    <div style="background:linear-gradient(135deg,#1f3666,#121f3a);color:#fff;padding:24px;border-radius:16px 16px 0 0">
      <div style="font-size:12px;letter-spacing:2px;color:#63e4c8">WEITBLICK · KONTAKT</div>
      <div style="font-size:22px;font-weight:800;margin-top:4px">Neue Anfrage: ${escapeHtml(name)}</div>
    </div>
    <div style="border:1px solid #e0e7f0;border-top:none;border-radius:0 0 16px 16px;padding:24px">
      <table style="width:100%;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 0;color:#64748b">Zeitpunkt</td><td style="padding:6px 0;font-weight:600">${escapeHtml(timestamp)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Name</td><td style="padding:6px 0;font-weight:600">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">E-Mail</td><td style="padding:6px 0;font-weight:600"><a href="mailto:${escapeHtml(email)}" style="color:#0b7063">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Telefon</td><td style="padding:6px 0;font-weight:600">${escapeHtml(phone || "–")}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Anliegen</td><td style="padding:6px 0;font-weight:600">${escapeHtml(subject || "–")}</td></tr>
      </table>
      <h3 style="margin:20px 0 8px;font-size:14px;color:#121f3a">Nachricht</h3>
      <div style="font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>
  </div>`;

  const resend = getResendClient();
  if (resend) {
    try {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: KONTAKT_EMAIL,
        replyTo: email,
        subject: mailSubject,
        html,
        text,
      });
      if (error) {
        console.error("[kontakt] Resend error", error);
        return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
      }
    } catch (err) {
      console.error("[kontakt] Resend exception", err);
      return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
    }
  } else {
    console.warn("[kontakt] E-Mail nicht versendet – RESEND_API_KEY fehlt.");
  }

  try {
    await createLead("kontakt", parsed.data);
  } catch (err) {
    console.error("[kontakt] Lead-Persistierung fehlgeschlagen", err);
  }

  return NextResponse.json({ ok: true });
}
