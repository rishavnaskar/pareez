import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.legalName} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          backgroundColor: "#0a0908",
          backgroundImage:
            "radial-gradient(800px circle at 80% 20%, rgba(244,103,15,0.35), rgba(10,9,8,0) 60%)",
          color: "#faf7f2",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: 14,
          }}
        >
          <span>PAREE</span>
          <span style={{ color: "#f4670f" }}>Z</span>
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#cfc9c0",
          }}
        >
          Unisex Professional Salon
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 44,
            fontStyle: "italic",
            color: "#ff8a3d",
          }}
        >
          {SITE.tagline}
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "#cfc9c0" }}>
          {`Garfa · Jadavpur — Kolkata | Rated ${SITE.rating.value}/5 (${SITE.rating.count}+ reviews)`}
        </div>
      </div>
    ),
    size,
  );
}
