import { it, expect } from 'vitest';
import { gridToPixel, pixelToGrid } from '~/game/grid/Grid';
it('gridToPixel / pixelToGrid round-trip', () => {
  const g = { col: 5, row: 10 };
  expect(pixelToGrid(gridToPixel(g))).toEqual(g);
});
