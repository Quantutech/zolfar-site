"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { site } from "@/content/site";

import { Logo } from "./Logo";
import styles from "./Menu.module.css";

const links = [
  { href: "/works", label: "Works", note: "11 projects" },
  { href: "/about", label: "About", note: "architect & visuals" },
  { href: "/contact", label: "Contact", note: "say hiii!" },
];

/** Her signature round "menu +" button, opening a full-screen lilac sheet. */
export function Menu() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={styles.button}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.buttonText}>{open ? "close" : "menu"}</span>
        <span className={styles.sign} aria-hidden="true">
          {open ? "–" : "+"}
        </span>
      </button>

      <dialog
        ref={dialog}
        id="site-menu"
        className={styles.sheet}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className={styles.inner}>
          {/* first in the sheet so focus lands on it when the menu opens */}
          <button type="button" className={`${styles.button} ${styles.close}`} onClick={() => setOpen(false)}>
            <span className={styles.buttonText}>close</span>
            <span className={styles.sign} aria-hidden="true">
              –
            </span>
          </button>
          <svg className={styles.lattice} viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <g key={i}>
                <path pathLength={1} d={`M${-200 + i * 100} 0 L${200 + i * 100} 560`} />
                <path pathLength={1} d={`M${600 - i * 100} 0 L${200 - i * 100} 560`} />
              </g>
            ))}
          </svg>
          <nav className={styles.nav}>
            <ul>
              {links.map((l, i) => (
                <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
                  <Link
                    href={l.href}
                    className={styles.link}
                    aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className={styles.diamond} aria-hidden="true" />
                    <span className={styles.label}>{l.label}</span>
                    <span className={`mono ${styles.note}`}>{l.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.foot}>
            <Logo className={styles.mark} variant="solid" />
            <p className="mono">{site.tagline}</p>
            <p className={`fa ${styles.salam}`} lang="fa">
              سلام
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
