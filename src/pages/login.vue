<script setup lang="ts">
import { useGoogleAuth } from '~/composables/useGoogleAuth';
import { useRouter } from 'vue-router';
import LoadingIndicator from '~/components/LoadingIndicator.vue';

const router = useRouter();
const loading = useLoadingStore();
const { loginWithGoogle } = useGoogleAuth();

const handleLogin = async () => {
  loading.startLoading();
  try {
    await loginWithGoogle();
    router.push({ name: 'play' });
  } catch (error) {
    console.error(error);
  } finally {
    loading.stopLoading();
  }
};
</script>

<template>
  <div class="login-container">
    <div>
      <LoadingIndicator :show="loading.isLoading" />
    </div>

    <button class="btn-primary" @click="handleLogin">
      Googleアカウントでログイン
    </button>
  </div>
</template>
