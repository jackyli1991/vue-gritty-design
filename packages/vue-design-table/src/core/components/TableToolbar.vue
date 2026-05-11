<template>
  <div class="table-toolbar table-design-wrapper">
    <div class="table-toolbar-content">
      <!-- 工具条内容 -->
      <div
        v-for="item in operateOptions"
        :key="item.value as string"
        class="toolbar-item"
        @click.stop="handleAction(item.value as Position)"
      >
        <aTooltip :title="item.label" placement="top">
          <IconifyIcon :icon="item.icon" :size="20" :danger="item.danger" />
        </aTooltip>
      </div>
    </div>
    <div class="table-toolbar-right">
      <aTooltip title="图层" placement="top">
        <IconifyIcon icon="material-symbols:layers-outline-rounded" :size="20" />
      </aTooltip>
      <aButton size="small">预览</aButton>
      <aButton size="small" type="primary">保存</aButton>
      <aTooltip :title="attributesPanelCollapsed ? '展开属性面板' : '折叠属性面板'" placement="top">
        <div
          class="collapse-btn"
          :class="{ collapsed: attributesPanelCollapsed }"
          @click="toggleAttributesPanel"
        >
          <IconifyIcon :icon="'material-symbols:keyboard-double-arrow-right-rounded'" :size="20" />
        </div>
      </aTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Position } from '@/types'
import { Tooltip as aTooltip, Button as aButton } from 'ant-design-vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import { useDesignContext } from '@/composables/useDesignContext'

const { getLayoutToolbar, activeCanvasLayout, attributesPanelCollapsed, toggleAttributesPanel } =
  useDesignContext()

const operateOptions = computed(() => {
  if (!activeCanvasLayout.value) {
    return []
  }
  return getLayoutToolbar(activeCanvasLayout.value?.id)
})

// 处理操作
function handleAction(direction: Position) {
  console.log(direction)
  // emit('action', direction)
}
</script>

<style scoped lang="scss">
.table-toolbar {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 8px;
  gap: 8px;
  display: flex;
  &-content {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &-right {
    width: 300px;
    gap: 8px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }

  :deep(.iconify-icon) {
    transition: transform 0.3s ease;
  }

  &.collapsed :deep(.iconify-icon) {
    transform: rotate(180deg);
  }
}
</style>
