<template>
  <div
    v-show="progressStore.visible"
    class="progress-bar"
    :style="progressBarStyle"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useProgressStore } from '@/stores/progress'
import { useLayoutStore } from '@/stores/layout'

const progressStore = useProgressStore()
const layoutStore = useLayoutStore()
const { visible, percentage } = storeToRefs(progressStore)
const { themeColor } = storeToRefs(layoutStore)

const progressBarStyle = computed(() => ({
  background: `linear-gradient(90deg, ${themeColor.value} 0%, #FFF 100%)`,
  width: `${percentage.value}%`,
  opacity: visible.value ? 1 : 0,
}))
</script>

<style scoped>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  z-index: 9999;
  transition: width 0.3s ease, opacity 0.3s ease;
  box-shadow: 0 0 10px rgba(225, 225, 225, 0.5);
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
