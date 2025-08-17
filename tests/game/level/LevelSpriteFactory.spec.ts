import { describe, it, expect } from 'vitest';
import { Texture } from 'pixi.js';
import type { LevelData } from '~/game/level/LevelDataLoader';
import {
  LevelSpriteFactory,
  type LevelSprites,
  type LevelTextures,
} from '~/game/level/LevelSpriteFactory';

describe('LevelSpriteFactory', () => {
  it('空のlevelDataで何も作成しない', () => {
    const factory = new LevelSpriteFactory();
    const textures: LevelTextures = {
      wall: new Texture(),
      dot: new Texture(),
      power: new Texture(),
    };
    const levelData: LevelData = { walls: new Set(), dots: [], powers: [] };

    const sprites: LevelSprites = factory.createSprites(levelData, textures);

    expect(sprites.walls.size).toBe(0);
    expect(sprites.dots.size).toBe(0);
    expect(sprites.powers.size).toBe(0);
  });

  it('壁を１つ作成', () => {
    const factory = new LevelSpriteFactory();
    const textures: LevelTextures = {
      wall: new Texture(),
      dot: new Texture(),
      power: new Texture(),
    };
    const levelData: LevelData = {
      walls: new Set(['0,0']),
      dots: [],
      powers: [],
    };

    const sprites = factory.createSprites(levelData, textures);

    expect(sprites.walls.size).toBe(1);
    expect(sprites.dots.size).toBe(0);
    expect(sprites.powers.size).toBe(0);

    const wallSprite = Array.from(sprites.walls)[0];
    expect(wallSprite.anchor.x).toBe(0.5);
    expect(wallSprite.anchor.y).toBe(0.5);
    expect(wallSprite.position.x).toBe(16);
    expect(wallSprite.position.y).toBe(16);
  });

  it('ドットを一つ作成', () => {
    const factory = new LevelSpriteFactory();
    const textures: LevelTextures = {
      wall: new Texture(),
      dot: new Texture(),
      power: new Texture(),
    };
    const levelData: LevelData = {
      walls: new Set(),
      dots: [{ col: 1, row: 2 }],
      powers: [],
    };

    const sprites = factory.createSprites(levelData, textures);

    expect(sprites.walls.size).toBe(0);
    expect(sprites.dots.size).toBe(1);
    expect(sprites.powers.size).toBe(0);

    const dotSprite = Array.from(sprites.dots)[0];
    expect(dotSprite.anchor.x).toBe(0.5);
    expect(dotSprite.anchor.y).toBe(0.5);
    expect(dotSprite.position.x).toBe(48);
    expect(dotSprite.position.y).toBe(80);
  });

  it('パワーを一つ作成', () => {
    const factory = new LevelSpriteFactory();
    const textures: LevelTextures = {
      wall: new Texture(),
      dot: new Texture(),
      power: new Texture(),
    };
    const levelData: LevelData = {
      walls: new Set(),
      dots: [],
      powers: [{ col: 3, row: 1 }],
    };

    const sprites = factory.createSprites(levelData, textures);

    expect(sprites.walls.size).toBe(0);
    expect(sprites.dots.size).toBe(0);
    expect(sprites.powers.size).toBe(1);

    const powerSprite = Array.from(sprites.powers)[0];
    expect(powerSprite.anchor.x).toBe(0.5);
    expect(powerSprite.anchor.y).toBe(0.5);
    expect(powerSprite.position.x).toBe(112);
    expect(powerSprite.position.y).toBe(48);
  });

  it('壁、ドット、パワーを複数作成', () => {
    const levelData: LevelData = {
      walls: new Set([`0,0`, `1,2`]),
      dots: [
        { col: 2, row: 1 },
        { col: 2, row: 3 },
      ],
      powers: [{ col: 3, row: 4 }],
    };
    const textures: LevelTextures = {
      wall: new Texture(),
      dot: new Texture(),
      power: new Texture(),
    };
    const factory = new LevelSpriteFactory();

    const sprites = factory.createSprites(levelData, textures);

    const wallPositions = Array.from(sprites.walls).map(s => ({
      x: s.position.x,
      y: s.position.y,
    }));
    expect(wallPositions).toContainEqual({ x: 16, y: 16 });
    expect(wallPositions).toContainEqual({ x: 48, y: 80 });

    const dotPosition = Array.from(sprites.dots).map(s => ({
      x: s.position.x,
      y: s.position.y,
    }));
    expect(dotPosition).toContainEqual({ x: 80, y: 48 });
    expect(dotPosition).toContainEqual({ x: 80, y: 112 });

    const powerPosition = Array.from(sprites.powers).map(s => ({
      x: s.position.x,
      y: s.position.y,
    }));
    expect(powerPosition).toContainEqual({ x: 112, y: 144 });
  });
});
