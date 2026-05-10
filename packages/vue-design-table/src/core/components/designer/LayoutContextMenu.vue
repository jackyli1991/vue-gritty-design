<template>
  <Teleport to="body">
    <div v-if="visible" class="layout-context-menu" :style="menuStyle" @click.stop>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import { Position } from '@/types'
import { useDesignContext } from '@/composables/useDesignContext'

const { getLayoutToolbar, hoveredLayoutId } = useDesignContext()

const visible = ref(false)
const position = ref({ x: 0, y: 0 })

const emit = defineEmits<{
  action: [direction: Position]
}>()

const menuStyle = computed(() => ({
  left: `${position.value.x}px`,
  top: `${position.value.y}px`,
}))

const operateOptions = computed(() => getLayoutToolbar(hoveredLayoutId.value))

function open(x: number, y: number) {
  position.value = { x, y }
  visible.value = true
}

function close() {
  visible.value = false
}

// 处理操作
function handleAction(direction: Position) {
  emit('action', direction)
  close()
}

function handleClickOutside() {
  if (visible.value) close()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('contextmenu', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('contextmenu', handleClickOutside)
})

defineExpose({ open, close })
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
      color: #999;
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
    color: #333;
    transition: background 0.15s;

    &:hover {
      background: var(--vdt-primary-light);
    }
  }
}
</style>
