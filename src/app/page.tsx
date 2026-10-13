import Image from "next/image";
import Link from "next/link";

import { LatticeLines } from "@/components/LatticeLines";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Ribbon } from "@/components/Ribbon";
import { Wordmark } from "@/components/Wordmark";
import { WorksExplorer } from "@/components/WorksExplorer";
import portrait from "@/content/media/brand/self-portrait.webp";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <LatticeLines />
        <p className={`mono ${styles.cornerL}`}>Archive of works — {String(projects.length).padStart(2, "0")}</p>
        <p className={`mono ${styles.cornerR}`}>Architecture · Graphics · Art · Collective</p>

        <div className={styles.center}>
          <Logo animate className={styles.heroLogo} />
          <Wordmark />
          <p className={`serif ${styles.sub}`}>
            Architect <span className={styles.amp}>&amp;</span> Visuals
          </p>
        </div>

        <p className={styles.statement}>
          <span className={`mono ${styles.statementLabel}`}>Statement</span>
          {site.statement}
        </p>
        <a href="#works" className={`mono ${styles.scroll}`}>
          scroll <span aria-hidden="true">↓</span>
        </a>
      </section>

      <Ribbon />

      <section className={`wrap ${styles.intro}`} aria-labelledby="intro-title">
        <Reveal as="h2" className={styles.introTitle}>
          <span id="intro-title">
            Licensed <mark className={styles.hlAqua}>architect</mark>, <mark className={styles.hlOrchid}>graphic</mark>{" "}
            designer, <mark className={styles.hlRed}>collage</mark> maker &amp; painter — and co-founder of{" "}
            <mark className={styles.hlSaffron}>ShurCollective</mark>, making political art in public space.
          </span>
        </Reveal>
        <Reveal className={styles.introSide} delay={150}>
          <p className="serif">{site.open}</p>
          <Link href="/about" className={styles.arrowLink}>
            More about Zolfar <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      <section id="works" className={`wrap ${styles.works}`} aria-labelledby="works-title">
        <header className={styles.worksHead}>
          <h2 id="works-title" className={styles.worksTitle}>
            Works<sup className="mono">{projects.length}</sup>
          </h2>
          <p className={`serif ${styles.worksNote}`}>
            woven like a kilim — pick a thread, or open the register.
          </p>
        </header>
        <WorksExplorer />
      </section>

      <section className={`wrap ${styles.portrait}`} aria-label="About Zolfar">
        <Reveal className={styles.portraitFigure} tilt={-4}>
          <Image
            src={portrait}
            alt="Self-portrait: a pencil drawing of Zolfar beside a field of ultramarine paint with gold Persian calligraphy"
            sizes="(min-width: 900px) 40vw, 90vw"
            placeholder="blur"
          />
        </Reveal>
        <Reveal className={styles.portraitText} delay={120}>
          <p className={`mono ${styles.kicker}`}>Self-portrait — pencil, acrylic, gold</p>
          <blockquote className={styles.quote}>
            <p>
              “My take on these backhanded ‘compliments’ is to make beautiful{" "}
              <em className="serif">humorous</em> art out of it.”
            </p>
          </blockquote>
          <Link href="/works/you-dont-look-afghani" className={styles.arrowLink}>
            You don’t look Afghani <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
