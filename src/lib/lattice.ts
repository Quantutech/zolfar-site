/**
 * Places items on an interlocking rhombus lattice (like the diamond rows of a kilim).
 * A row pattern such as [4, 3, 4] means 4 diamonds, then 3 sitting in the gaps, then 4.
 * Each diamond spans 2 half-columns and 2 half-rows of a CSS grid, so rows overlap by half.
 */
export type Cell = { col: number; row: number };

export const patterns = {
  lg: [4, 3, 4],
  md: [3, 2, 3, 2, 1],
  sm: [2, 1, 2, 1, 2, 1, 2],
} as const;

export function place(count: number, pattern: readonly number[]): { cells: Cell[]; columns: number } {
  const widest = Math.max(...pattern);
  const cells: Cell[] = [];
  let row = 0;
  for (let r = 0; cells.length < count; r++) {
    const n = pattern[r % pattern.length];
    const start = 1 + (widest - n); // centre the row: each missing diamond shifts it half a diamond
    for (let j = 0; j < n && cells.length < count; j++) {
      cells.push({ col: start + 2 * j, row: row + 1 });
    }
    row++;
  }
  return { cells, columns: widest * 2 };
}
