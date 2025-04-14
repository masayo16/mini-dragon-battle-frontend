import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth/web-extension';
import { useNuxtApp } from '#app';
import type { User } from 'firebase/auth';

export const useGoogleAuth = () => {
  const { $firebase } = useNuxtApp();
  const user = ref<User | null>($firebase.auth.currentUser);
  const isLoading = ref(true);

  const provider = new GoogleAuthProvider();

  const loginWIthGoogle = async () => {
    try {
      const result = await signInWithPopup($firebase.auth, provider);
      user.value = result.user;
    } catch (error) {
      console.error('ログイン失敗', error);
    } finally {
      isLoading.value = false;
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
};
