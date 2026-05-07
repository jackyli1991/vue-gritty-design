<template>
  <div class="layout-attrs">
    <LayoutForm
      v-if="activeCanvasLayout"
      :formData="activeCanvasLayout"
      hideRequiredMark
      :cols="1"
      :disabledFields="['id']"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import type { CanvasContext } from '@/types'
import LayoutForm from '../form/LayoutForm.vue'

defineOptions({
  name: 'LayoutAttrs',
})

const canvasContext = inject<CanvasContext>('canvasContext')
const activeCanvasLayout = computed(() => canvasContext?.activeCanvasLayout?.value)
</script>
