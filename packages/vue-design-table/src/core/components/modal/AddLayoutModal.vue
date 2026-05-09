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
  parentId: string // 父级布局的ID
}>()

const { visible, closeModal, onConfirm } = useAddLayoutModal()

const formData = ref<CanvasLayout>({
  props: {},
} as CanvasLayout)
const layoutFormRef = useTemplateRef<typeof LayoutForm>('layoutFormRef')

function init() {
  const layoutProps = {
    name: '新布局',
  }
  const { direction, parentId } = props
  console.log('弹窗初始化', direction, parentId)
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
  formData.value = createLayout('', parentId, layoutProps)
}

async function handleOk() {
  const valid = await layoutFormRef.value?.validate()
  if (!valid) {
    return
  }
  const direction = props.direction
  onConfirm(formData.value, direction)
  handleCancel()
}

function handleCancel() {
  layoutFormRef.value?.clearValidate()
  closeModal()
}

watch(() => visible, init, {
  deep: true,
  immediate: true,
})
</script>
