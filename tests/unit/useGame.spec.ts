import { beforeEach, describe, expect, it } from 'vitest';

describe('useGame', () => {
  let container: HTMLElement;
  beforeEach(() => {
    container = document.createElement('div');
  });

  describe('Pixiを生成し、canvasをマウントする', () => {
    const cRef = ref<HTMLElement | null>(container);

    it('Application() が1回呼ばれること', async () => {
      const PIXI = await import('pixi.js');
      await useGame(cRef);

      expect(PIXI.Application).toHaveBeenCalledTimes(1);
    });

    it('canvasがcontainerに追加されること', async () => {
      await import('pixi.js');
      await useGame(cRef);

      expect(container.querySelector('canvas')).not.toBeNull();
    });
  });
});
