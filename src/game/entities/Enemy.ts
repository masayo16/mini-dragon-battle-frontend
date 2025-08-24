import { Sprite, Assets } from 'pixi.js';
import type { GridPos } from '@/game/grid/Grid';
import { gridToPixel, pixelToGrid, TILE_SIZE } from '@/game/grid/Grid';

export class Enemy extends Sprite {
  speed = 2; // NOTE: セル/秒（プレイヤーより遅く）
  dir: GridPos = { col: 0, row: 0 };
  private targetDir: GridPos = { col: 0, row: 0 };
  private nextDirectionChange = 0; // NOTE: 次の方向転換までの時間
  
  isDefeated = false; // NOTE: 倒された状態かどうか
  respawnTimer = 0; // NOTE: 復活までの時間
  private initialPosition: GridPos = { col: 0, row: 0 }; // NOTE: 初期位置

  async init(initialPos?: GridPos) {
    this.texture = await Assets.load('/assets/images/ghost_pink.png');
    this.anchor.set(0.5);
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    
    // NOTE: 初期位置を記録
    if (initialPos) {
      this.initialPosition = initialPos;
    }
    
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

  // NOTE: 敵を倒す
  defeat(respawnTime = 8) {
    this.isDefeated = true;
    this.respawnTimer = respawnTime;
    this.visible = false; // NOTE: 見えなくする
    this.dir = { col: 0, row: 0 }; // NOTE: 停止
    console.log(`Enemy defeated, will respawn in ${respawnTime} seconds`);
  }

  // NOTE: 敵を復活させる
  respawn() {
    this.isDefeated = false;
    this.respawnTimer = 0;
    this.visible = true;
    
    // NOTE: 初期位置に戻す
    const spawn = gridToPixel(this.initialPosition);
    this.position.set(spawn.x, spawn.y);
    this.setRandomDirection();
    console.log(`Enemy respawned at position (${this.initialPosition.col}, ${this.initialPosition.row})`);
  }

  // NOTE: 1フレーム更新：dt は秒
  async update(dt: number, isWall: (g: GridPos) => boolean) {
    // NOTE: 倒された状態の場合は復活タイマーを更新
    if (this.isDefeated) {
      this.respawnTimer -= dt;
      if (this.respawnTimer <= 0) {
        this.respawn();
      }
      return; // NOTE: 倒された状態では移動しない
    }

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