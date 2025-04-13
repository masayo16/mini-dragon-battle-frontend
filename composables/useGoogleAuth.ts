import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth/web-extension';
import { useNuxtApp } from '#app';
import { ref } from 'vue';

export const useGoogleAuth = () => {
  const { $firebase } = useNuxtApp();
  const provider = new GoogleAuthProvider();

  const loginWIthGoogle = async () => {
    try {
      await signInWithPopup($firebase.auth, provider);
    } catch (error) {}
  };
};
