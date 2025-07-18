<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGame } from '~/composables/useGame';

const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  useGame(container);
});
</script>

<template>
  <div class="play-root">
    <div ref="container" class="game-container" />
  </div>
</template>

<style scoped>
.play-root {
  width: 100vw;
}
.game-container {
  width: 640px;
  height: 480px;
}
</style>
