import { auth } from '~/plugins/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { ref } from 'vue';

const user = ref<User | null>(null);

onAuthStateChanged(auth, currentUser => {
  user.value = currentUser;
});

export const useAuth = () => {
  return {};
};
