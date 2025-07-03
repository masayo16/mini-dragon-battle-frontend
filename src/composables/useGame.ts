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
    width: 896,
    height: 512,
    background: 0x000000,
    antialias: true,
  });
  container.value.appendChild(app.canvas);

  const walls = new Set<string>();
  const { dots } = await loadLevel(
    '/assets/level/level1.txt',
    app.stage,
    walls,
  );

  const scoreStore = useScoreStore();

  const player = new Player();
  await player.init();
  const pos = gridToPixel({ col: 14, row: 12 });
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

  const isWall = (g: GridPos) => walls.has(`${g.row},${g.col}`);
  app.ticker.add(({ deltaMS }) => {
    player.update(deltaMS / 1000, isWall);

    dots.forEach(dot => {
      if (Math.abs(dot.x - player.x) < 8 && Math.abs(dot.y - player.y) < 8) {
        app.stage.removeChild(dot);
        dots.delete(dot);
        scoreStore.add(10);
      }
    });
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', onArrowKey);
    app.destroy(true);
  });
}
