import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono, Vazirmatn } from "next/font/google";

/** Display + body: a grotesque with ink-trap quirks that sits between drafting and punk zine. */
export const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
});

/** Poetic accents (italic quotes, "Architect & Visuals"). */
export const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
});

/** Drafting annotations: sheet numbers, labels, metadata. */
export const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
});

/** Persian lines that belong to her work (نان کار آزادی, سلام). */
export const persian = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-fa",
  preload: false,
});
