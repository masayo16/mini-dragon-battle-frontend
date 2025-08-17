import * as PIXI from 'pixi.js';
import type { LevelData } from './LevelDataLoader';
import { gridToPixel } from '../grid/Grid';

export type LevelTextures = {
  wall: PIXI.Texture;
  dot: PIXI.Texture;
  power: PIXI.Texture;
};

export type LevelSprites = {
  walls: Set<PIXI.Sprite>;
  dots: Set<PIXI.Sprite>;
  powers: Set<PIXI.Sprite>;
};

export class LevelSpriteFactory {
  public createSprites(
    levelData: LevelData,
    levelTextures: LevelTextures,
  ): LevelSprites {
    const walls: Set<PIXI.Sprite> = new Set();
    levelData.walls.forEach(key => {
      const [col, row] = key.split(',').map(Number);
      const pixelPos = gridToPixel({ col, row });
      const sprite = new PIXI.Sprite(levelTextures.wall);
      sprite.anchor.set(0.5);
      sprite.position.set(pixelPos.x, pixelPos.y);
      walls.add(sprite);
    });

    const dots: Set<PIXI.Sprite> = new Set();
    levelData.dots.forEach(gridPos => {
      const pixelPos = gridToPixel(gridPos);
      const sprite = new PIXI.Sprite(levelTextures.dot);
      sprite.anchor.set(0.5);
      sprite.position.set(pixelPos.x, pixelPos.y);
      dots.add(sprite);
    });

    const powers: Set<PIXI.Sprite> = new Set();
    levelData.powers.forEach(gridPos => {
      const pixelPos = gridToPixel(gridPos);
      const sprite = new PIXI.Sprite(levelTextures.power);
      sprite.anchor.set(0.5);
      sprite.position.set(pixelPos.x, pixelPos.y);
      powers.add(sprite);
    });
    return { walls, dots, powers };
  }
}
