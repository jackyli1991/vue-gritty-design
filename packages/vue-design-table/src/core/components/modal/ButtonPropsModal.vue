<template>
  <aModal
    title="按钮属性"
    :visible="visible"
    width="50vw"
    :footer="null"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <ButtonForm :formData="formData" :cols="1"></ButtonForm>
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

defineProps<ButtonPropsModalProps>()

const emit = defineEmits(['ok', 'cancel'])

function handleOk() {
  // emit('ok', formData.value)
}

function handleCancel() {
  emit('cancel')
}
</script>
