import type * as PIXI from 'pixi.js';
import { loadLevel } from '../grid/LevelLoader';
import type { Player } from '../entities/Player';
import { gridToPixel, type GridPos } from '../grid/Grid';
import { useScoreStore } from '@/stores/score';
import { P } from 'vitest/dist/chunks/environment.d.cL3nLXbE.js';

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

// TODO: エンジン＝オーケストレータとして、処理はSystemクラスに委譲する。
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
}
