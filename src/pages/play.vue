<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGame } from '~/composables/useGame';
import { useScoreStore } from '~/stores/score.store';
import { usePlayerStore } from '~/stores/player.store';
import { useGameStore } from '~/stores/game.store';
import type { GameEngine } from '~/game/engine/GameEngine';
import ScoreBoard from '~/components/ScoreBoard.vue';
import LivesDisplay from '~/components/LivesDisplay.vue';
import GameOver from '~/components/GameOver.vue';
import GameClear from '~/components/GameClear.vue';

const container = ref<HTMLDivElement | null>(null);
const scoreStore = useScoreStore();
const playerStore = usePlayerStore();
const gameStore = useGameStore();

let gameEngine: GameEngine | null = null;

onMounted(async () => {
  // NOTE: メインメニューから来た場合はリセット済み、
  // 既存スコアがある場合はそのまま継続
  await scoreStore.fetch();
  gameEngine = await useGame(container);
});

const handleRestart = async () => {
  await scoreStore.reset();
  playerStore.reset();
  gameStore.reset();
  
  if (gameEngine) {
    await gameEngine.restart();
  }
};

const handleMenu = () => {
  navigateTo('/');
};

const handleClearRestart = async () => {
  await scoreStore.reset();
  playerStore.reset();
  gameStore.reset();
  
  if (gameEngine) {
    await gameEngine.restart();
  }
};
</script>

<template>
  <div class="play-root">
    <div class="game-header">
      <ScoreBoard />
      <LivesDisplay />
    </div>
    <div ref="container" class="game-container" />
    
    <GameOver 
      v-if="gameStore.isGameOver"
      @restart="handleRestart"
      @menu="handleMenu"
    />
    
    <GameClear 
      v-if="gameStore.isGameCleared"
      @restart="handleClearRestart"
      @menu="handleMenu"
    />
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
  align-items: center;
  gap: 2rem;
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
