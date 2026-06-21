import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  meta?: Record<string, unknown>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const mailSubject = `Neue Kontaktanfrage: ${name}${subject ? ` (${subject})` : ""}`;

  const text = [
    `Neue Kontaktanfrage über Weitblick Energieberatung`,
    ``,
    `Name:     ${name}`,
    `E-Mail:   ${email}`,
    `Telefon:  ${phone || "–"}`,
    `Anliegen: ${subject || "–"}`,
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
        <tr><td style="padding:6px 0;color:#64748b">Name</td><td style="padding:6px 0;font-weight:600">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">E-Mail</td><td style="padding:6px 0;font-weight:600"><a href="mailto:${escapeHtml(email)}" style="color:#0b7063">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Telefon</td><td style="padding:6px 0;font-weight:600">${escapeHtml(phone || "–")}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Anliegen</td><td style="padding:6px 0;font-weight:600">${escapeHtml(subject || "–")}</td></tr>
      </table>
      <h3 style="margin:20px 0 8px;font-size:14px;color:#121f3a">Nachricht</h3>
      <div style="font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>
  </div>`;

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  if (resendKey && to && from) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()),
          reply_to: email,
          subject: mailSubject,
          html,
          text,
        }),
      });
      if (!res.ok) {
        console.error("[kontakt] Resend error", res.status, await res.text());
        return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
      }
    } catch (err) {
      console.error("[kontakt] Resend exception", err);
      return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
    }
  } else {
    console.warn("[kontakt] E-Mail nicht versendet – RESEND_API_KEY / LEAD_EMAIL_TO / LEAD_EMAIL_FROM fehlen.");
  }

  return NextResponse.json({ ok: true });
}
