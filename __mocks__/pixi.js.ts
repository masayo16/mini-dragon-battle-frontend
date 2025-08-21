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
  baseTexture: { resource: { source: img ?? document.createElement('img') } },
  width: 32,
  height: 32,
}));

export const Sprite = vi.fn().mockImplementation((tex?: unknown) => {
  let _texture = tex || new Texture();

  const position = {
    x: 0,
    y: 0,
    set(x: number, y: number) {
      this.x = x;
      this.y = y;
    },
  };

  const anchor = {
    x: 0,
    y: 0,
    set(x = 0, y = x) {
      this.x = x;
      this.y = y;
    },
  };

  return {
    anchor,
    position,
    get x() {
      return position.x;
    },
    set x(v) {
      position.x = v;
    },
    get y() {
      return position.y;
    },
    set y(v) {
      position.y = v;
    },
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
    destroy: vi.fn(),
    update: vi.fn(),
  };
});

export const Assets = {
  load: vi.fn().mockResolvedValue(new Texture()),
  get: vi.fn().mockReturnValue(new Texture()),
};

export const Container = vi.fn().mockImplementation(() => ({
  addChild: vi.fn(),
  removeChild: vi.fn(),
  children: [],
  destroy: vi.fn(),
}));
