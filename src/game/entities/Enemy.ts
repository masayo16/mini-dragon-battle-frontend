import { Sprite, Assets } from 'pixi.js';
import type { GridPos } from '@/game/grid/Grid';
import { gridToPixel, pixelToGrid, TILE_SIZE } from '@/game/grid/Grid';

export class Enemy extends Sprite {
  speed = 2; // NOTE: セル/秒（プレイヤーより遅く）
  dir: GridPos = { col: 0, row: 0 };
  private targetDir: GridPos = { col: 0, row: 0 };
  private nextDirectionChange = 0; // NOTE: 次の方向転換までの時間

  async init() {
    this.texture = await Assets.load('/assets/images/ghost_pink.png');
    this.anchor.set(0.5);
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    
    // NOTE: ランダムな初期方向を設定
    this.setRandomDirection();
  }

  private setRandomDirection() {
    const directions: GridPos[] = [
      { col: -1, row: 0 }, // left
      { col: 1, row: 0 },  // right
      { col: 0, row: -1 }, // up
      { col: 0, row: 1 },  // down
    ];
    this.targetDir = directions[Math.floor(Math.random() * directions.length)];
    this.nextDirectionChange = Math.random() * 3 + 2; // NOTE: 2-5秒でランダム
  }

  // NOTE: 1フレーム更新：dt は秒
  async update(dt: number, isWall: (g: GridPos) => boolean) {
    const gridPos = pixelToGrid(this);
    const center = gridToPixel(gridPos);
    const dist = Math.hypot(this.x - center.x, this.y - center.y);

    this.nextDirectionChange -= dt;

    // NOTE: 中央到達後に方向転換を判定
    if (dist < 1) {
      // NOTE: 方向転換のタイミングか壁にぶつかった場合
      if (
        this.nextDirectionChange <= 0 ||
        isWall({
          col: gridPos.col + this.dir.col,
          row: gridPos.row + this.dir.row,
        })
      ) {
        // NOTE: 可能な方向を探す
        const possibleDirs: GridPos[] = [
          { col: -1, row: 0 },
          { col: 1, row: 0 },
          { col: 0, row: -1 },
          { col: 0, row: 1 },
        ].filter(d => !isWall({
          col: gridPos.col + d.col,
          row: gridPos.row + d.row,
        }));

        if (possibleDirs.length > 0) {
          this.dir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
          this.setRandomDirection();
        } else {
          this.dir = { col: 0, row: 0 }; // NOTE: 動けない場合は停止
        }
      }
      this.position.set(center.x, center.y);
    }

    this.x += this.dir.col * this.speed * TILE_SIZE * dt;
    this.y += this.dir.row * this.speed * TILE_SIZE * dt;
  }
}