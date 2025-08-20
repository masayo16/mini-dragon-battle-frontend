import * as PIXI from 'pixi.js';

export interface LevelTextures {
  wall: PIXI.Texture;
  dot: PIXI.Texture;
  power: PIXI.Texture;
}

export class LevelAssetManager {
  async loadTextures(): Promise<LevelTextures> {
    const [wallTexture, dotTexture, powerTexture] = await Promise.all([
      PIXI.Assets.load('/assets/images/wall.png'),
      PIXI.Assets.load('/assets/images/dot.png'),
      PIXI.Assets.load('/assets/images/power.png'),
    ]);

    return {
      wall: wallTexture,
      dot: dotTexture,
      power: powerTexture,
    };
  }
}
