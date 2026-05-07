<template>
  <aModal
    title="创建布局"
    :open="visible"
    :width="'50vw'"
    cancelText="取消"
    okText="确定"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <LayoutForm ref="layoutFormRef" :formData="formData" />
  </aModal>
</template>

<script setup lang="ts">
import type { CanvasLayout } from '@/types'
import { ref, useTemplateRef } from 'vue'
import { Modal as aModal } from 'ant-design-vue'
import LayoutForm from '../form/LayoutForm.vue'
import { createLayout } from '../designer'

defineOptions({
  name: 'CreateLayout',
})

const emit = defineEmits(['confirm'])
const visible = ref(false)
const formData = ref<CanvasLayout>({} as CanvasLayout)
const layoutFormRef = useTemplateRef<typeof LayoutForm>('layoutFormRef')

/**
 * 打开创建布局弹窗
 * @param parentId 父布局ID
 */
function open(parentId: string) {
  formData.value = createLayout('', parentId, {
    name: '新布局',
  })
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
  emit('confirm', formData.value)
  visible.value = false
}

/**
 * 处理取消按钮点击事件
 */
function handleCancel() {
  layoutFormRef.value?.clearValidate()
  visible.value = false
}

defineExpose({
  open,
})
</script>
