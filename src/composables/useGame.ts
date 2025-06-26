import * as PIXI from 'pixi.js';

import type { Ref } from 'vue';
import { onUnmounted } from 'vue';

import { Player } from '~/game/entities/Player';
import { gridToPixel, type GridPos } from '~/game/grid/Grid';
import { loadLevel } from '~/game/grid/LevelLoader';

export async function useGame(container: Ref<HTMLElement | null>) {
  if (!container.value) return;

  const app = new PIXI.Application();
  await app.init({
    width: 800,
    height: 600,
    background: 0x000000,
    antialias: true,
  });
  container.value.appendChild(app.canvas);

  await loadLevel('/assets/level/level1.txt', app.stage);

  const player = new Player();
  await player.init();
  const pos = gridToPixel({ col: 14, row: 23 });
  player.position.set(pos.x, pos.y);
  app.stage.addChild(player);

  const onArrowKey = (e: KeyboardEvent) => {
    const map: Record<string, GridPos> = {
      ArrowLeft: { col: -1, row: 0 },
      ArrowRight: { col: 1, row: 0 },
      ArrowUp: { col: 0, row: -1 },
      ArrowDown: { col: 0, row: 1 },
    };
    const d = map[e.key];

    if (d) {
      player.nextDir = d;
    }
  };
  window.addEventListener('keydown', onArrowKey);

  const walls = new Set<string>();
  const isWall = (g: GridPos) => walls.has(`${g.row},${g.col}`);

  app.ticker.add(({ deltaMS }) => {
    player.update(deltaMS / 1000, isWall);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', onArrowKey);
    app.destroy(true);
  });
}
