import { vi } from 'vitest';

vi.mock('firebase/auth', () => import('../__mocks__/firebase/auth'));
vi.mock('pixi.js', () => import('../__mocks__/pixi.js'));

const store = { add: vi.fn() };
vi.mock('@/stores/score.store', () => ({
  useScoreStore: () => store,
}));
export const add = store.add;
