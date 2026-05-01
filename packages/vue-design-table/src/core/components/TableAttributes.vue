<template>
<div class="table-design-attributes">
  <div class="attributes-content">
    <div v-if="!activeCanvasElement" class="empty-attributes">
      请选择一个元素进行编辑
    </div>
    <div v-else class="attributes-form">
      <div class="attributes-group">
        <div class="attributes-item">
          <label>组件类型</label>
          <div class="attributes-value">{{ activeCanvasElement.name }}</div>
        </div>
        <div class="attributes-item">
          <label>ID</label>
          <div class="attributes-value">{{ activeCanvasElement.id }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import type { CanvasElement } from '@/types'

interface CanvasContext {
  activeCanvasElement: CanvasElement | null
}

const canvasContext = inject<CanvasContext>('canvasContext')

const activeCanvasElement = canvasContext?.activeCanvasElement

</script>

<style scoped lang="scss">
.table-design-attributes {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 300px;
  flex-shrink: 0;
  .attributes-content {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
  }
  .empty-properties {
    text-align: center;
    color: #999;
    padding: 40px 20px;
    font-size: 14px;
  }

  .attributes-form {
    .attributes-group {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .attributes-title {
      font-weight: 600;
      font-size: 14px;
      color: #333;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #f0f0f0;
    }

    .attributes-item {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }

      label {
        display: block;
        font-size: 13px;
        color: #666;
        margin-bottom: 8px;
      }
    }

    .attributes-value {
      padding: 8px 12px;
      background: #f5f5f5;
      border-radius: 4px;
      font-size: 13px;
      color: #333;
      word-break: break-all;
    }
  }

}
</style>
