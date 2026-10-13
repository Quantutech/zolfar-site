import type { CSSProperties } from "react";

import styles from "./Wordmark.module.css";

/**
 * ZOLFAR as cut-out letters, each pasted on a scrap of her palette —
 * a nod to the ransom-note lettering of her Political Impact Art flyer.
 */
const letters: { char: string; face: string; tone: string; tilt: number; lift: number }[] = [
  { char: "Z", face: "sans", tone: "orchid", tilt: -6, lift: 4 },
  { char: "O", face: "serif", tone: "ink", tilt: 4, lift: -6 },
  { char: "L", face: "sans", tone: "aqua", tilt: -2, lift: 8 },
  { char: "F", face: "mono", tone: "vermilion", tilt: 7, lift: -2 },
  { char: "A", face: "serif", tone: "saffron", tilt: -5, lift: 6 },
  { char: "R", face: "sans", tone: "paper", tilt: 3, lift: -4 },
];

export function Wordmark({ as: Tag = "h1" }: { as?: "h1" | "p" }) {
  return (
    <Tag className={styles.word} aria-label="Zolfar">
      {letters.map((l, i) => (
        <span
          key={l.char}
          aria-hidden="true"
          className={`${styles.scrap} ${styles[l.face]} ${styles[l.tone]}`}
          style={{ "--tilt": `${l.tilt}deg`, "--lift": `${l.lift}px`, "--i": i } as CSSProperties}
        >
          {l.char}
        </span>
      ))}
    </Tag>
  );
}
