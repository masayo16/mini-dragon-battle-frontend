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
  text-align: center;
  font-family: 'Courier New', monospace;
  position: relative;
}

.score-header {
  color: #00ffff;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.15em;
  margin-bottom: 0.2rem;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.5);
  text-transform: uppercase;
}

.score-value {
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .score-header {
    font-size: 0.7rem;
  }
  
  .score-value {
    font-size: 1rem;
  }
}
</style>