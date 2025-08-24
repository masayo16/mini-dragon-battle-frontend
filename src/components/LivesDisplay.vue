<script setup lang="ts">
import { usePlayerStore } from '~/stores/player.store';

const playerStore = usePlayerStore();
</script>

<template>
  <div class="lives-display">
    <div class="lives-header">LIVES</div>
    <div class="lives-hearts">
      <span 
        v-for="n in 3" 
        :key="n"
        class="heart"
        :class="{ 'heart--empty': n > playerStore.lives }"
      >
        ♥
      </span>
    </div>
  </div>
</template>

<style scoped>
.lives-display {
  text-align: center;
  font-family: 'Courier New', monospace;
  position: relative;
}

.lives-header {
  color: #00ffff;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.15em;
  margin-bottom: 0.2rem;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.5);
  text-transform: uppercase;
}

.lives-hearts {
  display: flex;
  justify-content: center;
  gap: 0.2rem;
}

.heart {
  color: #ef4444;
  font-size: 1.2rem;
  transition: color 0.2s;
  text-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
}

.heart--empty {
  color: #374151;
  text-shadow: none;
}

@media (max-width: 768px) {
  .lives-header {
    font-size: 0.7rem;
  }
  
  .heart {
    font-size: 1rem;
  }
}
</style>