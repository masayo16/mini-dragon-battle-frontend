<!--
GameLogo Component
Purpose: Displays the main game title with retro cyberpunk styling
Responsibility: Handles all logo presentation logic including animations and responsive design
-->

<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="game-logo-section">
    <div class="pixel-border">
      <h1 class="game-title">
        <span class="title-line">MINI</span>
        <span class="title-line dragon">DRAGON</span>
        <span class="title-line">BATTLE</span>
      </h1>
    </div>

    <div class="subtitle-container">
      <p class="subtitle">~ RETRO ADVENTURE AWAITS ~</p>
    </div>
  </div>
</template>

<style scoped>
.game-logo-section {
  text-align: center;
  margin-bottom: 3rem;
  z-index: 1;
}

.pixel-border {
  border: 4px solid #00ffff;
  border-radius: 0;
  padding: 2rem;
  background: rgba(0, 255, 255, 0.1);
  box-shadow:
    0 0 20px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  position: relative;
}

.pixel-border::before {
  content: '';
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border: 2px solid #ff00ff;
  z-index: -1;
}

.game-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #00ffff;
  text-shadow:
    2px 2px 0px #ff00ff,
    4px 4px 0px #000,
    6px 6px 10px rgba(0, 255, 255, 0.5);
  line-height: 0.9;
  letter-spacing: 0.1em;
  font-family: 'Courier New', monospace;
}

.title-line {
  display: block;
}

.dragon {
  color: #ff00ff;
  text-shadow:
    2px 2px 0px #00ffff,
    4px 4px 0px #000,
    6px 6px 10px rgba(255, 0, 255, 0.5);
}

.subtitle-container {
  margin-top: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #ffff00;
  text-shadow: 1px 1px 0px #000;
  letter-spacing: 0.2em;
  font-family: 'Courier New', monospace;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow:
      1px 1px 0px #000,
      0 0 5px #ffff00;
  }
  to {
    text-shadow:
      1px 1px 0px #000,
      0 0 20px #ffff00,
      0 0 30px #ffff00;
  }
}

@media (max-width: 768px) {
  .game-title {
    font-size: 2.5rem;
  }

  .pixel-border {
    padding: 1.5rem;
    margin: 0 1rem;
  }
}
</style>
