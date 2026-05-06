<template>
  <Transition name="toolbar-fade">
    <div v-if="visible" class="layout-hover-toolbar">
      <div
        v-for="item in LayoutOperateOptions"
        :key="item.value"
        class="toolbar-item"
        @click.stop="handleAdd(item.value)"
      >
        <aTooltip :title="item.label" placement="top">
          <IconifyIcon :icon="item.icon" :size="20" :danger="item.danger" />
        </aTooltip>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import IconifyIcon from '@/components/IconifyIcon.vue'
import { LayoutOperateOptions } from '@/datas/directory'
import { Tooltip as aTooltip } from 'ant-design-vue'

defineProps<{
  visible: boolean
  canDelete: boolean
}>()

const emit = defineEmits<{
  add: [direction: string]
  delete: []
}>()

function handleAdd(direction: string) {
  emit('add', direction)
}

// function handleDelete() {
//   emit('delete')
// }
</script>

<style scoped lang="scss">
.layout-hover-toolbar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  z-index: 10;
  white-space: nowrap;

  .toolbar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.15s;
  }
}

.toolbar-fade-enter-active,
.toolbar-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.toolbar-fade-enter-from,
.toolbar-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px);
}
</style>
