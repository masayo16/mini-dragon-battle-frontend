import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import authMW from '@/middleware/auth.global';

mockNuxtImport('navigateTo', () => vi.fn());

// NOTE: 1. hoistedで汎用モック関数を定義
const { mockUseGoogleAuth } = vi.hoisted(() => ({
  mockUseGoogleAuth: vi.fn(),
}));
// NOTE: 2. Nuxt auto-import 名で登録
mockNuxtImport('useGoogleAuth', () => mockUseGoogleAuth);

const { navigateTo } = vi.mocked(await import('#app'));

describe('middleware/auth.global.ts', () => {
  beforeEach(() => {
    navigateTo.mockReset();
    mockUseGoogleAuth.mockReset();
  });

  it('ユーザーが未ログインで、ログインページ以外にアクセスしようとした場合、ログインページにリダイレクトする', () => {
    mockUseGoogleAuth.mockReturnValue({
      user: { value: null },
    });
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    authMW({ path: '/play' } as any, {} as any);

    expect(navigateTo).toHaveBeenCalledWith('/login');
  });

  it('ユーザーが未ログインで、ログインページにアクセスしようとした場合、リダイレクトしない', () => {
    mockUseGoogleAuth.mockReturnValue({
      user: { value: null },
    });
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    authMW({ path: '/login' } as any, {} as any);

    expect(navigateTo).not.toHaveBeenCalled();
  });

  it('ユーザーがログインしている場合、リダイレクトしない', async () => {
    mockUseGoogleAuth.mockReturnValue({
      user: { value: 'test' },
    });
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    authMW({ path: '/play' } as any, {} as any);

    expect(navigateTo).not.toHaveBeenCalled();
  });
});
