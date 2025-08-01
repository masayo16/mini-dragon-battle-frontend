import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GameEngine } from '~/game/engine/GameEngine';
import { Application } from '~~/__mocks__/pixi.js';

/* eslint-disable-next-line */
type AnyEngine = any; // TODO: つぎのcommitで消す

const mockAdd = vi.fn();

vi.mock('@/stores/score.store', () => ({
  useScoreStore: () => ({
    add: mockAdd,
  }),
}));

vi.mock('@/game/grid/AbsDist', () => {
  return {
    absDist: vi.fn().mockReturnValue(0),
  };
});

describe('GameEngine.onTick', () => {
  let engine: GameEngine & AnyEngine;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAdd.mockClear();
    engine = new GameEngine();
    engine.app = Application();
    engine.player = {
      x: 10,
      y: 10,
      update: vi.fn(),
      powerUp: vi.fn(),
      position: { set: vi.fn() },
    };

    engine.dots = new Set([{ x: 10, y: 10, position: { set: vi.fn() } }]);
    engine.powers = new Set();
  });

  it('eats dots and adds score', () => {
    const tick = engine.onTick as () => void;
    tick();
    expect(mockAdd).toHaveBeenCalledWith(10);
    expect(engine.dots.size).toBe(0);
    expect(engine.app.stage.removeChild).toHaveBeenCalledTimes(1);
  });
});
