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
import { ref, useTemplateRef } from 'vue'
import { Modal as aModal } from 'ant-design-vue'
import LayoutForm from '../form/LayoutForm.vue'
import { createLayout } from '../designer'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'CreateLayout',
})

const { addLayout } = useDesignContext()

const visible = ref(false)
const layoutDirection = ref<Position>(Position.Top)
const formData = ref<CanvasLayout>({} as CanvasLayout)
const layoutFormRef = useTemplateRef<typeof LayoutForm>('layoutFormRef')

function open(parentId: string, clickDirection: Position) {
  const layOutProps = {
    name: '新布局',
  }
  if (clickDirection === Position.Top || clickDirection === Position.Bottom) {
    Object.assign(layOutProps, {
      widthType: '%',
      widthValue: 100,
      heightType: 'px',
      heightValue: 60,
    })
  } else {
    Object.assign(layOutProps, {
      widthType: 'px',
      widthValue: 60,
      heightType: '%',
      heightValue: 100,
    })
  }
  layoutDirection.value = clickDirection
  formData.value = createLayout('', parentId, layOutProps)
  visible.value = true
}

async function handleOk() {
  const valid = await layoutFormRef.value?.validate()
  if (!valid) {
    return
  }
  // addLayout(formData.value, layoutDirection.value)
  addLayout()
  visible.value = false
}

function handleCancel() {
  layoutFormRef.value?.clearValidate()
  visible.value = false
}

defineExpose({ open })
</script>
