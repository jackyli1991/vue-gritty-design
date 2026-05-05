<template>
  <div class="layout-attrs">
    <LayoutForm v-if="activeCanvasLayout" :formData="activeCanvasLayout" :cols="1" />
  </div>
</template>

<script setup lang="ts">
import { inject, toRef } from 'vue'

import type { CanvasContext } from '@/types'
import LayoutForm from '../form/LayoutForm.vue'

defineOptions({
  name: 'LayoutAttrs',
})

// 从父组件注入配置数据
const canvasContext = inject<CanvasContext>('canvasContext')
const activeCanvasLayout = toRef(canvasContext?.activeCanvasLayout)
</script>
