export const TILE_SIZE = 32 as const;

export type GridPos = { col: number; row: number };
export type PixelPos = { x: number; y: number };

export function gridToPixel({ col, row }: GridPos): PixelPos {
  return {
    x: col * TILE_SIZE + TILE_SIZE / 2,
    y: row * TILE_SIZE + TILE_SIZE / 2,
  };
}

export function pixelToGrid({ x, y }: PixelPos): GridPos {
  return { col: Math.floor(x / TILE_SIZE), row: Math.floor(y / TILE_SIZE) };
}
