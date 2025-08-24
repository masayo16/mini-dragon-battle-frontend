import * as PIXI from 'pixi.js';
import { loadLevel } from '../level/LevelLoader';
import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { gridToPixel } from '../grid/Grid';
import type { GridPos } from '../grid/Grid';
import { useScoreStore } from '@/stores/score.store';
import { absDist } from '../grid/AbsDist';

type IsWallFn = (g: GridPos) => boolean;

export interface GameConfig {
  width: number;
  height: number;
  collisionRadius: number;
  dotScore: number;
  powerScore: number;
}

const DEFAULT_CONFIG: GameConfig = {
  width: 896,
  height: 512,
  collisionRadius: 8,
  dotScore: 10,
  powerScore: 50,
};

export class GameEngine {
  private app!: PIXI.Application;

  private walls = new Set<string>();
  private dots = new Set<PIXI.Sprite>();
  private powers = new Set<PIXI.Sprite>();

  private player!: Player;
  private enemies: Enemy[] = [];
  private readonly scoreStore = useScoreStore();
  private readonly cfg: GameConfig;

  constructor(cfh: Partial<GameConfig> = {}) {
    this.cfg = { ...DEFAULT_CONFIG, ...cfh };
  }

  async init(container: HTMLElement) {
    this.app = new PIXI.Application();
    await this.app.init({
      width: this.cfg.width,
      height: this.cfg.height,
      background: 0x000000,
      antialias: true,
    });
    container.appendChild(this.app.canvas);

    const { walls, dots, powers } = await loadLevel(
      '/assets/level/level1.txt',
      this.app.stage,
    );
    this.walls = walls;
    this.dots = dots;
    this.powers = powers;

    this.player = new Player();
    await this.player.init();
    const spawn = gridToPixel({ col: 14, row: 12 });
    this.player.position.set(spawn.x, spawn.y);
    this.app.stage.addChild(this.player);

    // NOTE: 敵キャラを生成・配置
    await this.spawnEnemies();

    window.addEventListener('keydown', this.onKeyDown);

    this.app.ticker.add(this.onTick);
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
    this.app?.destroy(true);
    this.dots.clear();
    this.powers.clear();
    this.walls.clear();
    this.enemies.length = 0;
  }

  private readonly isWall: IsWallFn = g => this.walls.has(`${g.col},${g.row}`);

  private onKeyDown = (e: KeyboardEvent) => {
    const map: Record<string, GridPos> = {
      ArrowLeft: { row: 0, col: -1 },
      ArrowUp: { row: -1, col: 0 },
      ArrowRight: { row: 0, col: 1 },
      ArrowDown: { row: 1, col: 0 },
    };
    const d = map[e.key];
    if (d) this.player.nextDir = d;
  };

  private onTick = () => {
    const dt = this.app.ticker.deltaMS / 1000;
    this.player.update(dt, this.isWall);

    // NOTE: 敵キャラを更新
    for (const enemy of this.enemies) {
      enemy.update(dt, this.isWall);
    }

    // NOTE: プレイヤーと敵の衝突判定
    this.checkEnemyCollisions();

    this.checkPickups(this.dots, this.cfg.dotScore);
    this.checkPickups(this.powers, this.cfg.powerScore, true);
  };

  private checkPickups(
    pools: Set<PIXI.Sprite>,
    score: number,
    isPower = false,
  ) {
    for (const sp of pools) {
      if (absDist(this.player, sp) < this.cfg.collisionRadius) {
        pools.delete(sp);
        this.app.stage.removeChild(sp);
        this.scoreStore.add(score);

        if (isPower) {
          this.player.powerUp();
        }
      }
    }
  }

  private async spawnEnemies() {
    const enemySpawns: GridPos[] = [
      { col: 1, row: 1 },
      { col: 26, row: 1 },
      { col: 1, row: 14 },
      { col: 26, row: 14 },
    ];

    for (const spawn of enemySpawns) {
      const enemy = new Enemy();
      await enemy.init();
      const pos = gridToPixel(spawn);
      enemy.position.set(pos.x, pos.y);
      this.enemies.push(enemy);
      this.app.stage.addChild(enemy);
    }
  }

  private checkEnemyCollisions() {
    for (const enemy of this.enemies) {
      if (absDist(this.player, enemy) < this.cfg.collisionRadius) {
        if (this.player.powered) {
          // NOTE: パワーアップ中は敵を倒せる
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
          this.app.stage.removeChild(enemy);
          this.scoreStore.add(200);
        } else {
          // NOTE: ゲームオーバー処理（簡易版）
          console.log('Game Over!');
          // TODO: ゲームオーバー画面やリセット処理を実装
        }
      }
    }
  }
}
