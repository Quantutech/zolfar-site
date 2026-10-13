import styles from "./Ribbon.module.css";

const words = ["Architecture", "Logos", "Collage", "Watercolor", "Interiors", "Posters", "Acrylics", "Workshops", "Competitions"];

/** A woven band of what she makes, running like a kilim border. */
export function Ribbon() {
  const run = (hidden: boolean) => (
    <span className={styles.run} aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <span key={w} className={styles.item}>
          {w}
          <span className={styles.knot} aria-hidden="true" />
        </span>
      ))}
    </span>
  );
  return (
    <div className={styles.frame}>
      <div className={styles.ribbon}>
        <div className={styles.track}>
          {run(false)}
          {run(true)}
        </div>
      </div>
    </div>
  );
}
