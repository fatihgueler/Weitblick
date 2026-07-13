import { NextResponse } from "next/server";
import { getFoerdercheckLeads } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Temporäre Diagnose-Route zur Fehlersuche – danach wieder entfernen. */
export async function GET() {
  try {
    const leads = await getFoerdercheckLeads();
    const latest = leads[0] ?? null;
    return NextResponse.json({
      count: leads.length,
      latest: latest
        ? {
            id: latest.id,
            created_at: latest.created_at,
            status: latest.status,
            raw_data_typeof: typeof latest.raw_data,
            raw_data_is_array: Array.isArray(latest.raw_data),
            raw_data_keys: latest.raw_data && typeof latest.raw_data === "object" ? Object.keys(latest.raw_data) : null,
            raw_data: latest.raw_data,
          }
        : null,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
