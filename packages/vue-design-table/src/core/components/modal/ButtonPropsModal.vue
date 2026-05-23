<template>
  <aModal
    title="按钮属性"
    :open="visible"
    width="50vw"
    okText="确定"
    cancelText="取消"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <ButtonForm ref="formRef" :formData="_formData" :cols="2"></ButtonForm>
  </aModal>
</template>

<script setup lang="ts">
import { ref, watch, useTemplateRef } from 'vue'
import { Modal as aModal } from 'ant-design-vue'
import type { ButtonProps } from '@/types'
import ButtonForm from '../form/ButtonForm.vue'

defineOptions({
  name: 'ButtonPropsModal',
})

interface ButtonPropsModalProps {
  visible: boolean
  formData?: ButtonProps
}

const _formData = ref<ButtonProps>()
const formRef = useTemplateRef<typeof ButtonForm>('formRef')
const props = defineProps<ButtonPropsModalProps>()

const emit = defineEmits(['confirm', 'update:visible'])

async function handleOk() {
  const validRes = await formRef.value?.validate()
  if (!validRes) {
    return
  }
  emit('confirm', validRes)
  handleCancel()
}

function handleCancel() {
  emit('update:visible', false)
}

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      // 解耦 formData，避免直接修改 props.formData
      _formData.value = { ...(props.formData || ({} as ButtonProps)) }
    }
  },
)
</script>
