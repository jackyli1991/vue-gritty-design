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
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'ElementAttrs',
})

const { activeCanvasElement } = useDesignContext()
</script>
