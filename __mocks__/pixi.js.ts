import { vi } from 'vitest';

export const Application = vi.fn().mockImplementation(() => {
  return {
    canvas: document.createElement('canvas'),
    init: vi.fn().mockResolvedValue(void 0),
    ticker: { add: vi.fn(), stop: vi.fn(), start: vi.fn() },
    stage: { addChild: vi.fn() },
  };
});
