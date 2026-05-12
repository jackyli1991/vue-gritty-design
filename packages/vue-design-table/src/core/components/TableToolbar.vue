<template>
  <div class="table-toolbar table-design-wrapper">
    <div class="table-toolbar-content">
      <!-- 工具条内容 -->
      <div
        v-for="item in operateOptions"
        :key="item.value as string"
        class="toolbar-item"
        @click.stop="handleLayoutToolbarAction(item.value as Position)"
      >
        <aTooltip :title="item.label" placement="top">
          <IconifyIcon :icon="item.icon" :size="20" :danger="item.danger" />
        </aTooltip>
      </div>
      <aTooltip :title="layerPanelVisible ? '关闭图层' : '图层'" placement="top">
        <div class="toolbar-item" :class="{ active: layerPanelVisible }" @click="handleLayerPanel">
          <IconifyIcon icon="material-symbols:layers-outline-rounded" :size="20" />
        </div>
      </aTooltip>
    </div>
    <div class="table-toolbar-right">
      <aButton size="small">指引</aButton>
      <aButton size="small">数据预览</aButton>
      <aButton size="small">表格预览</aButton>
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
import { useToolbarAction } from '@/composables/useToolbarAction'

const { handleLayoutToolbarAction } = useToolbarAction()

const {
  getLayoutToolbar,
  activeCanvasLayout,
  attributesPanelCollapsed,
  toggleAttributesPanel,
  layerPanelVisible,
  openLayerPanel,
  closeLayerPanel,
} = useDesignContext()

// 工具条操作项
const operateOptions = computed(() => {
  if (!activeCanvasLayout.value) {
    return []
  }
  return getLayoutToolbar(activeCanvasLayout.value?.id)
})

// 处理图层弹窗
function handleLayerPanel() {
  if (layerPanelVisible.value) {
    closeLayerPanel()
  } else {
    openLayerPanel()
  }
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

.toolbar-item {
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

  &.active {
    background-color: var(--vdt-primary-light);
    color: var(--vdt-primary);
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
