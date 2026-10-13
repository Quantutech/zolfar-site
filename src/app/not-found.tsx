import Link from "next/link";

import { Logo } from "@/components/Logo";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={`wrap ${styles.page}`}>
      <Logo variant="line" className={styles.mark} />
      <p className="mono">404</p>
      <h1 className={styles.title}>This page slipped off the lattice.</h1>
      <Link href="/" className={styles.link}>
        Back to the works →
      </Link>
    </div>
  );
}
