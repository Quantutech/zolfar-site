"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";

import type { Shot, Staging } from "@/content/projects";
import { tilt } from "@/lib/random";

import styles from "./Showcase.module.css";

type Props = {
  shots: Shot[];
  staging: Staging;
  title: string;
};

/**
 * A project's images, staged by discipline: boards on a drafting grid, pasted cut-outs,
 * a pinned poster wall or a scattered workshop table. Any image opens in a zoomable viewer.
 */
export function Showcase({ shots, staging, title }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const [cover, ...rest] = shots;

  return (
    <>
      <figure className={`${styles.cover} ${styles[`cover_${staging}`]}`}>
        <button type="button" className={styles.open} onClick={() => setIndex(0)} aria-label={`Enlarge: ${cover.alt}`}>
          <Image
            src={cover.src}
            alt={cover.alt}
            sizes="(min-width: 1200px) 1100px, 94vw"
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
          />
        </button>
        {staging === "drafting" && <SheetLabel n={1} of={shots.length} />}
        {staging === "collage" && <Tape />}
      </figure>

      {rest.length > 0 && (
        <ul className={`${styles.gallery} ${styles[staging]}`}>
          {rest.map((shot, i) => (
            <li
              key={shot.src.src}
              className={styles.item}
              style={
                {
                  "--tilt": `${staging === "drafting" ? 0 : tilt(shot.src.src, staging === "table" ? 4 : 2.2)}deg`,
                  "--ratio": shot.src.width / shot.src.height,
                } as CSSProperties
              }
            >
              <button type="button" className={styles.open} onClick={() => setIndex(i + 1)} aria-label={`Enlarge: ${shot.alt}`}>
                <Image src={shot.src} alt={shot.alt} sizes="(min-width: 900px) 50vw, 94vw" placeholder="blur" />
              </button>
              {staging === "drafting" && <SheetLabel n={i + 2} of={shots.length} />}
              {(staging === "wall" || staging === "table") && <Pin />}
              {shot.caption && <p className={`mono ${styles.caption}`}>{shot.caption}</p>}
            </li>
          ))}
        </ul>
      )}

      <Viewer shots={shots} index={index} onIndex={setIndex} title={title} />
    </>
  );
}

function SheetLabel({ n, of }: { n: number; of: number }) {
  return (
    <span className={`mono ${styles.sheet}`} aria-hidden="true">
      Sheet {String(n).padStart(2, "0")} / {String(of).padStart(2, "0")}
    </span>
  );
}

function Tape() {
  return (
    <>
      <span className={`${styles.tape} ${styles.tapeA}`} aria-hidden="true" />
      <span className={`${styles.tape} ${styles.tapeB}`} aria-hidden="true" />
    </>
  );
}

function Pin() {
  return <span className={styles.pin} aria-hidden="true" />;
}

function Viewer({
  shots,
  index,
  onIndex,
  title,
}: {
  shots: Shot[];
  index: number | null;
  onIndex: (i: number | null) => void;
  title: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const shot = index === null ? null : shots[index];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      setZoom(false);
      onIndex((index + dir + shots.length) % shots.length);
    },
    [index, onIndex, shots.length],
  );

  useEffect(() => {
    if (index === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [index, go]);

  function pan(e: MouseEvent<HTMLButtonElement>) {
    if (!zoom) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <dialog
      ref={dialog}
      className={styles.viewer}
      aria-label={`${title} — images`}
      onClose={() => {
        setZoom(false);
        onIndex(null);
      }}
    >
      {shot && (
        <>
          <button
            type="button"
            className={styles.stage}
            data-zoom={zoom}
            onClick={(e) => {
              pan(e);
              setZoom((z) => !z);
            }}
            onPointerMove={pan}
            aria-label={zoom ? "Zoom out" : "Zoom in"}
          >
            <Image
              key={shot.src.src}
              src={shot.src}
              alt={shot.alt}
              sizes="200vw"
              className={styles.stageImage}
              style={{ transformOrigin: origin }}
            />
          </button>
          <div className={styles.bar}>
            <p className="mono">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
              {shot.caption ? ` — ${shot.caption}` : ""}
            </p>
            <div className={styles.controls}>
              {shots.length > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label="Previous image">
                    ←
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label="Next image">
                    →
                  </button>
                </>
              )}
              <button type="button" onClick={() => onIndex(null)} aria-label="Close viewer">
                ×
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
