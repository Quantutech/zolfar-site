import Link from "next/link";

import { Logo } from "./Logo";
import { Menu } from "./Menu";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.home} aria-label="Zolfar — home">
        <Logo className={styles.logo} />
      </Link>
      <Menu />
    </header>
  );
}
