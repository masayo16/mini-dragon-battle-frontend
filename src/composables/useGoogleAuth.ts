import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { useNuxtApp } from '#app';

export const useGoogleAuth = () => {
  // NOTE:SSRを無視する。
  if (!import.meta.client) {
    return {
      user: ref(null),

      loginWithGoogle: () => {},
      logout: () => {},
    };
  }

  const { $firebase } = useNuxtApp();
  const user = ref($firebase.auth.currentUser);

  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup($firebase.auth, provider);
      user.value = result.user;
    } catch (error) {
      console.error('ログイン失敗', error);
    }
  };

  const logout = async () => {
    try {
      await signOut($firebase.auth);
      user.value = null;
    } catch (error) {
      console.error('ログアウト失敗', error);
    }
  };

  return { user, loginWithGoogle, logout };
};
