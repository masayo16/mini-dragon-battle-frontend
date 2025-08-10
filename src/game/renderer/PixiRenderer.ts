import * as PIXI from 'pixi.js';
import type { GameStateDTO } from '../dto/GameStateDTO';
import { TILE_SIZE } from '../grid/Grid';

export class PixiRenderer {
  private sprites = new Map<number, PIXI.Sprite>();
  constructor(private readonly stage: PIXI.Container) {}

  async render(state: GameStateDTO) {
    // NOTE: プレイヤーは、まだ１枚だけ
    if (!this.sprites.has(0)) {
      const texture = await PIXI.Assets.load('/assets/images/player.png');
      const sprite = new PIXI.Sprite(texture);
      sprite.height = sprite.width = TILE_SIZE;
      this.sprites.set(0, sprite);
      this.stage.addChild(sprite);
    }
    this.sprites.get(0)!.position.set(state.player.x, state.player.y);

    const dotTexture = await PIXI.Assets.load('/assets/images/dot.png');
    const powerTexture = await PIXI.Assets.load('/assets/images/power.png');
    this.syncSet(state.dots, dotTexture, TILE_SIZE);
    this.syncSet(state.powers, powerTexture, TILE_SIZE);
  }

  private syncSet(
    list: { id: number; x: number; y: number }[],
    texture: PIXI.Texture,
    size: number,
  ) {
    const alive = new Set<number>();
    for (const e of list) {
      alive.add(e.id);
      const sp = this.sprites.get(e.id);
      if (!sp) {
        const sprite = new PIXI.Sprite(texture);
        sprite.width = sprite.height = size;
        this.stage.addChild(sprite);
        this.sprites.set(e.id, sprite);
      }
      sp?.position.set(e.x, e.y);
    }

    for (const [id, sprite] of this.sprites.entries()) {
      if (!alive.has(id) && id !== 0) {
        this.stage.removeChild(sprite);
        this.sprites.delete(id);
      }
    }
  }
}
