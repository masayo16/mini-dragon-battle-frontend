// NOTE: テスト実行前の“一括登録”ハブ
import { vi } from 'vitest';

vi.mock('firebase/auth', () => import('../__mocks__/firebase/auth'));
vi.mock('pixi.js', () => import('../__mocks__/pixi.js'));
