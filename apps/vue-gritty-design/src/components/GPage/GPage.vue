<template>
  <div class="g-page h-full flex flex-col p-4 rounded-lg bg-white">
    <div class="flex-1 page-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { OverlayScrollbars } from 'overlayscrollbars'

onMounted(() => {
  OverlayScrollbars(document.querySelector('.g-page') as HTMLElement, {
    scrollbars: {
      autoHide: 'leave',
    },
  })
})
</script>
