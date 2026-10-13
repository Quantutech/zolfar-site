import styles from "./Logo.module.css";

type Props = {
  /** Draw the outline and glyph like a pen on first paint. */
  animate?: boolean;
  /** "solid" fills the inner rhombus (original mark); "line" keeps it hollow for dark grounds. */
  variant?: "solid" | "line";
  className?: string;
  title?: string;
};

/**
 * Zolfar's rhombus mark, redrawn from the original artwork (zh-logo_-01.png).
 * Coordinates are the original's pixel geometry, so the mark matches exactly.
 */
export function Logo({ animate = false, variant = "solid", className, title = "Zolfar" }: Props) {
  return (
    <svg
      className={[styles.logo, animate && styles.animate, styles[variant], className].filter(Boolean).join(" ")}
      viewBox="226 150 1198 1692"
      role="img"
      aria-label={title}
    >
      <path className={styles.outer} pathLength={1} d="M825 181 L1399 996 L825 1811 L251 996 Z" />
      <path className={styles.inner} d="M825 478 L1190 996 L825 1514 L460 996 Z" />
      <g className={styles.glyph}>
        <path pathLength={1} d="M826 686 L1044 996 L827 1305" />
        <path pathLength={1} d="M990 924 L939 996 L990 1068" />
        <path pathLength={1} d="M995 813 L1124 996 L906 1305" />
        <path pathLength={1} d="M973 782 L986 800" />
      </g>
      <path className={styles.dot} d="M825 971 L843 996 L825 1021 L807 996 Z" />
    </svg>
  );
}
