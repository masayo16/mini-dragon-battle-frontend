import * as PIXI from 'pixi.js';
import type { Ref } from 'vue';

export async function useGame(container: Ref<HTMLElement | null>) {
  if (!container.value) return;

  const app = new PIXI.Application();

  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
  });

  // NOTE: Canvas を DOM に追加
  container.value.appendChild(app.canvas);

  // TODO: ここで ticker 登録などゲーム開始処理
}
