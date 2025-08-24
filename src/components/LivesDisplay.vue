<script setup lang="ts">
import { usePlayerStore } from '~/stores/player.store';

const playerStore = usePlayerStore();
</script>

<template>
  <div class="lives-display">
    <span class="lives-label">Lives:</span>
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: bold;
}

.lives-label {
  color: #fbbf24;
}

.lives-hearts {
  display: flex;
  gap: 0.25rem;
}

.heart {
  color: #ef4444;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.heart--empty {
  color: #374151;
}
</style>