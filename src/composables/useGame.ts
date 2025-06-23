import * as PIXI from 'pixi.js';

import type { Ref } from 'vue';
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

  await loadLevel('assets/level/level1.txt', app.stage);

  const player = new Player();
  await player.init();
  player.position.set(...Object.values(gridToPixel({ col: 14, row: 23 })));
  app.stage.addChild(player);

  // const keys = new Set<string>();
  // const onKey = (e: KeyboardEvent) =>
  //   e.type === 'keydown' ? keys.add(e.key) : keys.delete(e.key);

  // window.addEventListener('keydown', onKey);
  // window.addEventListener('keyup', onKey);

  // const speed = 5;
  // app.ticker.add(ticker => {
  //   const delta = ticker.deltaTime;

  //   if (keys.has('ArrowLeft')) {
  //     player.x -= speed * delta;
  //   }
  //   if (keys.has('ArrowRight')) {
  //     player.x += speed * delta;
  //   }

  //   player.x = Math.max(
  //     player.width / 2,
  //     Math.min(player.x, app.screen.width - player.width / 2),
  //   );
  // });

  const onArrowKey = (e: KeyboardEvent) => {
    const map: Record<string, GridPos> = {
      ArrowLeft: { col: -1, row: 0 },
      ArrowRight: { col: 1, row: 0 },
      ArrowUp: { col: 0, row: 1 },
      ArrowDown: { col: 0, row: -1 },
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
