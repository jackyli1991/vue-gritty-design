<template>
  <aForm ref="aFormRef" :model="formData" :rules="formRules" layout="vertical" :disabled="disabled">
    <slot></slot>
  </aForm>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import type { RuleObject } from 'ant-design-vue/es/form'
import { Form as aForm } from 'ant-design-vue'

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any
  formRules: Record<string, RuleObject[]>
  disabled: boolean
}

defineProps<FormProps>()

const aFormRef = useTemplateRef<typeof aForm>('aFormRef')

// 校验表单
function validate() {
  return aFormRef.value
    ?.validate()
    .then(() => true)
    .catch(() => false)
}

// 清除表单校验
function clearValidate() {
  aFormRef.value?.clearValidate()
}

defineExpose({
  validate,
  clearValidate,
})
</script>
