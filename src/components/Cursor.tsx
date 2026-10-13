"use client";

import { useEffect, useRef } from "react";

import styles from "./Cursor.module.css";

/** A small rhombus that trails the pointer and opens up over links. Fine pointers only. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !fine || still) return;

    let x = -100;
    let y = -100;
    let tx = x;
    let ty = y;
    let frame = 0;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.on = "true";
      const target = e.target instanceof Element ? e.target.closest("a, button, [role='button'], summary") : null;
      el.dataset.hot = target ? "true" : "false";
    };
    const leave = () => (el.dataset.on = "false");
    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={styles.cursor} data-on="false" aria-hidden="true">
      <span className={styles.shape} />
    </div>
  );
}
