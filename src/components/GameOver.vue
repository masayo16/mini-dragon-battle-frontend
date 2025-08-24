<script setup lang="ts">
import { useScoreStore } from '~/stores/score.store';
import { usePlayerStore } from '~/stores/player.store';

const scoreStore = useScoreStore();
const playerStore = usePlayerStore();

const emit = defineEmits<{
  restart: []
  menu: []
}>();

const handleRestart = () => {
  scoreStore.reset();
  playerStore.reset();
  emit('restart');
};

const handleMenu = () => {
  emit('menu');
};
</script>

<template>
  <div class="game-over-overlay">
    <div class="game-over-modal">
      <h1 class="game-over-title">GAME OVER</h1>
      
      <div class="final-score">
        <span class="score-label">Final Score</span>
        <span class="score-value">{{ scoreStore.value }}</span>
      </div>
      
      <div class="game-over-actions">
        <button 
          class="btn-primary restart-btn"
          @click="handleRestart"
        >
          RESTART
        </button>
        <button 
          class="btn-secondary menu-btn"
          @click="handleMenu"
        >
          MAIN MENU
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-over-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.game-over-modal {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  border: 3px solid #fbbf24;
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 90%;
}

.game-over-title {
  color: #ef4444;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 2rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.1em;
}

.final-score {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 0.5rem;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.score-label {
  color: #fbbf24;
  font-size: 1.1rem;
  font-weight: 600;
}

.score-value {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.game-over-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-secondary {
  background: transparent;
  color: #9ca3af;
  border: 2px solid #4b5563;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-secondary:hover {
  background: #4b5563;
  color: white;
  transform: translateY(-2px);
}

.restart-btn {
  font-size: 1.1rem;
  padding: 1rem 2rem;
}

@media (max-width: 480px) {
  .game-over-modal {
    padding: 2rem;
    margin: 1rem;
  }
  
  .game-over-title {
    font-size: 2rem;
  }
  
  .score-value {
    font-size: 1.5rem;
  }
}
</style>