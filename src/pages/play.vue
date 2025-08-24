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
  gameEngine = await useGame(container) || null;
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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 1rem;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
  font-family: 'Courier New', monospace;
}

.play-root::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 25px 25px, #fff, transparent),
    radial-gradient(1px 1px at 75px 75px, rgba(255,255,255,0.8), transparent),
    radial-gradient(3px 3px at 125px 25px, #fff, transparent),
    radial-gradient(2px 2px at 175px 125px, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 50px 100px, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 150px 75px, rgba(255,255,255,0.7), transparent);
  background-repeat: repeat;
  background-size: 200px 150px;
  animation: twinkle-slow 3s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 0;
}

@keyframes twinkle-slow {
  0% { opacity: 0.4; }
  100% { opacity: 0.8; }
}

.game-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.game-container {
  width: 640px;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  border: 2px solid #00ffff;
  border-radius: 8px;
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.2),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
}

.game-container::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 1px solid #ff00ff;
  border-radius: 10px;
  z-index: -1;
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
