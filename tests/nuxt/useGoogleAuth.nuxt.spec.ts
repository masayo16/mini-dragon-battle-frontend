// @vitest-environment nuxt
import { beforeEach, describe, vi, expect, it } from 'vitest';
import { useGoogleAuth } from '@/composables/useGoogleAuth';

beforeEach(() => {
  vi.clearAllMocks();
  user.value = null; //NOTE: ログイン状態のリセット
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

  it('ログイン失敗で例外を投げ、ユーザーは null のまま', async () => {
    const { signInWithPopup } = await import('firebase/auth');
    vi.mocked(signInWithPopup).mockRejectedValue(new Error('ログイン失敗'));

    await expect(loginWithGoogle()).rejects.toThrow('ログイン失敗');
    expect(user.value).toBeNull();
  });
});
describe('logout', () => {
  it('ログアウト成功', async () => {
    await logout();
    expect(user.value).toBeNull();
  });

  it('ログアウト失敗', async () => {
    /*eslint-disable-next-line @typescript-eslint/no-explicit-any */
    user.value = { uid: 'test-uid' } as any; // NOTE: 初期状態をログイン状態に設定

    const { signOut } = await import('firebase/auth');
    vi.mocked(signOut).mockRejectedValue(new Error('ログアウト失敗'));
    await logout();

    expect(user.value).toEqual({
      uid: 'test-uid',
    });
  });
});
