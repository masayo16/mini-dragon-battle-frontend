<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useScoreStore } from '~/stores/score.store';
import { usePlayerStore } from '~/stores/player.store';

const scoreStore = useScoreStore();
const playerStore = usePlayerStore();

const emit = defineEmits<{
  restart: []
  menu: []
}>();

const bonusScore = ref(0);
const totalScore = ref(0);
const bonusAdded = ref(false);

onMounted(() => {
  if (!bonusAdded.value) {
    bonusScore.value = playerStore.lives * 1000;
    totalScore.value = scoreStore.value + bonusScore.value;
    
    // NOTE: ボーナススコアを1回だけ加算
    scoreStore.add(bonusScore.value);
    bonusAdded.value = true;
    
    console.log(`Game Clear Bonus: +${bonusScore.value} points for ${playerStore.lives} lives`);
  }
});

const handleRestart = () => {
  scoreStore.reset();
  playerStore.reset();
  bonusAdded.value = false;
  emit('restart');
};

const handleMenu = () => {
  emit('menu');
};
</script>

<template>
  <div class="game-clear-overlay">
    <div class="game-clear-modal">
      <div class="celebration-stars">
        <div class="star star-1">★</div>
        <div class="star star-2">✦</div>
        <div class="star star-3">★</div>
        <div class="star star-4">✧</div>
        <div class="star star-5">★</div>
      </div>

      <h1 class="game-clear-title">LEVEL CLEAR!</h1>
      
      <div class="clear-stats">
        <div class="stat-row">
          <span class="stat-label">Score:</span>
          <span class="stat-value">{{ scoreStore.value }}</span>
        </div>
        
        <div class="stat-row bonus">
          <span class="stat-label">Lives Bonus:</span>
          <span class="stat-value">{{ playerStore.lives }} × 1000 = {{ bonusScore }}</span>
        </div>
        
        <div class="stat-divider"></div>
        
        <div class="stat-row total">
          <span class="stat-label">Total Score:</span>
          <span class="stat-value">{{ totalScore }}</span>
        </div>
      </div>
      
      <div class="game-clear-actions">
        <div class="main-actions">
          <button 
            class="btn-primary restart-btn"
            @click="handleRestart"
          >
            PLAY AGAIN
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
  </div>
</template>

<style scoped>
.game-clear-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.game-clear-modal {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  border: 3px solid #10b981;
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(16, 185, 129, 0.3);
  max-width: 500px;
  width: 90%;
  position: relative;
  animation: modal-appear 0.5s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.celebration-stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.star {
  position: absolute;
  color: #fbbf24;
  font-size: 1.5rem;
  animation: twinkle 2s ease-in-out infinite;
}

.star-1 { top: 10%; left: 15%; animation-delay: 0s; }
.star-2 { top: 20%; right: 20%; animation-delay: 0.5s; }
.star-3 { bottom: 20%; left: 10%; animation-delay: 1s; }
.star-4 { top: 15%; left: 50%; animation-delay: 1.5s; }
.star-5 { bottom: 15%; right: 15%; animation-delay: 0.8s; }

@keyframes twinkle {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.game-clear-title {
  color: #10b981;
  font-size: 3rem;
  font-weight: bold;
  margin: 0 0 2rem 0;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(16, 185, 129, 0.5);
  letter-spacing: 0.1em;
  animation: title-glow 2s ease-in-out infinite alternate;
}

@keyframes title-glow {
  from { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(16, 185, 129, 0.5); }
  to { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.8); }
}

.clear-stats {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.stat-row:last-child {
  margin-bottom: 0;
}

.stat-label {
  color: #d1d5db;
  font-weight: 600;
}

.stat-value {
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.bonus .stat-label,
.bonus .stat-value {
  color: #fbbf24;
}

.stat-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent);
  margin: 1rem 0;
}

.total {
  font-size: 1.3rem;
  border-top: 2px solid rgba(16, 185, 129, 0.3);
  padding-top: 0.75rem;
  margin-top: 0.75rem;
  margin-bottom: 0;
}

.total .stat-value {
  color: #10b981;
  font-size: 1.4rem;
}

.game-clear-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.restart-btn {
  font-size: 1.1rem;
  padding: 1rem 2rem;
}

.btn-secondary {
  background: transparent;
  color: #9ca3af;
  border: 2px solid #4b5563;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex: 1;
}

.btn-secondary:hover {
  background: #4b5563;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 480px) {
  .game-clear-modal {
    padding: 2rem;
    margin: 1rem;
  }
  
  .game-clear-title {
    font-size: 2.2rem;
  }
  
  .main-actions {
    flex-direction: column;
  }
}
</style>