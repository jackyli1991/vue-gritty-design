<template>
  <aForm v-if="formData" ref="aFormRef" :model="formData" layout="vertical" :disabled="disabled">
    <aRow :gutter="12">
      <aCol :span="colSpan">
        <aFormItem label="ID" name="id" :rules="rules.id">
          <aInput :value="formData.id" readonly />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="列名称" name="['props', 'title']" :rules="rules.title">
          <aInput v-model:value="formData.props.title" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem
          label="列字段"
          name="['props', 'dataIndex']"
          :rules="rules.dataIndex"
          :tooltip="'列数据索引名，支持嵌套路径，例如: a.b.c'"
        >
          <aInput v-model:value="formData.props.dataIndex" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="对齐方式" name="['props', 'align']">
          <aRadioGroup v-model:value="formData.props.align" button-style="solid">
            <aRadioButton v-for="(item, index) in alignOptions" :key="index" :value="item.value">
              {{ item.label }}
            </aRadioButton>
          </aRadioGroup>
        </aFormItem>
      </aCol>
    </aRow>
  </aForm>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import {
  Form as aForm,
  FormItem as aFormItem,
  Input as aInput,
  RadioGroup as aRadioGroup,
  RadioButton as aRadioButton,
  Row as aRow,
  Col as aCol,
  // Select as aSelect,
  // InputNumber as aInputNumber,
} from 'ant-design-vue'
import type { RuleObject } from 'ant-design-vue/es/form'
// import type { DefaultOptionType } from 'ant-design-vue/es/select'
import { alignOptions } from '@/datas'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'ColumnAttrs',
})

interface Props {
  disabled?: boolean // 是否禁用
}

const { activeCanvasElement: formData } = useDesignContext()
const aFormRef = useTemplateRef<typeof aForm>('aFormRef')
defineProps<Props>()

const rules = computed<Record<string, RuleObject[]>>(() => ({
  // name: [{ required: true, message: '请输入布局名称' }],
  // widthValue: [{ required: true, message: '请输入宽度值', type: 'number', min: 0 }],
  // heightValue: [{ required: true, message: '请输入高度值', type: 'number', min: 0 }],
}))

const colSpan = computed(() => 24)

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
