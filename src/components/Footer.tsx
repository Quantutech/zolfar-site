import Link from "next/link";

import { site } from "@/content/site";

import { Logo } from "./Logo";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/contact" className={styles.cta}>
        <span className={`serif ${styles.small}`}>wanna grab a coffee? drop a line —</span>
        <span className={styles.big}>
          say hiii<span className={styles.bang}>!</span>
        </span>
      </Link>
      <div className={styles.band} aria-hidden="true" />
      <div className={`wrap ${styles.base}`}>
        <Logo className={styles.mark} />
        <p className="mono">{site.name} — {site.tagline}</p>
        <nav aria-label="Footer">
          <ul className={styles.links}>
            <li>
              <Link href="/works">Works</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
