<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGame } from '~/composables/useGame';

// NOTE: Pixiはブラウザ専用、SSRを無効にする
definePageMeta({
  ssr: false,
});

const container = ref<HTMLDivElement | null>(null);

// NOTE: onMountedでPixi.Applicationを初期化
onMounted(() => {
  useGame(container);
});
</script>
<template>
  <!-- 画面中央に 640x480 のキャンバスを出すだけ -->
  <div ref="container" class="game-container" />
</template>

<style scoped>
.game-container {
  width: 640px;
  height: 480px;
}
</style>
