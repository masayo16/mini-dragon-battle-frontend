import type { Container } from 'pixi.js';
import { Sprite, Assets } from 'pixi.js';
import { gridToPixel } from './Grid';
import { parseLevel } from '../level/LevelDataLoader';

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
