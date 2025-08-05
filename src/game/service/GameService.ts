import type { Player } from '@/game/entities/Player';
import type { GridPos } from '@/game/grid/Grid';
import type { GameStateDTO } from '../dto/GameStateDTO';
import { absDist } from '../grid/AbsDist';

export class GameService {
  private walls = new Set<string>();
  private dots = new Map<number, { x: number; y: number }>();
  private powers = new Map<number, { x: number; y: number }>();
  private score = 0;
  private id = 1;

  constructor(
    private readonly player: Player,
    private readonly collisionRadius: number,
  ) {}

  // NOTE: 外側からレベルデータを登録する。
  addWall(g: GridPos) {
    this.walls.add(`${g.row},${g.col}`);
  }
  addDot(x: number, y: number) {
    this.dots.set(this.id++, { x, y });
  }
  addPower(x: number, y: number) {
    this.powers.set(this.id++, { x, y });
  }

  // NOTE: 1 フレーム進めて DTO を返す
  tick(dt: number): GameStateDTO {
    this.player.update(dt, this.isWall);
    this.checkPickups();
    return this.toDTO();
  }

  private isWall = (g: GridPos) => this.walls.has(`${g.row},${g.col}`);

  private checkPickups = () => {
    for (const [id, pos] of this.dots) {
      if (absDist(this.player, pos) < this.collisionRadius) {
        this.dots.delete(id);
        this.score += 10;
      }
    }
    for (const [id, pos] of this.powers) {
      if (absDist(this.player, pos) < this.collisionRadius) {
        this.powers.delete(id);
        this.score += 50;
        this.player.powerUp();
      }
    }
  };

  private toDTO(): GameStateDTO {
    return {
      player: { id: 0, x: this.player.x, y: this.player.y },
      dots: [...this.dots.entries()].map(([id, pos]) => ({ id, ...pos })),
      powers: [...this.powers.entries()].map(([id, pos]) => ({ id, ...pos })),
      score: this.score,
    };
  }
}
