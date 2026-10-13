import { seeded } from "@/lib/random";

import styles from "./PaperTexture.module.css";

const TILE = 420;

/** Vermilion and indigo flecks like the risograph speckle of her old site, plus a fine paper grain. */
function flecks() {
  const rand = seeded(1307);
  return Array.from({ length: 150 }, () => {
    const red = rand() < 0.78;
    return {
      cx: +(rand() * TILE).toFixed(1),
      cy: +(rand() * TILE).toFixed(1),
      r: +(red ? 0.6 + rand() * 1.5 : 0.5 + rand() * 0.8).toFixed(2),
      fill: red ? "var(--vermilion)" : "var(--ink)",
      opacity: +(0.35 + rand() * 0.55).toFixed(2),
    };
  });
}

const dots = flecks();

export function PaperTexture() {
  return (
    <svg className={styles.texture} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="speckle" width={TILE} height={TILE} patternUnits="userSpaceOnUse">
          {dots.map((d, i) => (
            <circle key={i} {...d} />
          ))}
        </pattern>
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.07  0 0 0 0 0.3  0 0 0 0.55 0" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#speckle)" />
      <rect className={styles.grain} width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
