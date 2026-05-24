<template>
  <aForm
    v-if="formData"
    ref="aFormRef"
    :model="formData"
    :hideRequiredMark="hideRequiredMark"
    layout="vertical"
    :disabled="disabled"
  >
    <aRow :gutter="12">
      <aCol :span="colSpan">
        <aFormItem label="按钮间距" name="btnGap" :rules="rules.btnGap">
          <aInputNumber
            v-model:value="formData.btnGap"
            style="width: 100%"
            :min="0"
            :max="20"
            :step="1"
            placeholder="单位:px"
          />
        </aFormItem>
      </aCol>
    </aRow>
  </aForm>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import type { ColumnProps } from '@/types'
import type { RuleObject } from 'ant-design-vue/es/form'
import { Form as aForm, FormItem as aFormItem, Row as aRow, Col as aCol, InputNumber as aInputNumber } from 'ant-design-vue'

defineOptions({
  name: 'ActionBtnGroupForm',
})

interface Props {
  formData?: ColumnProps // 表单数据
  disabled?: boolean // 是否禁用
  disabledFields?: ColumnProps[] // 禁用的字段列表
  hideRequiredMark?: boolean // 是否隐藏必填项提示
  cols?: number // 布局列数
}

const aFormRef = useTemplateRef<typeof aForm>('aFormRef')

const props = withDefaults(defineProps<Props>(), {
  cols: 2,
  disabledFields: () => [],
})

const formData = computed(() => props.formData)
const colSpan = computed(() => Math.floor(24 / props.cols))
const rules = computed<Record<string, RuleObject[]>>(() => ({
  // title: [{ required: true, message: '请输入名称' }],
  // dataIndex: [{ required: true, message: '请输入字段' }],
}))

// 校验表单
function validate() {
  return aFormRef.value
    ?.validate()
    .then(() => formData.value)
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
