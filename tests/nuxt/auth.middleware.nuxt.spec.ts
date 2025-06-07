import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import authMW from '@/middleware/auth.global';

mockNuxtImport('navigateTo', () => vi.fn());
vi.mock('@/composables/useGoogleAuth', () => ({
  useGoogleAuth: () => ({
    user: { value: null },
  }),
}));

const { navigateTo } = vi.mocked(await import('#app'));

describe('middleware/auth.global.ts', () => {
  beforeEach(() => {
    navigateTo.mockReset();
  });

  it('ユーザーが未ログインで、ログインページ以外にアクセスしようとした場合、ログインページにリダイレクトする', () => {
    authMW({ path: '/play' } as any, {} as any);

    expect(navigateTo).toHaveBeenCalledWith('/login');
  });
});
