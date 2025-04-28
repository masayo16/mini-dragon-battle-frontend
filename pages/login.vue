<script setup lang="ts">
import { useGoogleAuth } from '~/composables/useGoogleAuth';

const { loginWithGoogle, isLoading } = useGoogleAuth();
</script>

<template>
  <div class="login-container">
    <button @click="loginWithGoogle" :disabled="isLoading">
      Googleアカウントでログイン
    </button>
  </div>
</template>
