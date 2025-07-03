<script setup lang="ts">
import GameLogo from '~/components/GameLogo.vue';
import MainMenu from '~/components/MainMenu.vue';
import StarfieldBackground from '~/components/StarfieldBackground.vue';

useHead({
  title: 'Mini Dragon Battle - Retro Adventure Awaits',
  meta: [
    { name: 'description', content: 'Enter the pixelated world of Mini Dragon Battle' }
  ]
})

const handleStartGame = () => {
  navigateTo('/login');
};

const handleOpenSettings = () => {
  // TODO: Implement settings modal or page
  console.log('Settings clicked');
};

const handleOpenCredits = () => {
  // TODO: Implement credits modal or page
  console.log('Credits clicked');
};
</script>

<template>
  <div class="home-container">
    <StarfieldBackground />
    
    <GameLogo />

    <MainMenu 
      @start-game="handleStartGame"
      @open-settings="handleOpenSettings"
      @open-credits="handleOpenCredits"
    />
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
</style>
