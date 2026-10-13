/** Deterministic PRNG (mulberry32) so server and client render identical "random" collage tilts. */
export function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Small stable tilt in degrees for an item, e.g. a pasted image or letter. */
export function tilt(key: string, max = 3): number {
  let h = 0;
  for (const ch of key) h = (Math.imul(h, 31) + ch.charCodeAt(0)) | 0;
  return +((seeded(h)() * 2 - 1) * max).toFixed(2);
}
