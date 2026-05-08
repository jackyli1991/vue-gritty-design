<template>
  <Transition name="toolbar-fade">
    <div v-if="visible" class="layout-hover-toolbar">
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
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { excludeOption } from '@/utils'
import { Position } from '@/types'

import IconifyIcon from '@/components/IconifyIcon.vue'
import { LayoutOperateOptions } from '@/datas/directory'
import { Tooltip as aTooltip } from 'ant-design-vue'

const props = defineProps<{
  visible: boolean
  canDelete: boolean
}>()

const emit = defineEmits<{
  action: [direction: Position]
}>()

const operateOptions = computed(() => {
  if (props.canDelete) {
    return LayoutOperateOptions
  }
  return excludeOption(LayoutOperateOptions, 'delete') // 排除删除选项
})

// 处理操作
function handleAction(direction: Position) {
  emit('action', direction)
}
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
