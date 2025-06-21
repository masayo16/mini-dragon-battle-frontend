<!--
StarfieldBackground Component
Purpose: Provides animated starfield background with configurable star density and motion
Responsibility: Renders CSS-based star patterns with accessibility considerations and performance optimization
Usage: <StarfieldBackground intensity="medium" :animated="true" />
-->

<script setup lang="ts">
export interface StarfieldBackgroundProps {
  intensity?: 'light' | 'medium' | 'heavy';
  animated?: boolean;
}

defineProps<StarfieldBackgroundProps>();
</script>

<template>
  <div :class="[
    'stars-bg',
    `stars-${intensity || 'medium'}`,
    { 'stars-animated': animated !== false }
  ]"></div>
</template>

<style scoped>
.stars-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: repeat;
  pointer-events: none;
}

.stars-light {
  background-image: 
    radial-gradient(1px 1px at 50px 50px, #fff, transparent),
    radial-gradient(1px 1px at 150px 100px, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 250px 150px, #fff, transparent);
  background-size: 300px 200px;
}

.stars-medium {
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #fff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 160px 30px, #fff, transparent);
  background-size: 200px 100px;
}

.stars-heavy {
  background-image: 
    radial-gradient(2px 2px at 15px 20px, #fff, transparent),
    radial-gradient(1px 1px at 35px 50px, rgba(255,255,255,0.8), transparent),
    radial-gradient(2px 2px at 60px 25px, #fff, transparent),
    radial-gradient(1px 1px at 80px 60px, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 110px 15px, #fff, transparent),
    radial-gradient(1px 1px at 140px 70px, rgba(255,255,255,0.7), transparent),
    radial-gradient(2px 2px at 170px 45px, #fff, transparent);
  background-size: 180px 80px;
}

.stars-animated {
  animation: twinkle 3s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .stars-animated {
    animation: none;
    opacity: 0.7;
  }
}
</style>