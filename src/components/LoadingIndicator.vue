<script setup lang="ts">
defineProps<{ show: boolean }>();
</script>

<template>
  <div v-if="show" class="loading-backdrop">
    <div class="spinner">Just a moment…</div>
  </div>
</template>

<style scoped>
.loading-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.spinner {
  font-size: 1.5rem;
  color: #333;
}
</style>
