import type { Container } from 'pixi.js';
import { Sprite, Assets } from 'pixi.js';
import { gridToPixel, type GridPos } from './Grid';

export type LevelData = {
  walls: Set<string>; // NOTE: "col,row" 高速lookup用
  dots: GridPos[]; // NOTE: 順次処理用
  powers: GridPos[];
};

export function parseLevel(levelText: string): LevelData {
  const walls: Set<string> = new Set();
  const dots: GridPos[] = [];
  const powers: GridPos[] = [];

  levelText.split('\n').forEach((line, row) => {
    [...line].forEach((char, col) => {
      switch (char) {
        case '#':
          walls.add(`${col},${row}`);
          break;
        case '.':
          dots.push({ col, row });
          break;
        case 'o':
          powers.push({ col, row });
          break;
      }
    });
  });
  return { walls, dots, powers };
}

export async function loadLevel(
  file: string,
  stage: Container,
): Promise<{ walls: Set<string>; dots: Set<Sprite>; powers: Set<Sprite> }> {
  const wallTex = await Assets.load('/assets/images/wall.png');
  const dotTex = await Assets.load('/assets/images/dot.png');
  const powerTex = await Assets.load('/assets/images/power.png');

  const levelText = await (await fetch(file)).text();
  const levelData = parseLevel(levelText);

  const walls = levelData.walls;
  const dots = new Set<Sprite>();
  const powers = new Set<Sprite>();

  levelData.walls.forEach(key => {
    const [col, row] = key.split(',').map(Number);
    const pixelPos = gridToPixel({ col, row });
    const sprite = new Sprite(wallTex);
    sprite.anchor.set(0.5);
    sprite.position.set(pixelPos.x, pixelPos.y);
    stage.addChild(sprite);
  });

  levelData.dots.forEach(({ col, row }) => {
    const pixelPos = gridToPixel({ col, row });
    const sprite = new Sprite(dotTex);
    sprite.anchor.set(0.5);
    sprite.position.set(pixelPos.x, pixelPos.y);
    stage.addChild(sprite);
    dots.add(sprite);
  });

  levelData.powers.forEach(({ col, row }) => {
    const pixelPos = gridToPixel({ col, row });
    const sprite = new Sprite(powerTex);
    sprite.anchor.set(0.5);
    sprite.position.set(pixelPos.x, pixelPos.y);
    stage.addChild(sprite);
    powers.add(sprite);
  });

  return { walls, dots, powers };
}
