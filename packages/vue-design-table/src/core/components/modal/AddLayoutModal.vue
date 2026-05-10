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
import { Position } from '@/types'
import { ref, useTemplateRef, watch } from 'vue'
import { Modal as aModal } from 'ant-design-vue'
import LayoutForm from '../form/LayoutForm.vue'
import { createLayout } from '../designer'
import { useAddLayoutModal } from '@/composables/useAddLayoutModal'

defineOptions({
  name: 'AddLayoutModal',
})

const props = defineProps<{
  direction: Position // 添加布局的方向
}>()

const { visible, closeModal, onConfirm, onCancel } = useAddLayoutModal()

const formData = ref<CanvasLayout>({
  props: {},
} as CanvasLayout)
const layoutFormRef = useTemplateRef<typeof LayoutForm>('layoutFormRef')

// 初始化弹窗数据
function init() {
  const layoutProps = {
    name: '新布局',
  }
  const { direction } = props
  console.log('弹窗初始化', direction)
  if (direction === Position.Top || direction === Position.Bottom) {
    Object.assign(layoutProps, {
      widthType: '%',
      widthValue: 100,
      heightType: 'px',
      heightValue: 60,
    })
  } else {
    Object.assign(layoutProps, {
      widthType: 'px',
      widthValue: 60,
      heightType: '%',
      heightValue: 100,
    })
  }
  formData.value = createLayout('', '', layoutProps)
}

// 清除表单验证状态
function clearValidate() {
  layoutFormRef.value?.clearValidate()
}

// 确认添加布局
async function handleOk() {
  const valid = await layoutFormRef.value?.validate()
  if (!valid) {
    return
  }
  onConfirm(formData.value)
  clearValidate()
  closeModal()
}

// 取消添加布局
function handleCancel() {
  clearValidate()
  closeModal()
  onCancel()
}

watch(() => visible, init, {
  deep: true,
  immediate: true,
})
</script>
