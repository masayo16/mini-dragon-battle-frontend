import type { Container } from 'pixi.js';
import { Sprite, Assets } from 'pixi.js';
import { gridToPixel } from './Grid';

export async function loadLevel(
  file: string,
  stage: Container,
  walls: Set<string>,
) {
  const wall = await Assets.load('/assets/images/wall.png');
  const dot = await Assets.load('/assets/images/dot.png');
  const powerTex = await Assets.load('/assets/images/power.png');

  const levelText = await (await fetch(file)).text();

  levelText.split('\n').forEach((line, row) => {
    [...line].forEach((ch, col) => {
      const pos = gridToPixel({ col, row });
      let sprite: Sprite | null = null;
      switch (ch) {
        case ' ':
          break;
        case '#':
          walls.add(`${row},${col}`);
          sprite = new Sprite(wall);
          break;
        case '.':
          sprite = new Sprite(dot);
          break;
        case 'o':
          sprite = new Sprite(powerTex);
          break;
      }
      if (sprite) {
        sprite.anchor.set(0.5);
        sprite.position.set(pos.x, pos.y);
        stage.addChild(sprite);
      }
    });
  });
}
