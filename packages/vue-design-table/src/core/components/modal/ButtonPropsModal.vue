<template>
  <aModal
    title="按钮属性"
    :visible="visible"
    width="50vw"
    okText="确定"
    cancelText="取消"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    {{ formData }}
    <ButtonForm :formData="formData" :cols="2"></ButtonForm>
  </aModal>
</template>

<script setup lang="ts">
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

const props = defineProps<ButtonPropsModalProps>()

const emit = defineEmits(['confirm', 'update:visible'])

function handleOk() {
  emit('confirm', props.formData)
  handleCancel()
}

function handleCancel() {
  emit('update:visible', false)
}
</script>
