import { ImageResponse } from "next/og";

export const alt = "Weitblick Energieberatung – Energieberatung für Wohngebäude";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #192b51 0%, #0a1326 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              background: "#1f3666",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <div style={{ width: "26px", height: "26px", borderRadius: "999px", background: "#f2b441" }} />
            <div style={{ width: "34px", height: "3px", borderRadius: "999px", background: "#63e4c8" }} />
          </div>
          <div style={{ color: "#63e4c8", fontSize: "26px", letterSpacing: "6px", fontWeight: 700 }}>
            WEITBLICK ENERGIEBERATUNG
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "white", fontSize: "62px", fontWeight: 800, lineHeight: 1.1, maxWidth: "900px" }}>
            Energieberatung, Förderung & Sanierungsplanung für Ihr Wohngebäude
          </div>
          <div style={{ color: "#94a3b8", fontSize: "30px", marginTop: "28px" }}>
            Kostenloser Fördercheck · BAFA & KfW · Sanierungsfahrplan
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
