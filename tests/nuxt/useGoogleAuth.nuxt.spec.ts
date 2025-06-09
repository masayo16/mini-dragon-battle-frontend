// @vitest-environment nuxt
import { beforeEach, describe, vi, expect, it } from 'vitest';
import { useGoogleAuth } from '@/composables/useGoogleAuth';

beforeEach(() => {
  vi.clearAllMocks();
});

const { user, loginWithGoogle, logout } = useGoogleAuth();

describe('loginWithGoogle', () => {
  it('ログイン成功', async () => {
    await loginWithGoogle();

    expect(user.value).toEqual({
      uid: 'test-uid',
      displayName: 'Test User',
    });
  });

  it('ログイン失敗', async () => {
    const { signInWithPopup } = await import('firebase/auth');
    vi.mocked(signInWithPopup).mockRejectedValue(new Error('ログイン失敗'));
    await loginWithGoogle();
    expect(user.value).toBeNull();
  });

  describe('logout', () => {
    it('ログアウト成功', async () => {
      await logout();
      expect(user.value).toBe(null);
    });

    it('ログアウト失敗', async () => {
      const { signOut } = await import('firebase/auth');
      vi.mocked(signOut).mockRejectedValue(new Error('ログアウト失敗'));
      await logout();
    });
  });
});
