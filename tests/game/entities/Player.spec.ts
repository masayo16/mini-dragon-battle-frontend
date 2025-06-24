import { expect, it } from 'vitest';
import { Player } from '../../../src/game/entities/Player';
import { gridToPixel, pixelToGrid, type GridPos } from '~/game/grid/Grid';

it('プレイヤーが壁で停止すること', () => {
  const p = new Player();
  const isWall = (g: GridPos) => g.col === 1 && g.row === 0;
  p.position.set(...Object.values(gridToPixel({ col: 0, row: 0 })));

  console.log(gridToPixel({ col: 0, row: 0 }));
  console.log(...Object.values(gridToPixel({ col: 0, row: 0 })));

  p.update(0.3, isWall);
  expect(pixelToGrid(p)).toEqual({ col: 0, row: 0 });
});
