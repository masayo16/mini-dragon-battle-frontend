import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LevelAssetManager } from '@/game/level/LevelAssetManager';

vi.mock('pixi.js', () => ({
  Assets: {
    load: vi.fn().mockResolvedValue({ width: 32, height: 32 })
  },
  Texture: vi.fn()
}));

describe('LevelAssetManager', () => {
  let assetManager: LevelAssetManager;
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('最小実装テスト', () => {
    it('should create instance', () => {
      assetManager = new LevelAssetManager();

      expect(assetManager).toBeInstanceOf(LevelAssetManager);
    });
  });
  describe('loadTextures', () => {
    beforeEach(() => {
      assetManager = new LevelAssetManager();
    });
    it('should load all required textures', async () => {
      const PIXI = await import('pixi.js');

      const result = await assetManager.loadTextures();

      expect(result).toHaveProperty('wall');
      expect(result).toHaveProperty('dot');
      expect(result).toHaveProperty('power');
      expect(PIXI.Assets.load).toHaveBeenCalledTimes(3);
      expect(PIXI.Assets.load).toHaveBeenCalledWith('/assets/images/wall.png');
      expect(PIXI.Assets.load).toHaveBeenCalledWith('/assets/images/dot.png');
      expect(PIXI.Assets.load).toHaveBeenCalledWith('/assets/images/power.png');
    });
  });
});
