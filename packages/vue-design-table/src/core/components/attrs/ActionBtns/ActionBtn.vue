<template>
  <div class="btn-row">
    <span class="tools">
      <aCheckbox v-if="showCheckBox" :checked="checked" @click="handleCheck"></aCheckbox>
      <aButton v-bind="btn.props">{{ btn.props.content }}</aButton>
    </span>
    <span class="tools">
      <IconifyIcon></IconifyIcon>
      <IconifyIcon icon="material-symbols:delete" @click="handleDelete"></IconifyIcon>
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { CanvasElement } from '@/types'
import { Button as aButton, Checkbox as aCheckbox } from 'ant-design-vue'
import IconifyIcon from '@/components/IconifyIcon.vue'

defineOptions({
  name: 'ActionBtn',
})

interface Props {
  showCheckBox: boolean
  checked: boolean
  btn: CanvasElement
}
const props = withDefaults(defineProps<Props>(), {
  showCheckBox: true,
})
const emit = defineEmits(['check', 'delete'])

// 选中/取消选中
function handleCheck() {
  emit('check', props.btn.id)
}

// 删除
function handleDelete() {
  emit('delete', props.btn.id)
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
