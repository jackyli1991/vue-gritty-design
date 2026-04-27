<template>
  <div
    v-show="progressStore.visible"
    class="progress-bar"
    :style="{ width: `${progressStore.percentage}%`, opacity: progressStore.visible ? 1 : 0 }"
  />
</template>

<script setup lang="ts">
import { useProgressStore } from '@/stores/progress'

const progressStore = useProgressStore()
</script>

<style scoped>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, #1890ff 0%, #52c41a 100%);
  z-index: 9999;
  transition: width 0.3s ease, opacity 0.3s ease;
  box-shadow: 0 0 10px rgba(24, 144, 255, 0.5);
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  animation: shimmer 1s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(100px);
  }
}
</style>
