import { NextResponse } from "next/server";
import { summarizeAnswers, estimateFunding, formatEuro, type FunnelData } from "@/components/foerdercheck/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = Partial<FunnelData> & {
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

  const firstName = (body.firstName ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!firstName || !lastName || !EMAIL_RE.test(email) || !phone) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const summary = summarizeAnswers(body);
  const estimate = estimateFunding(body);
  const fullName = `${firstName} ${lastName}`;
  const subject = `Neue Fördercheck-Anfrage: ${fullName}`;

  const textLines = [
    `Neue Fördercheck-Anfrage über Weitblick Energieberatung`,
    ``,
    `Name:     ${fullName}`,
    `E-Mail:   ${email}`,
    `Telefon:  ${phone}`,
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

  const results: Record<string, unknown> = {};

  // 1) E-Mail über Resend (https://resend.com) – konfigurierbar via ENV.
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
          subject,
          html,
          text,
        }),
      });
      results.email = res.ok ? "sent" : `error_${res.status}`;
      if (!res.ok) {
        console.error("[foerdercheck] Resend error", res.status, await res.text());
        return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
      }
    } catch (err) {
      console.error("[foerdercheck] Resend exception", err);
      return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
    }
  } else {
    results.email = "skipped_no_config";
    console.warn(
      "[foerdercheck] E-Mail nicht versendet – RESEND_API_KEY / LEAD_EMAIL_TO / LEAD_EMAIL_FROM fehlen.",
    );
  }

  // 2) Optionaler Webhook (Zapier / Make / CRM).
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
      results.webhook = res.ok ? "sent" : `error_${res.status}`;
    } catch (err) {
      console.error("[foerdercheck] Webhook exception", err);
      results.webhook = "error";
    }
  }

  console.log("[foerdercheck] lead", { name: fullName, email, phone, results });

  return NextResponse.json({ ok: true });
}
