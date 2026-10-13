import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { LatticeLines } from "@/components/LatticeLines";
import { Reveal } from "@/components/Reveal";
import portrait from "@/content/media/brand/self-portrait.webp";
import { disciplines } from "@/content/projects";
import { practice, site } from "@/content/site";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zolfar is a licensed architect, graphic designer, collage maker and painter, and co-founder of ShurCollective.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.portrait}>
          <LatticeLines count={10} />
          <Image
            src={portrait}
            alt="Self-portrait: a pencil drawing of Zolfar beside a field of ultramarine paint with gold Persian calligraphy"
            sizes="(min-width: 960px) 44vw, 92vw"
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className={styles.intro}>
          <p className={`mono ${styles.kicker}`}>About</p>
          <h1 className={styles.title}>
            My name is <span className={styles.name}>Zolfar</span>.
          </h1>
          <p className={`serif ${styles.sub}`}>My recent work experience:</p>
        </div>
      </section>

      <section className={`wrap ${styles.practice}`} aria-label="Practice">
        <ol className={styles.threads}>
          {practice.map((p, i) => {
            const color = p.thread === "practice" ? "var(--paper-deep)" : disciplines[p.thread].color;
            return (
              <Reveal
                as="li"
                key={p.role}
                className={styles.thread}
                delay={i * 70}
                style={{ "--c": color } as CSSProperties}
              >
                <span className={`mono ${styles.idx}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.role}>{p.role}</span>
                {p.detail && <span className={`serif ${styles.detail}`}>{p.detail}</span>}
              </Reveal>
            );
          })}
        </ol>
      </section>

      <section className={`wrap ${styles.open}`}>
        <Reveal as="p" className={styles.openText} tilt={-2}>
          {site.open}
        </Reveal>
        <div className={styles.links}>
          <Link href="/contact" className={styles.button}>
            Let’s talk
          </Link>
          <Link href="/works" className={styles.ghost}>
            See the works →
          </Link>
        </div>
      </section>
    </div>
  );
}
