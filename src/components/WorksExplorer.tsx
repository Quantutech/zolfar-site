"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { disciplines, projects, type Discipline } from "@/content/projects";
import { patterns, place } from "@/lib/lattice";

import styles from "./WorksExplorer.module.css";

type Filter = Discipline | "all";
type View = "lattice" | "register";

const layouts = {
  lg: place(projects.length, patterns.lg),
  md: place(projects.length, patterns.md),
  sm: place(projects.length, patterns.sm),
};

const filters: Filter[] = ["all", "architecture", "graphics", "art", "collective"];

export function WorksExplorer({ initialView = "lattice" }: { initialView?: View }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>(initialView);
  const counts = Object.fromEntries(
    filters.map((f) => [f, f === "all" ? projects.length : projects.filter((p) => p.discipline === f).length]),
  );

  return (
    <div className={styles.explorer}>
      <div className={styles.controls}>
        <div className={styles.threads} role="group" aria-label="Filter works by discipline">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={styles.thread}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              style={{ "--thread": f === "all" ? "var(--ink)" : disciplines[f].color } as CSSProperties}
            >
              <span className={styles.swatch} aria-hidden="true" />
              {f === "all" ? "All" : disciplines[f].label}
              <sup className={styles.count}>{counts[f]}</sup>
            </button>
          ))}
        </div>
        <div className={styles.views} role="group" aria-label="Layout">
          {(["lattice", "register"] as const).map((v) => (
            <button key={v} type="button" className={styles.view} aria-pressed={view === v} onClick={() => setView(v)}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "lattice" ? <Lattice filter={filter} /> : <Register filter={filter} />}
    </div>
  );
}

function Lattice({ filter }: { filter: Filter }) {
  return (
    <ul
      className={styles.lattice}
      style={
        {
          "--cols-lg": layouts.lg.columns,
          "--cols-md": layouts.md.columns,
          "--cols-sm": layouts.sm.columns,
        } as CSSProperties
      }
    >
      {projects.map((p, i) => {
        const on = filter === "all" || p.discipline === filter;
        const pos = {
          "--c-lg": layouts.lg.cells[i].col,
          "--r-lg": layouts.lg.cells[i].row,
          "--c-md": layouts.md.cells[i].col,
          "--r-md": layouts.md.cells[i].row,
          "--c-sm": layouts.sm.cells[i].col,
          "--r-sm": layouts.sm.cells[i].row,
          "--accent": disciplines[p.discipline].color,
          "--delay": `${i * 60}ms`,
        } as CSSProperties;
        return (
          <li key={p.slug} className={styles.cell} style={pos} data-on={on}>
            <Link
              href={`/works/${p.slug}`}
              prefetch
              className={styles.diamond}
              tabIndex={on ? undefined : -1}
              aria-hidden={on ? undefined : true}
            >
              <Image
                src={(p.thumb ?? p.cover).src}
                alt=""
                placeholder="blur"
                sizes="(min-width: 1100px) 300px, (min-width: 640px) 34vw, 50vw"
                className={styles.image}
                style={{ objectPosition: p.thumb?.position }}
              />
              <span className={styles.wash} aria-hidden="true" />
              <span className={styles.label}>
                <span className={`mono ${styles.no}`}>{p.no}</span>
                <span className={styles.title}>{p.title}</span>
                <span className={`mono ${styles.kind}`}>{p.kind}</span>
              </span>
            </Link>
            <svg className={styles.outline} viewBox="0 0 100 141.8" preserveAspectRatio="none" aria-hidden="true">
              <polygon points="50,1 99,70.9 50,140.8 1,70.9" vectorEffect="non-scaling-stroke" />
            </svg>
          </li>
        );
      })}
    </ul>
  );
}

function Register({ filter }: { filter: Filter }) {
  const [hover, setHover] = useState<string | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const shown = projects.filter((p) => filter === "all" || p.discipline === filter);
  const active = projects.find((p) => p.slug === hover);

  function follow(e: PointerEvent) {
    preview.current?.style.setProperty("--x", `${e.clientX}px`);
    preview.current?.style.setProperty("--y", `${e.clientY}px`);
  }

  return (
    <div className={styles.registerWrap} onPointerMove={follow}>
      <ol className={styles.register}>
        {shown.map((p) => (
          <li key={p.slug} style={{ "--accent": disciplines[p.discipline].color } as CSSProperties}>
            <Link
              href={`/works/${p.slug}`}
              prefetch
              className={styles.row}
              onPointerEnter={() => setHover(p.slug)}
              onPointerLeave={() => setHover(null)}
            >
              <span className={`mono ${styles.rowNo}`}>{p.no}</span>
              <span className={styles.rowThumb} aria-hidden="true">
                <Image src={(p.thumb ?? p.cover).src} alt="" sizes="64px" style={{ objectPosition: p.thumb?.position }} />
              </span>
              <span className={styles.rowTitle}>{p.title}</span>
              <span className={`mono ${styles.rowKind}`}>{p.kind}</span>
              <span className={styles.rowDot} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ol>
      <div ref={preview} className={styles.preview} data-visible={Boolean(active)} aria-hidden="true">
        {active && <Image key={active.slug} src={active.cover.src} alt="" sizes="320px" placeholder="blur" />}
      </div>
    </div>
  );
}
