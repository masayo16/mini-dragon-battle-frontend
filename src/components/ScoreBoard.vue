<!--
ScoreBoard Component
Purpose: Display current game score with retro styling consistent with the Mini Dragon Battle theme
Responsibility: Shows real-time score updates and maintains visual consistency with game aesthetics
Usage: <ScoreBoard />
-->

<script setup lang="ts">
import { useScoreStore } from '~/stores/score.store';

const scoreStore = useScoreStore();
</script>

<template>
  <div class="scoreboard">
    <div class="score-header">SCORE</div>
    <div class="score-value">{{ scoreStore.value.toLocaleString() }}</div>
  </div>
</template>

<style scoped>
.scoreboard {
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  border: 3px solid #00ffff;
  border-radius: 8px;
  padding: 1rem;
  min-width: 150px;
  text-align: center;
  font-family: 'Courier New', monospace;
  box-shadow: 
    0 4px 0 #004444,
    0 8px 20px rgba(0, 0, 0, 0.3),
    inset 0 2px 0 rgba(0, 255, 255, 0.1);
  position: relative;
}

.scoreboard::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #00ffff, #004444, #00ffff);
  border-radius: 10px;
  z-index: -1;
  opacity: 0.3;
}

.score-header {
  color: #00ffff;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.score-value {
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.score-value:hover {
  text-shadow: 0 0 20px rgba(0, 255, 255, 1);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .scoreboard {
    min-width: 120px;
    padding: 0.8rem;
  }
  
  .score-header {
    font-size: 0.8rem;
  }
  
  .score-value {
    font-size: 1.5rem;
  }
}
</style>