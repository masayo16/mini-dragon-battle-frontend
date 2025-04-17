import { ref, onMounted } from 'vue';

export const useAuth = () => {
  const { $firebase } = useNuxtApp();
  const user = ref($firebase.auth.currentUser);
  let unsubscribe: (() => void) | null = null; // NOTE: Firebase Authの監視を解除するための関数

  onMounted(() => {
    unsubscribe = $firebase.auth.onAuthStateChanged(currentUser => {
      user.value = currentUser;
    });
  });

  onUnmounted(() => {
    // NOTE: コンポーネントが破棄される時に監視を停止（リソースを解放）
    if (unsubscribe) {
      unsubscribe();
    }
  });

  return { user };
};
