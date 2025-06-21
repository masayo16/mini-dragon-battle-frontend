<!--
LoadingIndicator Component
Purpose: Displays retro-styled loading screen with terminal interface and progress animations
Responsibility: Provides visual feedback during async operations with consistent theming and accessibility
Usage: <LoadingIndicator :show="isLoading" />
-->

<script setup lang="ts">
defineProps<{ show: boolean }>();
</script>

<template>
  <div v-if="show" class="loading-backdrop">
    <div class="loading-container">
      <div class="loading-frame">
        <div class="loading-header">
          <span class="loading-title">DRAGON SYSTEM</span>
        </div>
        
        <div class="loading-content">
          <div class="loading-text">
            <p class="loading-line">
              <span class="prompt">></span> Initializing...
            </p>
            <p class="loading-line">
              <span class="prompt">></span> Loading assets
              <span class="loading-dots">...</span>
            </p>
          </div>
          
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
            <p class="progress-text">Please wait</p>
          </div>
        </div>
      </div>
      
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 15, 35, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.loading-container {
  text-align: center;
  font-family: 'Courier New', monospace;
}

.loading-frame {
  background: rgba(26, 26, 46, 0.95);
  border: 3px solid #00ffff;
  border-radius: 0;
  padding: 1.5rem;
  min-width: 300px;
  margin-bottom: 1rem;
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
}

.loading-header {
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.loading-title {
  color: #00ffff;
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
}

.loading-content {
  margin-bottom: 1rem;
}

.loading-text {
  color: #00ff00;
  font-size: 0.9rem;
  line-height: 1.6;
  text-align: left;
  margin-bottom: 1rem;
}

.loading-line {
  margin-bottom: 0.3rem;
}

.prompt {
  color: #00ffff;
  font-weight: bold;
}

.loading-dots {
  animation: loading-dots 1.5s infinite;
}

@keyframes loading-dots {
  0%, 33% { content: '.'; }
  34%, 66% { content: '..'; }
  67%, 100% { content: '...'; }
}

.progress-container {
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #333;
  border: 1px solid #666;
  border-radius: 0;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ffff, #ff00ff);
  width: 0%;
  animation: progress-animation 2s ease-in-out infinite;
}

@keyframes progress-animation {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 0%; }
}

.progress-text {
  color: #ffff00;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  animation: pulse-text 1.5s ease-in-out infinite alternate;
}

@keyframes pulse-text {
  from { opacity: 0.7; }
  to { opacity: 1; text-shadow: 0 0 5px #ffff00; }
}

.loading-spinner {
  display: flex;
  justify-content: center;
}

.spinner-ring {
  width: 40px;
  height: 40px;
  border: 3px solid transparent;
  border-top: 3px solid #00ffff;
  border-right: 3px solid #ff00ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .loading-frame {
    min-width: 250px;
    padding: 1rem;
  }
  
  .loading-title {
    font-size: 1rem;
  }
  
  .loading-text {
    font-size: 0.8rem;
  }
}
</style>
