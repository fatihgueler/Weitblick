import { NextResponse } from "next/server";
import { getAllLeads, getLeadsSince } from "@/lib/leads";
import { generateLeadsPdf } from "@/lib/leads-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Auth erfolgt bereits über middleware.ts (Basic Auth für /api/admin/:path*). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rangeParam = searchParams.get("range");
  const rangeDays = rangeParam && /^\d+$/.test(rangeParam) ? Number(rangeParam) : null;

  try {
    const leads = rangeDays
      ? await getLeadsSince(new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000))
      : await getAllLeads();

    const pdf = await generateLeadsPdf(leads);
    const datestamp = new Date().toISOString().slice(0, 10);
    const filename = `weitblick-leads${rangeDays ? `-${rangeDays}tage` : ""}-${datestamp}.pdf`;

    return new NextResponse(new Blob([new Uint8Array(pdf)], { type: "application/pdf" }), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("[admin/leads/pdf] Fehler beim PDF-Export", err);
    return NextResponse.json({ ok: false, error: "export_failed" }, { status: 500 });
  }
}
