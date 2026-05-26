<template>
  <div class="btn-row">
    <span class="tools">
      <aCheckbox v-if="showCheckBox" :checked="checked" @click="handleCheck"></aCheckbox>
      <ActionButton v-bind="btn.props" @click="handleClick">{{ btn.props.content }}</ActionButton>
    </span>
    <span class="tools">
      <IconifyIcon icon="material-symbols:delete" @click="handleDelete"></IconifyIcon>
      <IconifyIcon
        class="draggable-handle cursor-move"
        icon="material-symbols:drag-indicator"
      ></IconifyIcon>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { CanvasElement } from '@/types'
import { Checkbox as aCheckbox } from 'ant-design-vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import ActionButton from '@/components/Button.vue'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'ActionBtn',
})

const { getElement } = useDesignContext()

interface Props {
  showCheckBox?: boolean
  checked?: boolean
  btnId: string
}
const props = withDefaults(defineProps<Props>(), {
  showCheckBox: true,
})
const emit = defineEmits(['check', 'delete', 'click'])

// 当前按钮元素
const btn = computed<CanvasElement>(
  (): CanvasElement => getElement(props.btnId) || ({} as CanvasElement),
)

// 选中/取消选中
function handleCheck() {
  emit('check', props.btnId)
}

// 删除
function handleDelete() {
  emit('delete', props.btnId)
}

// 点击按钮
function handleClick() {
  emit('click')
}
</script>

<style lang="scss" scoped>
.btn-row {
  padding: 4px 0;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tools {
    gap: 6px;
    display: flex;
    align-items: center;
  }
}
</style>
