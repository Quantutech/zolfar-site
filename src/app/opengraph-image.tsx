import { ImageResponse } from "next/og";

export const alt = "Zolfar — Architect & Visuals";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const palette = ["#eca2fc", "#9ad6d8", "#ff4f24", "#f2c230", "#191151"];

/** Share card: a band of her lattice diamonds over cream paper, with the name in cut-out scraps. */
export default function OpengraphImage() {
  const letters = ["Z", "O", "L", "F", "A", "R"];
  const tones = [
    ["#eca2fc", "#191151"],
    ["#191151", "#f5ede3"],
    ["#9ad6d8", "#191151"],
    ["#ff4f24", "#f5ede3"],
    ["#f2c230", "#191151"],
    ["#fffaf2", "#191151"],
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5ede3",
          padding: "56px 64px",
          color: "#191151",
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          {Array.from({ length: 14 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 60,
                height: 85,
                background: palette[i % palette.length],
                clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                display: "flex",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {letters.map((l, i) => (
            <div
              key={l}
              style={{
                display: "flex",
                fontSize: 170,
                fontWeight: 800,
                lineHeight: 1,
                padding: "6px 18px 0",
                background: tones[i][0],
                color: tones[i][1],
                transform: `rotate(${[-5, 4, -2, 6, -4, 3][i]}deg)`,
                border: i === 5 ? "4px solid #191151" : "none",
              }}
            >
              {l}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34 }}>
          <div style={{ display: "flex" }}>Architect &amp; Visuals</div>
          <div style={{ display: "flex", letterSpacing: 4, fontSize: 24 }}>ARCHITECTURE · GRAPHICS · ART · COLLECTIVE</div>
        </div>
      </div>
    ),
    size,
  );
}
