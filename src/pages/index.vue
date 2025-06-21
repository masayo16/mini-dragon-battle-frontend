<script setup lang="ts">
useHead({
  title: 'Mini Dragon Battle - Retro Adventure Awaits',
  meta: [
    { name: 'description', content: 'Enter the pixelated world of Mini Dragon Battle' }
  ]
})
</script>

<template>
  <div class="home-container">
    <div class="stars-bg"></div>
    
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

    <div class="menu-section">
      <div class="menu-container">
        <button class="btn-retro btn-start" @click="navigateTo('/login')">
          <span class="btn-text">START GAME</span>
        </button>
        
        <div class="menu-options">
          <button class="btn-retro btn-secondary">
            <span class="btn-text">SETTINGS</span>
          </button>
          <button class="btn-retro btn-secondary">
            <span class="btn-text">CREDITS</span>
          </button>
        </div>
      </div>
    </div>

    <div class="footer-section">
      <div class="pixel-divider"></div>
      <p class="footer-text">Press START to begin your quest</p>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-family: 'Courier New', monospace;
}

.stars-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #fff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 160px 30px, #fff, transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: twinkle 3s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

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
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { text-shadow: 1px 1px 0px #000, 0 0 5px #ffff00; }
  to { text-shadow: 1px 1px 0px #000, 0 0 20px #ffff00, 0 0 30px #ffff00; }
}

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

.btn-retro {
  border: 3px solid #00ffff;
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  color: #00ffff;
  padding: 1rem 2rem;
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 0 #004444,
    0 8px 20px rgba(0, 0, 0, 0.3);
}

.btn-retro:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 6px 0 #004444,
    0 12px 25px rgba(0, 0, 0, 0.4),
    0 0 15px rgba(0, 255, 255, 0.3);
}

.btn-retro:active {
  transform: translateY(2px);
  box-shadow: 
    0 2px 0 #004444,
    0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-start {
  font-size: 1.3rem;
  padding: 1.2rem 2.5rem;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 4px 0 #004444, 0 8px 20px rgba(0, 0, 0, 0.3); }
  50% { box-shadow: 0 4px 0 #004444, 0 8px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 255, 0.4); }
}

.btn-secondary {
  border-color: #ff00ff;
  color: #ff00ff;
  box-shadow: 
    0 4px 0 #440044,
    0 8px 20px rgba(0, 0, 0, 0.3);
}

.btn-secondary:hover {
  box-shadow: 
    0 6px 0 #440044,
    0 12px 25px rgba(0, 0, 0, 0.4),
    0 0 15px rgba(255, 0, 255, 0.3);
}

.btn-secondary:active {
  box-shadow: 
    0 2px 0 #440044,
    0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-text {
  position: relative;
  z-index: 1;
}

.footer-section {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 1;
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
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

@media (max-width: 768px) {
  .game-title {
    font-size: 2.5rem;
  }
  
  .pixel-border {
    padding: 1.5rem;
    margin: 0 1rem;
  }
  
  .menu-options {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-retro {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
