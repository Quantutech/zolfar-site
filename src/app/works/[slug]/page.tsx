import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import { Reveal } from "@/components/Reveal";
import { Showcase } from "@/components/Showcase";
import { disciplines, getProject, neighbours, projects } from "@/content/projects";

import styles from "./page.module.css";

// Every slug is prerendered (ensureStatic = "navigation" in the root layout), so the page can read
// params up front; unknown slugs then 404 properly instead of streaming a soft not-found.
export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/works/${project.slug}` },
    openGraph: {
      title: `${project.title} — Zolfar`,
      description: project.summary,
      url: `/works/${project.slug}`,
      images: [{ url: project.cover.src.src, width: project.cover.src.width, height: project.cover.src.height, alt: project.cover.alt }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const d = disciplines[project.discipline];
  const { prev, next } = neighbours(project.slug);
  const [lead, ...paragraphs] = project.body;

  return (
    <article className={styles.project} style={{ "--accent": d.color, "--accent-ink": d.ink } as CSSProperties}>
      <header className={`wrap ${styles.head}`}>
        <p className={`mono ${styles.spine}`} aria-hidden="true">
          {project.kind} | {project.title}
        </p>
        <p className={`mono ${styles.meta}`}>
          <Link href="/works" className={styles.back}>
            ← Works
          </Link>
          <span>{project.no}</span>
          <span className={styles.chip}>{d.label}</span>
        </p>
        <h1 className={styles.title}>{project.title}</h1>
        {project.persian && (
          <p className={`fa ${styles.persian}`} lang="fa">
            {project.persian}
          </p>
        )}
        <p className={`serif ${styles.summary}`}>{project.summary}</p>
        <dl className={styles.facts}>
          <div>
            <dt className="mono">Kind</dt>
            <dd>{project.kind}</dd>
          </div>
          {project.facts.map((f) => (
            <div key={f.label}>
              <dt className="mono">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className={`wrap ${styles.stage}`}>
        <Showcase shots={[project.cover, ...project.gallery]} staging={project.staging} title={project.title} />
      </div>

      {lead && (
        <section className={`wrap ${styles.text}`} aria-label="About this project">
          <Reveal as="p" className={styles.lead}>
            {lead}
          </Reveal>
          <div className={styles.paragraphs}>
            {project.quote && (
              <Reveal as="blockquote" className={styles.quote} tilt={-2}>
                <p>{project.quote}</p>
              </Reveal>
            )}
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      <nav className={`wrap ${styles.pager}`} aria-label="More works">
        {[
          { p: prev, dir: "Previous" },
          { p: next, dir: "Next" },
        ].map(({ p, dir }) => (
          <Link
            key={dir}
            href={`/works/${p.slug}`}
            prefetch
            className={styles.pagerLink}
            style={{ "--accent": disciplines[p.discipline].color } as CSSProperties}
          >
            <span className={styles.pagerThumb} aria-hidden="true">
              <Image src={p.cover.src} alt="" sizes="160px" />
            </span>
            <span className={`mono ${styles.pagerDir}`}>
              {dir === "Previous" ? "←" : "→"} {dir} · {p.no}
            </span>
            <span className={styles.pagerTitle}>{p.title}</span>
          </Link>
        ))}
      </nav>
    </article>
  );
}
