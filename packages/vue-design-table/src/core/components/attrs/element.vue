<template>
  <div class="element-attrs">
    {{ activeCanvasElement }}
    <div v-if="activeCanvasElement" class="attributes-form">
      <div class="attributes-group">
        <div class="attributes-item">
          <label>组件类型</label>
          <div class="attributes-value">{{ activeCanvasElement?.name }}</div>
        </div>
        <div class="attributes-item">
          <label>ID</label>
          <div class="attributes-value">{{ activeCanvasElement?.id }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { CanvasContext } from '@/types'

defineOptions({
  name: 'ElementAttrs',
})

// 从父组件注入配置数据
const canvasContext = inject<CanvasContext>('canvasContext')
const activeCanvasElement = canvasContext?.activeCanvasElement
</script>
