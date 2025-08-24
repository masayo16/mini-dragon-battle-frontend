<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGame } from '~/composables/useGame';
import { useScoreStore } from '~/stores/score.store';
import ScoreBoard from '~/components/ScoreBoard.vue';

const container = ref<HTMLDivElement | null>(null);
const scoreStore = useScoreStore();

onMounted(async () => {
  await scoreStore.fetch();
  useGame(container);
});
</script>

<template>
  <div class="play-root">
    <div class="game-header">
      <ScoreBoard />
    </div>
    <div ref="container" class="game-container" />
  </div>
</template>

<style scoped>
.play-root {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 1rem;
  box-sizing: border-box;
  overflow-y: auto;
}

.game-header {
  display: flex;
  justify-content: center;
}

.game-container {
  width: 640px;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .play-root {
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .game-container {
    width: 100%;
    max-width: 640px;
    height: auto;
    aspect-ratio: 4/3;
  }
}
</style>
