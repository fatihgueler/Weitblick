import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ENOX Fördercheck";

export default async function OgImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const en = lang === "en";
  const title = en ? "Which funding are you entitled to?" : "Welche Förderung steht dir zu?";
  const badge = en ? "Free funding check" : "Kostenloser Fördercheck";
  const highlight = en ? "Up to 70% subsidy" : "Bis zu 70 % Zuschuss";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(900px 500px at 80% -10%, #16a34a 0%, rgba(22,163,74,0) 60%), linear-gradient(135deg, #0f1a14 0%, #14532d 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg,#22c55e,#15803d)",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            E
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: 2 }}>ENOX</span>
            <span style={{ fontSize: 16, color: "#86efac", letterSpacing: 4 }}>
              ENERGY CONSULTING
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              alignSelf: "flex-start",
              fontSize: 24,
              fontWeight: 700,
              color: "#bbf7d0",
              border: "2px solid rgba(187,247,208,0.4)",
              borderRadius: 999,
              padding: "8px 22px",
            }}
          >
            {badge}
          </span>
          <span style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>
            {title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "#0f1a14",
              background: "#4ade80",
              borderRadius: 999,
              padding: "14px 30px",
            }}
          >
            {highlight} →
          </div>
          <span style={{ fontSize: 24, color: "#d1fae5" }}>
            BAFA · KfW · {en ? "Tax bonus" : "Steuerbonus"}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
