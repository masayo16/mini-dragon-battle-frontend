import { vi } from 'vitest';

export const Application = vi.fn().mockImplementation(() => {
  return {
    canvas: document.createElement('canvas'),
    init: vi.fn().mockResolvedValue(void 0),
    ticker: { add: vi.fn(), stop: vi.fn(), start: vi.fn() },
    stage: { addChild: vi.fn() },
    screen: { width: 800, height: 600 },
  };
});

export const Texture = vi.fn().mockImplementation((img?: HTMLImageElement) => ({
  baseTexture: { recource: { source: img ?? document.createElement('img') } },
  width: 32,
  height: 32,
}));

export const Sprite = vi.fn().mockImplementation((tex?: unknown) => {
  let _texture = tex || new Texture();
  return {
    anchor: { set: vi.fn() },
    get texture() {
      return _texture;
    },
    set texture(t) {
      _texture = t;
    },
    get width() {
      return _texture.width;
    },
    get height() {
      return _texture.height;
    },
    x: 0,
    y: 0,
    destroy: vi.fn(),
  };
});

export const Assets = {
  load: vi.fn().mockResolvedValue(new Texture()),
  get: vi.fn().mockReturnValue(new Texture()),
};
