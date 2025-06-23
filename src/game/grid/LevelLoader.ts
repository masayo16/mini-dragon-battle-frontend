import type { Container } from 'pixi.js';
import { Sprite, Assets, Texture } from 'pixi.js';
import { TILE_SIZE, gridToPixel } from './Grid';

export async function loadLevel(file: string, stage: Container) {
  const sheet = await Assets.load('/assets/images/tilesheet.json');
  const wallTex = sheet.textures['wall.png'];
  const pathTex = sheet.textures['path.png'];
  const dotTex = sheet.textures['dot.png'];
  const powerTex = sheet.textures['power.png'];

  const levelText = await (await fetch(file)).text();
  levelText.split('\n').forEach((line, row) => {
    [...line].forEach((ch, col) => {
      const pos = gridToPixel({ col, row });
      let sprite: Sprite | null = null;
      switch (ch) {
        case ' ':
          sprite = new Sprite(pathTex);
          break;
        case '#':
          sprite = new Sprite(wallTex);
          break;
        case '.':
          sprite = new Sprite(dotTex);
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
