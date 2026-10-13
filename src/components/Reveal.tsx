"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Degrees the piece is "pasted" at before it settles. */
  tilt?: number;
  delay?: number;
  style?: CSSProperties;
};

/** Fades and settles its content into place once it scrolls into view. Visible without JS. */
export function Reveal({ children, as: Tag = "div", className, tilt = 0, delay = 0, style }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={{ "--tilt": `${tilt}deg`, transitionDelay: `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
