import type { Metadata } from "next";

import { LatticeLines } from "@/components/LatticeLines";

import { ContactForm } from "./ContactForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Wanna grab a coffee? Drop Zolfar a line about architecture, design, art or a collaboration.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <LatticeLines count={12} />
        <p className={`fa ${styles.salam}`} lang="fa">
          سلام
        </p>
        <h1 className={styles.title}>
          say hiii<span className={styles.bang}>!</span>
        </h1>
        <p className={`serif ${styles.sub}`}>wanna grab a coffee, drop a line</p>
      </section>
      <section className={`wrap ${styles.formWrap}`} aria-label="Contact form">
        <ContactForm />
      </section>
    </div>
  );
}
