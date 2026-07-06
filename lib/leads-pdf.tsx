import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import type { Lead } from "@/lib/leads";
import { summarizeAnswers, type FunnelData } from "@/components/foerdercheck/content";
import { formatTimestampBerlin } from "@/lib/email";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 8, fontFamily: "Helvetica", color: "#1e293b" },
  title: { fontSize: 14, fontWeight: 700, marginBottom: 4 },
  subtitle: { fontSize: 9, color: "#64748b", marginBottom: 12 },
  headerRow: {
    flexDirection: "row",
    borderBottom: "1 solid #1e293b",
    paddingBottom: 4,
    marginBottom: 2,
    fontWeight: 700,
  },
  row: { flexDirection: "row", borderBottom: "1 solid #e2e8f0", paddingVertical: 4 },
  cellTimestamp: { width: "12%", paddingRight: 4 },
  cellType: { width: "8%", paddingRight: 4 },
  cellName: { width: "14%", paddingRight: 4 },
  cellContact: { width: "18%", paddingRight: 4 },
  cellStatus: { width: "8%", paddingRight: 4 },
  cellDetails: { width: "40%" },
});

function leadName(lead: Lead): string {
  if (lead.type === "kontakt") return String(lead.raw_data.name ?? "–");
  const first = lead.raw_data.firstName ? String(lead.raw_data.firstName) : "";
  const last = lead.raw_data.lastName ? String(lead.raw_data.lastName) : "";
  return `${first} ${last}`.trim() || "–";
}

function leadContact(lead: Lead): string {
  const email = lead.raw_data.email ? String(lead.raw_data.email) : "";
  const phone = lead.raw_data.phone ? String(lead.raw_data.phone) : "";
  return [email, phone].filter(Boolean).join(" · ") || "–";
}

function leadDetails(lead: Lead): string {
  if (lead.type === "kontakt") {
    const subject = lead.raw_data.subject ? String(lead.raw_data.subject) : "";
    const message = lead.raw_data.message ? String(lead.raw_data.message) : "";
    return [subject && `Anliegen: ${subject}`, message].filter(Boolean).join(" – ") || "–";
  }
  const summary = summarizeAnswers(lead.raw_data as Partial<FunnelData>);
  return summary.map((s) => `${s.q}: ${s.a}`).join("; ") || "–";
}

export async function generateLeadsPdf(leads: Lead[]): Promise<Buffer> {
  const doc = (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.title}>Weitblick Energieberatung – Lead-Export</Text>
        <Text style={styles.subtitle}>
          {leads.length} Lead(s) · erzeugt am {formatTimestampBerlin()}
        </Text>
        <View style={styles.headerRow}>
          <Text style={styles.cellTimestamp}>Zeitpunkt</Text>
          <Text style={styles.cellType}>Typ</Text>
          <Text style={styles.cellName}>Name</Text>
          <Text style={styles.cellContact}>Kontakt</Text>
          <Text style={styles.cellStatus}>Status</Text>
          <Text style={styles.cellDetails}>Details</Text>
        </View>
        {leads.map((lead) => (
          <View style={styles.row} key={lead.id} wrap={false}>
            <Text style={styles.cellTimestamp}>{formatTimestampBerlin(new Date(lead.created_at))}</Text>
            <Text style={styles.cellType}>{lead.type === "kontakt" ? "Kontakt" : "Fördercheck"}</Text>
            <Text style={styles.cellName}>{leadName(lead)}</Text>
            <Text style={styles.cellContact}>{leadContact(lead)}</Text>
            <Text style={styles.cellStatus}>{lead.status}</Text>
            <Text style={styles.cellDetails}>{leadDetails(lead)}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  return renderToBuffer(doc);
}
