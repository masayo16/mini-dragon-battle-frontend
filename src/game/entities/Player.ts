import { ColorMatrixFilter, Sprite, Assets } from 'pixi.js';
import type { GridPos } from '@/game/grid/Grid';
import { gridToPixel, pixelToGrid, TILE_SIZE } from '@/game/grid/Grid';

export class Player extends Sprite {
  speed = 4; // NOTE: セル/秒
  dir: GridPos = { col: 0, row: 0 };
  nextDir: GridPos = { col: 0, row: 0 };
  powered = false;
  powerTimer = 0; //NOTE: 秒
  lives = 3; // NOTE: 残機数
  isInvulnerable = false; // NOTE: 無敵状態（リスポーン直後）
  invulnerabilityTimer = 0; // NOTE: 無敵時間

  private powerFilter?: ColorMatrixFilter;

  async init() {
    this.texture = await Assets.load('/assets/images/player.png');
    this.anchor.set(0.5);
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
  }

  async powerUp(seconds = 8) {
    this.powered = true;
    this.powerTimer = seconds;

    if (!this.powerFilter) {
      this.powerFilter = new ColorMatrixFilter();
    }
    this.powerFilter.reset();
    this.powerFilter.saturate(1.1, true);
    this.powerFilter.brightness(2, true);
    this.filters = [this.powerFilter];
  }

  // NOTE: 残機を失う
  loseLife(): boolean {
    this.lives--;
    this.isInvulnerable = true;
    this.invulnerabilityTimer = 3; // NOTE: 3秒間無敵
    this.alpha = 0.5; // NOTE: 無敵状態の視覚表現
    
    return this.lives <= 0; // NOTE: ゲームオーバーかどうかを返す
  }

  // NOTE: リスポーン処理
  respawn(spawnPos: GridPos) {
    const spawn = gridToPixel(spawnPos);
    this.position.set(spawn.x, spawn.y);
    this.dir = { col: 0, row: 0 };
    this.nextDir = { col: 0, row: 0 };
  }

  // NOTE: 1フレーム更新：dt は秒
  async update(dt: number, isWall: (g: GridPos) => boolean) {
    const gridPos = pixelToGrid(this);
    const center = gridToPixel(gridPos);
    const dist = Math.hypot(this.x - center.x, this.y - center.y);

    // NOTE: 無敵時間の処理
    if (this.isInvulnerable) {
      this.invulnerabilityTimer -= dt;
      if (this.invulnerabilityTimer <= 0) {
        this.isInvulnerable = false;
        this.alpha = 1; // NOTE: 通常の透明度に戻す
      }
    }

    if (this.powered) {
      this.powerTimer -= dt;
      if (this.powerTimer <= 0) {
        this.powered = false;

        this.filters = null; // NOTE: フィルターを解除
        this.powerFilter?.reset();
      }
    }

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
