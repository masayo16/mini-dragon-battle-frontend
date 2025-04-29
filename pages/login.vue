<script setup lang="ts">
import { useGoogleAuth } from '~/composables/useGoogleAuth';

const { loginWithGoogle, isLoading } = useGoogleAuth();
</script>

<template>
  <div class="login-container">
    <button :disabled="isLoading" @click="loginWithGoogle">
      Googleアカウントでログイン
    </button>
  </div>
</template>
