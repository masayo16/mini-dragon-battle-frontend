<!--
MainMenu Component
Purpose: Orchestrates the main navigation menu with primary and secondary action buttons
Responsibility: Handles menu layout, user interaction events, and footer presentation for the home screen
Usage: <MainMenu @start-game="handleStart" @open-settings="handleSettings" @open-credits="handleCredits" />
-->

<script setup lang="ts">
import RetroButton from './RetroButton.vue';

defineEmits<{
  startGame: [];
  openSettings: [];
  openCredits: [];
}>();
</script>

<template>
  <div class="menu-section">
    <div class="menu-container">
      <RetroButton
        size="large"
        pulse
        @click="$emit('startGame')"
      >
        START GAME
      </RetroButton>
      
      <div class="menu-options">
        <RetroButton
          variant="secondary"
          @click="$emit('openSettings')"
        >
          SETTINGS
        </RetroButton>
        
        <RetroButton
          variant="secondary"
          @click="$emit('openCredits')"
        >
          CREDITS
        </RetroButton>
      </div>
    </div>

    <div class="footer-section">
      <div class="pixel-divider"></div>
      <p class="footer-text">Press START to begin your quest</p>
    </div>
  </div>
</template>

<style scoped>
.menu-section {
  z-index: 1;
  margin-bottom: 2rem;
}

.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.menu-options {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-section {
  margin-top: 3rem;
  text-align: center;
}

.pixel-divider {
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
  margin: 0 auto 1rem;
}

.footer-text {
  color: #888;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  font-family: 'Courier New', monospace;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

@media (max-width: 768px) {
  .menu-options {
    flex-direction: column;
    align-items: center;
  }
}
</style>