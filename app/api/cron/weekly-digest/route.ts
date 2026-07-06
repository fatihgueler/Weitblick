import { NextResponse } from "next/server";
import { getLeadsSince, type Lead } from "@/lib/leads";
import { escapeHtml, formatTimestampBerlin, getResendClient, FROM_EMAIL, KONTAKT_EMAIL } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Zeitplan in vercel.json: "0 6 * * 1" (Montag 06:00 UTC). Vercel Cron läuft
 * nur in UTC ohne DST-Umrechnung; 06:00 UTC entspricht 08:00 Uhr Europe/Berlin
 * während der Sommerzeit (CEST) und 07:00 Uhr während der Winterzeit (CET).
 */

/** Vercel Cron sendet automatisch `Authorization: Bearer $CRON_SECRET`, wenn die Env-Variable gesetzt ist. */
function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  let leads: Lead[];
  try {
    leads = await getLeadsSince(since);
  } catch (err) {
    console.error("[weekly-digest] Fehler beim Laden der Leads", err);
    return NextResponse.json({ ok: false, error: "db_failed" }, { status: 500 });
  }

  const resend = getResendClient();
  if (!resend) {
    console.warn("[weekly-digest] E-Mail nicht versendet – RESEND_API_KEY fehlt.");
    return NextResponse.json({ ok: false, error: "no_resend_config" }, { status: 500 });
  }

  const { text, html } = buildDigest(leads);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: KONTAKT_EMAIL,
      subject: "Wochen-Digest: Leads der letzten Woche",
      html,
      text,
    });
    if (error) {
      console.error("[weekly-digest] Resend error", error);
      return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[weekly-digest] Resend exception", err);
    return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, count: leads.length });
}

function leadName(lead: Lead): string {
  const raw = lead.raw_data;
  if (lead.type === "kontakt") return String(raw.name ?? "–");
  const first = raw.firstName ? String(raw.firstName) : "";
  const last = raw.lastName ? String(raw.lastName) : "";
  return `${first} ${last}`.trim() || "–";
}

function leadContact(lead: Lead): string {
  return String(lead.raw_data.email ?? "–");
}

function buildDigest(leads: Lead[]): { text: string; html: string } {
  if (leads.length === 0) {
    return {
      text: "Keine neuen Leads in den letzten 7 Tagen.",
      html: `<p style="font-family:Inter,Arial,sans-serif;color:#1e293b">Keine neuen Leads in den letzten 7 Tagen.</p>`,
    };
  }

  const rows = leads.map((lead) => ({
    zeitpunkt: formatTimestampBerlin(new Date(lead.created_at)),
    typ: lead.type === "kontakt" ? "Kontakt" : "Fördercheck",
    name: leadName(lead),
    kontakt: leadContact(lead),
    status: lead.status,
  }));

  const text = [
    `Wochen-Digest: ${leads.length} Lead(s) der letzten 7 Tage`,
    ``,
    ...rows.map((r) => `• [${r.typ}] ${r.zeitpunkt} – ${r.name} (${r.kontakt}) – Status: ${r.status}`),
  ].join("\n");

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;color:#1e293b">
    <div style="background:linear-gradient(135deg,#1f3666,#121f3a);color:#fff;padding:24px;border-radius:16px 16px 0 0">
      <div style="font-size:12px;letter-spacing:2px;color:#63e4c8">WEITBLICK · WOCHEN-DIGEST</div>
      <div style="font-size:22px;font-weight:800;margin-top:4px">${leads.length} Lead(s) der letzten 7 Tage</div>
    </div>
    <div style="border:1px solid #e0e7f0;border-top:none;border-radius:0 0 16px 16px;padding:24px">
      <table style="width:100%;font-size:13px;border-collapse:collapse">
        <thead>
          <tr style="text-align:left;color:#64748b">
            <th style="padding:6px 8px 6px 0">Zeitpunkt</th>
            <th style="padding:6px 8px">Typ</th>
            <th style="padding:6px 8px">Name</th>
            <th style="padding:6px 8px">Kontakt</th>
            <th style="padding:6px 0">Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (r) => `<tr style="border-top:1px solid #e0e7f0">
                <td style="padding:6px 8px 6px 0">${escapeHtml(r.zeitpunkt)}</td>
                <td style="padding:6px 8px">${escapeHtml(r.typ)}</td>
                <td style="padding:6px 8px;font-weight:600">${escapeHtml(r.name)}</td>
                <td style="padding:6px 8px"><a href="mailto:${escapeHtml(r.kontakt)}" style="color:#0b7063">${escapeHtml(r.kontakt)}</a></td>
                <td style="padding:6px 0">${escapeHtml(r.status)}</td>
              </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  </div>`;

  return { text, html };
}
