import type { Metadata } from "next";

import { WorksExplorer } from "@/components/WorksExplorer";
import { disciplines, projects, type Discipline } from "@/content/projects";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Works",
  description: "Architecture, logos and posters, collages and paintings, and political art workshops by Zolfar.",
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  const tally = (Object.keys(disciplines) as Discipline[]).map((d) => ({
    ...disciplines[d],
    key: d,
    n: projects.filter((p) => p.discipline === d).length,
  }));

  return (
    <div className={`wrap ${styles.page}`}>
      <header className={styles.head}>
        <p className="mono">Archive — {projects.length} works</p>
        <h1 className={styles.title}>Works</h1>
        <ul className={styles.tally}>
          {tally.map((t) => (
            <li key={t.key} style={{ "--c": t.color } as React.CSSProperties}>
              <span className={styles.n}>{String(t.n).padStart(2, "0")}</span>
              <span className="mono">{t.label}</span>
            </li>
          ))}
        </ul>
      </header>
      <WorksExplorer initialView="register" />
    </div>
  );
}
