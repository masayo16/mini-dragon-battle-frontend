import * as PIXI from 'pixi.js';
import { loadLevel } from '../grid/LevelLoader';
import { Player } from '../entities/Player';
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

    const { dots, powers } = await loadLevel(
      '/assets/level/level1.txt',
      this.app.stage,
      this.walls,
    );
    this.dots = dots;
    this.powers = powers;

    this.player = new Player();
    await this.player.init();
    const spawn = gridToPixel({ col: 14, row: 12 });
    this.player.position.set(spawn.x, spawn.y);
    this.app.stage.addChild(this.player);

    window.addEventListener('keydown', this.onKeyDown);

    this.app.ticker.add(this.onTick);
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
    this.app?.destroy(true);
    this.dots.clear();
    this.powers.clear();
    this.walls.clear();
  }

  private readonly isWall: IsWallFn = g => this.walls.has(`${g.row},${g.col}`);

  private onKeyDown = (e: KeyboardEvent) => {
    const map: Record<string, GridPos> = {
      ArrowLeft: { row: -1, col: 0 },
      ArrowUp: { row: 0, col: -1 },
      ArrowRight: { row: 1, col: 0 },
      ArrowDown: { row: 0, col: 1 },
    };
    const d = map[e.key];
    if (d) this.player.nextDir = d;
  };

  private onTick = () => {
    const dt = this.app.ticker.deltaMS / 1000;
    this.player.update(dt, this.isWall);

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
}
