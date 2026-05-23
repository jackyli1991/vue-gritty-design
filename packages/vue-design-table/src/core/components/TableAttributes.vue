<template>
  <div class="table-design-attributes table-design-wrapper">
    <div class="attributes-content">
      <div v-if="!activeCompType" class="attributes-empty">请选择一个元素进行编辑</div>
      <!-- 布局属性编辑 -->
      <template v-else>
        <component
          v-for="component in attrComponentsMap[activeCompType]"
          :key="component.name"
          :is="component"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ColumnType } from '@/types'
import type { attrComponentsMapType } from './attrs/index.ts'
import { computed } from 'vue'
import { useDesignContext } from '@/composables/useDesignContext'
import { attrComponentsMap } from './attrs/index.ts'

const { activeCanvasElement, activeCanvasLayout } = useDesignContext()

// 当前选中的layout或element类型
const activeCompType = computed<attrComponentsMapType | undefined>(
  (): attrComponentsMapType | undefined => {
    if (activeCanvasLayout.value) return activeCanvasLayout.value?.type
    if (activeCanvasElement.value) return activeCanvasElement.value?.type as ColumnType
    return undefined
  },
)
</script>

<style scoped lang="scss">
.table-design-attributes {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 300px;
  flex-shrink: 0;
  background: transparent !important;
  box-shadow: none !important;
  .attributes-content {
    flex: 1;
    // padding: 8px;
    overflow-y: auto;
  }
  .attributes-empty {
    text-align: center;
    color: var(--vdt-font-color-light);
    padding: 40px 0;
    font-size: 12px;
  }
}
</style>
