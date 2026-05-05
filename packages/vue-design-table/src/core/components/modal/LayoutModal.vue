<template>
  <aModal
    title="创建布局"
    :open="visible"
    :width="'50vw'"
    cancelText="取消"
    okText="确定"
    @ok="handleOk"
    @cancel="visible = false"
  >
    <LayoutForm ref="layoutFormRef" :formData="formData" />
  </aModal>
</template>

<script setup lang="ts">
import type { CanvasLayout } from '@/types'
import { ref, useTemplateRef } from 'vue'
import { Modal as aModal } from 'ant-design-vue'
import LayoutForm from '../form/LayoutForm.vue'
import { createLayout } from '@/core/design'

defineOptions({
  name: 'CreateLayout',
})

const emit = defineEmits(['confirm'])
const visible = ref(false)
const direction = ref('')
const formData = ref<CanvasLayout>({} as CanvasLayout)
const layoutFormRef = useTemplateRef<typeof LayoutForm>('layoutFormRef')

/**
 * 打开创建布局弹窗
 * @param layoutId 父布局ID
 * @param clickDirection 点击方向
 */
function open(layoutId: string, clickDirection: string) {
  formData.value = createLayout(layoutId)
  direction.value = clickDirection
  visible.value = true
}

/**
 * 处理确定按钮点击事件
 */
async function handleOk() {
  const valid = await layoutFormRef.value?.validate()
  if (!valid) {
    return
  }
  emit('confirm', formData.value, direction.value)
  visible.value = false
}


defineExpose({
  open,
})
</script>
