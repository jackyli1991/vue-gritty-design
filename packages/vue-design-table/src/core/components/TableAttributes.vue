<template>
  <div class="table-design-attributes table-design-wrapper">
    <div class="attributes-content">
      <div v-if="!activeCanvasElement && !activeCanvasLayout" class="attributes-empty">
        请选择一个元素进行编辑
      </div>
      <!-- 布局属性编辑 -->
      <LayoutAttrs />
      <!-- 元素属性编辑 -->
      <ElementAttrs />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDesignContext } from '@/composables/useDesignContext'
import LayoutAttrs from './attrs/layout.vue'
import ElementAttrs from './attrs/element.vue'

const { activeCanvasElement, activeCanvasLayout } = useDesignContext()
</script>

<style scoped lang="scss">
.table-design-attributes {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 300px;
  flex-shrink: 0;
  .attributes-content {
    flex: 1;
    padding: 8px;
    overflow-y: auto;
  }
  .attributes-empty {
    text-align: center;
    color: var(--vdt-font-color-light);
    padding: 40px 0;
    font-size: 12px;
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
      color: var(--vdt-font-color);
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
        color: var(--vdt-font-color);
        margin-bottom: 8px;
      }
    }

    .attributes-value {
      padding: 8px 12px;
      background: #f5f5f5;
      border-radius: 4px;
      font-size: 13px;
      color: var(--vdt-font-color);
      word-break: break-all;
    }
  }
}
</style>
