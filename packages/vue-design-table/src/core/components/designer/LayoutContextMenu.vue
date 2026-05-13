<template>
  <Teleport to="body">
    <div v-if="isVisible" class="layout-context-menu" :style="menuStyle" @click.stop>
      <div class="context-menu-group">
        <div class="context-menu-group-title">添加布局</div>
        <div
          v-for="item in operateOptions"
          :key="item.value as string"
          class="context-menu-item"
          @click="handleAction(item.value as Position)"
        >
          <IconifyIcon :icon="item.icon" :danger="item.danger" />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import { Position } from '@/types'
import { useDesignContext } from '@/composables/useDesignContext'
import { useToolbarAction } from '@/composables/useToolbarAction'

const {
  getLayoutToolbar,
  activeCanvasLayout,
  activeContextMenuId,
  contextMenuPosition,
  closeContextMenu,
} = useDesignContext()
const { handleLayoutToolbarAction } = useToolbarAction()

// 只要有菜单ID就显示
const isVisible = computed(() => !!activeContextMenuId.value)

const menuStyle = computed(() => ({
  left: `${contextMenuPosition.value.x}px`,
  top: `${contextMenuPosition.value.y}px`,
}))

const operateOptions = computed(() => getLayoutToolbar(activeCanvasLayout.value?.id as string))

// 处理操作
function handleAction(direction: Position) {
  handleLayoutToolbarAction(direction)
  closeContextMenu()
}
</script>

<style scoped lang="scss">
.layout-context-menu {
  position: fixed;
  z-index: 9999;
  min-width: 135px;
  background: #fff;
  border-radius: 6px;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  padding: 4px 0;

  .context-menu-group {
    &:not(:last-child) {
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 4px;
    }

    .context-menu-group-title {
      padding: 5px 12px 2px;
      font-size: 12px;
      color: var(--vdt-font-color-light);
      line-height: 20px;
    }
  }

  .context-menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    cursor: pointer;
    font-size: 12px;
    color: var(--vdt-font-color);
    transition: background 0.15s;

    &:hover {
      background: var(--vdt-primary-light);
    }
  }
}
</style>
