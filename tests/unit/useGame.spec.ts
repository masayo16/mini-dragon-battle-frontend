import { beforeEach, describe, expect, it } from 'vitest';

describe('useGame', () => {
  let container: HTMLElement;
  let cRef: Ref<HTMLElement | null>;
  beforeEach(() => {
    container = document.createElement('div');
    cRef = ref<HTMLElement | null>(container);
  });

  describe('Pixiを生成し、canvasをマウントする', () => {
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
