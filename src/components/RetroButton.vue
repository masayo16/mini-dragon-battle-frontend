<!--
RetroButton Component
Purpose: Reusable button with consistent retro styling and multiple configuration options
Responsibility: Provides standardized button interactions, animations, and visual states across the application
Usage: <RetroButton variant="primary" size="large" pulse @click="handleClick">Button Text</RetroButton>
-->

<script setup lang="ts">
export interface RetroButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  pulse?: boolean;
}

defineProps<RetroButtonProps>();
defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    :class="[
      'btn-retro',
      `btn-${variant || 'primary'}`,
      `btn-${size || 'medium'}`,
      { 'btn-pulse': pulse }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span class="btn-text">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.btn-retro {
  border: 3px solid #00ffff;
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  color: #00ffff;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 0.1em;
  box-shadow: 
    0 4px 0 #004444,
    0 8px 20px rgba(0, 0, 0, 0.3);
}

.btn-retro:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 
    0 6px 0 #004444,
    0 12px 25px rgba(0, 0, 0, 0.4),
    0 0 15px rgba(0, 255, 255, 0.3);
}

.btn-retro:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow: 
    0 2px 0 #004444,
    0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-retro:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-medium {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.btn-large {
  padding: 1.2rem 2.5rem;
  font-size: 1.3rem;
}

.btn-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { 
    box-shadow: 0 4px 0 #004444, 0 8px 20px rgba(0, 0, 0, 0.3); 
  }
  50% { 
    box-shadow: 0 4px 0 #004444, 0 8px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 255, 0.4); 
  }
}

.btn-secondary {
  border-color: #ff00ff;
  color: #ff00ff;
  box-shadow: 
    0 4px 0 #440044,
    0 8px 20px rgba(0, 0, 0, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  box-shadow: 
    0 6px 0 #440044,
    0 12px 25px rgba(0, 0, 0, 0.4),
    0 0 15px rgba(255, 0, 255, 0.3);
}

.btn-secondary:active:not(:disabled) {
  box-shadow: 
    0 2px 0 #440044,
    0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-secondary.btn-pulse {
  animation: pulse-secondary 1.5s ease-in-out infinite;
}

@keyframes pulse-secondary {
  0%, 100% { 
    box-shadow: 0 4px 0 #440044, 0 8px 20px rgba(0, 0, 0, 0.3); 
  }
  50% { 
    box-shadow: 0 4px 0 #440044, 0 8px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 0, 255, 0.4); 
  }
}

.btn-text {
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .btn-small {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .btn-medium {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
  
  .btn-large {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}
</style>