import * as PIXI from 'pixi.js';
import { Assets } from 'pixi.js';
import type { Ref } from 'vue';

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

  const texture = await Assets.load(
    'https://pixijs.io/examples/examples/assets/bunny.png',
  );

  const player = new PIXI.Sprite(texture);
  player.anchor.set(0.5);
  player.x = app.screen.width / 2;
  player.y = app.screen.height - player.height / 2;
  app.stage.addChild(player);

  const keys = new Set<string>();
  const onKey = (e: KeyboardEvent) =>
    e.type === 'keydown' ? keys.add(e.key) : keys.delete(e.key);

  window.addEventListener('keydown', onKey);
  window.addEventListener('keyup', onKey);

  const speed = 5;
  app.ticker.add(ticker => {
    const delta = ticker.deltaTime;

    if (keys.has('ArrowLeft')) {
      player.x -= speed * delta;
    }
    if (keys.has('ArrowRight')) {
      player.x += speed * delta;
    }

    player.x = Math.max(
      player.width / 2,
      Math.min(player.x, app.screen.width - player.width / 2),
    );
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('keyup', onKey);
    app.destroy(true);
  });
}
