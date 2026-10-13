import styles from "./LatticeLines.module.css";

/** Fine diagonal lines at her rhombus angle, drawn in like a drafting pen. Purely decorative. */
export function LatticeLines({ className, count = 14 }: { className?: string; count?: number }) {
  const step = 1000 / (count / 2);
  return (
    <svg
      className={[styles.lines, className].filter(Boolean).join(" ")}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => {
        const x = -1000 + i * step;
        return (
          <g key={i} style={{ "--i": i } as React.CSSProperties}>
            <path pathLength={1} d={`M${x} 0 L${x + 705} 1000`} />
            <path pathLength={1} d={`M${x + 1705} 0 L${x + 1000} 1000`} />
          </g>
        );
      })}
    </svg>
  );
}
