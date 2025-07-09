import * as PIXI from 'pixi.js';

import type { Ref } from 'vue';
import { onUnmounted } from 'vue';

import { Player } from '~/game/entities/Player';
import { absDist } from '~/game/grid/AbsDist';
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
  const { dots, powers } = await loadLevel(
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
      if (absDist(player, dot) < 8) {
        app.stage.removeChild(dot);
        dots.delete(dot);
        scoreStore.add(10);
      }
    });

    powers.forEach(power => {
      if (absDist(player, power) < 8) {
        app.stage.removeChild(power);
        powers.delete(power);
        player.powerUp(8);
        scoreStore.add(50);
      }
    });
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', onArrowKey);
    app.destroy(true);
  });
}
