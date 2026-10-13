import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Branded deel-afbeelding (1200x630) voor WhatsApp, Facebook, LinkedIn, X enz. Geldt via de
// Next.js-bestandsconventie automatisch voor alle routes; twitter-image.tsx hergebruikt dit beeld.
export const alt = "Rijschool Drive More — persoonlijke rijlessen in Dordrecht en omgeving";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "drivemorelogo.jpeg"));
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#0E1320",
          padding: "0 80px",
          gap: 64,
          position: "relative",
        }}
      >
        {/* Rood/blauwe accentbalk onderaan, zoals de huisstijl */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 14,
            display: "flex",
            background: "linear-gradient(90deg, #E11D28, #1B4FD1)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={340} height={340} alt="" style={{ borderRadius: 170 }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 600,
            }}
          >
            Rijschool Drive More
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 18,
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.08,
              color: "#ffffff",
            }}
          >
            <span>Rijles die past bij</span>
            <span style={{ color: "#ff4d57" }}>jou, niet andersom.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.82)", lineHeight: 1.4 }}>
            Schakel & automaat · Geen wachtlijst · Dordrecht e.o.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
