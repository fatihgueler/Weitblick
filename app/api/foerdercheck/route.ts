import { NextResponse } from "next/server";
import {
  computeEstimate,
  formatEuro,
  getFunnelContent,
  type Answers,
} from "@/components/foerdercheck/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  contact?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  answers?: Answers;
  locale?: string;
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

/** Antwort-Werte in lesbare Labels übersetzen. */
function summarize(answers: Answers, locale: string): { q: string; a: string }[] {
  const { content } = getFunnelContent(locale);
  return content.questions
    .map((q) => {
      const selected = answers[q.id] ?? [];
      if (selected.length === 0) return null;
      const labels = selected.map(
        (v) => q.options.find((o) => o.value === v)?.label ?? v,
      );
      return { q: q.question, a: labels.join(", ") };
    })
    .filter((x): x is { q: string; a: string } => x !== null);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const contact = body.contact ?? {};
  const firstName = (contact.firstName ?? "").trim();
  const lastName = (contact.lastName ?? "").trim();
  const email = (contact.email ?? "").trim();
  const phone = (contact.phone ?? "").trim();
  const locale = body.locale === "en" ? "en" : "de";
  const answers = body.answers ?? {};

  if (!firstName || !lastName || !EMAIL_RE.test(email) || !phone) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  // Förderpotenzial serverseitig neu berechnen (Vertrauensgrenze).
  const estimate = computeEstimate(answers);
  const totalFmt = formatEuro(estimate.total, locale);
  const summary = summarize(answers, locale);
  const fullName = `${firstName} ${lastName}`;

  const subject = `Neuer Fördercheck-Lead: ${fullName} (bis zu ${totalFmt})`;

  const textLines = [
    `Neuer Fördercheck-Lead über enox`,
    ``,
    `Name:     ${fullName}`,
    `E-Mail:   ${email}`,
    `Telefon:  ${phone}`,
    `Sprache:  ${locale.toUpperCase()}`,
    ``,
    `Geschätztes Förderpotenzial: ${totalFmt}`,
    `  - ${getFunnelContent(locale).content.result.items.bafa}: ${formatEuro(estimate.bafa, locale)}`,
    `  - ${getFunnelContent(locale).content.result.items.kfw}: ${formatEuro(estimate.kfw, locale)}`,
    `  - ${getFunnelContent(locale).content.result.items.tax}: ${formatEuro(estimate.tax, locale)}`,
    ``,
    `Antworten:`,
    ...summary.map((s) => `  • ${s.q}\n    ${s.a}`),
    ``,
    `Meta: ${JSON.stringify(body.meta ?? {})}`,
  ];
  const text = textLines.join("\n");

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;color:#0f1a14">
    <div style="background:linear-gradient(135deg,#15803d,#22c55e);color:#fff;padding:24px;border-radius:16px 16px 0 0">
      <div style="font-size:12px;letter-spacing:2px;opacity:.85">ENOX · FÖRDERCHECK</div>
      <div style="font-size:22px;font-weight:800;margin-top:4px">Neuer Lead: ${escapeHtml(fullName)}</div>
      <div style="font-size:14px;margin-top:6px;opacity:.9">Geschätztes Potenzial: <b>${totalFmt}</b></div>
    </div>
    <div style="border:1px solid #e6efe8;border-top:none;border-radius:0 0 16px 16px;padding:24px">
      <table style="width:100%;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 0;color:#525d54">Name</td><td style="padding:6px 0;font-weight:600">${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding:6px 0;color:#525d54">E-Mail</td><td style="padding:6px 0;font-weight:600"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#525d54">Telefon</td><td style="padding:6px 0;font-weight:600"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
      </table>
      <h3 style="margin:20px 0 8px;font-size:14px">Antworten</h3>
      ${summary
        .map(
          (s) =>
            `<div style="margin-bottom:10px"><div style="color:#525d54;font-size:13px">${escapeHtml(
              s.q,
            )}</div><div style="font-weight:600">${escapeHtml(s.a)}</div></div>`,
        )
        .join("")}
      <p style="margin-top:20px;font-size:12px;color:#7a857d">Automatisch generiert vom ENOX-Fördercheck.</p>
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
          contact: { firstName, lastName, email, phone },
          estimate,
          answers: summary,
          locale,
          meta: body.meta ?? {},
        }),
      });
      results.webhook = res.ok ? "sent" : `error_${res.status}`;
    } catch (err) {
      console.error("[foerdercheck] Webhook exception", err);
      results.webhook = "error";
    }
  }

  // Fallback-Log, damit in der Demo nichts verloren geht.
  console.log("[foerdercheck] lead", {
    name: fullName,
    email,
    phone,
    total: estimate.total,
    results,
  });

  return NextResponse.json({ ok: true });
}
