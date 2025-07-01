import { Sprite, Assets } from 'pixi.js';
import type { GridPos } from '@/game/grid/Grid';
import { gridToPixel, pixelToGrid, TILE_SIZE } from '@/game/grid/Grid';

export class Player extends Sprite {
  speed = 4; // NOTE: セル/秒
  dir: GridPos = { col: 0, row: 0 };
  nextDir: GridPos = { col: 0, row: 0 };

  async init() {
    this.texture = await Assets.load('/assets/images/player.png');
    this.anchor.set(0.5);
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
  }

  // NOTE: 1フレーム更新：dt は秒
  update(dt: number, isWall: (g: GridPos) => boolean) {
    const gridPos = pixelToGrid(this);
    const center = gridToPixel(gridPos);
    const dist = Math.hypot(this.x - center.x, this.y - center.y);

    // NOTE: 中央到達後に曲がれるかを判定
    if (dist < 1) {
      if (
        !isWall({
          col: gridPos.col + this.nextDir.col,
          row: gridPos.row + this.nextDir.row,
        })
      ) {
        this.dir = this.nextDir;
      } else if (
        isWall({
          col: gridPos.col + this.dir.col,
          row: gridPos.row + this.dir.row,
        })
      ) {
        this.dir = { col: 0, row: 0 }; // NOTE: 正面が壁なら停止
      }
      this.position.set(center.x, center.y);
    }
    this.x += this.dir.col * this.speed * TILE_SIZE * dt;
    this.y += this.dir.row * this.speed * TILE_SIZE * dt;
  }
}
