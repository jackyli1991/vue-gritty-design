<template>
  <aModal
    title="创建布局"
    :open="addLayoutModalVisible"
    width="45vw"
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
import { Position, BaseLayouts } from '@/types'
import { ref, useTemplateRef, watch } from 'vue'
import { Modal as aModal } from 'ant-design-vue'
import LayoutForm from '../form/LayoutForm.vue'
import { createLayout, CreateLayoutConfig } from '../designer'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'AddLayoutModal',
})

const { addLayoutModalVisible, addLayoutModalData, confirmAddLayout, closeAddLayoutModal } =
  useDesignContext()

const formData = ref<CanvasLayout>({
  props: {},
} as CanvasLayout)
const layoutFormRef = useTemplateRef<typeof LayoutForm>('layoutFormRef')

function init() {
  if (!addLayoutModalData.value) return
  const { direction } = addLayoutModalData.value
  const layoutProps: CreateLayoutConfig = {
    name: '新布局',
    type: BaseLayouts.Common,
  }
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

function clearValidate() {
  layoutFormRef.value?.clearValidate()
}

async function handleOk() {
  const valid = await layoutFormRef.value?.validate()
  if (!valid || !addLayoutModalData.value) {
    return
  }
  const { parentId, direction } = addLayoutModalData.value
  confirmAddLayout(formData.value, parentId, direction)
  clearValidate()
  closeAddLayoutModal()
}

function handleCancel() {
  clearValidate()
  closeAddLayoutModal()
}

watch(addLayoutModalVisible, (visible) => {
  if (visible) {
    init()
  }
})
</script>
