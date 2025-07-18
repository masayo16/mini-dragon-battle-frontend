import type { Ref } from 'vue';
import { onUnmounted } from 'vue';

import { GameEngine } from '~/game/engine/GameEngine';

export async function useGame(container: Ref<HTMLElement | null>) {
  if (!container.value) return;

  const engine = new GameEngine();
  await engine.init(container.value);

  onUnmounted(() => engine.destroy());
}
