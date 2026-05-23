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
        <aFormItem label="名称" name="title" :rules="rules.title">
          <aInput v-model:value="formData.title" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem
          label="字段"
          name="dataIndex"
          :rules="rules.dataIndex"
          :tooltip="'支持嵌套路径，例如: a.b.c'"
        >
          <aInput v-model:value="formData.dataIndex" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aRow :gutter="12">
          <aCol :span="12">
            <aFormItem label="宽度" name="width" :rules="rules.width" :tooltip="'列宽度, 单位:px'">
              <aInputNumber
                v-model:value="formData.width"
                style="width: 100%"
                :min="formData.minWidth"
                :max="formData.maxWidth"
                :step="1"
                placeholder="列宽度, 单位:px"
              />
            </aFormItem>
          </aCol>
          <aCol :span="12">
            <aFormItem label="允许调整宽度" name="resizable">
              <aSwitch v-model:checked="formData.resizable" />
            </aFormItem>
          </aCol>
        </aRow>
      </aCol>
      <aCol :span="colSpan">
        <aRow :gutter="2">
          <aCol :span="11">
            <aFormItem label="宽度范围" name="minWidth" :rules="rules.minWidth">
              <aInputNumber
                v-model:value="formData.minWidth"
                style="width: 100%"
                :min="0"
                :max="formData.maxWidth"
                :step="1"
                placeholder="最小宽度(px)"
              />
            </aFormItem>
          </aCol>
          <aCol :span="2">
            <aFormItem label=" ">
              <div style="text-align: center">-</div>
            </aFormItem>
          </aCol>
          <aCol :span="11">
            <aFormItem label=" " name="maxWidth" :rules="rules.maxWidth">
              <aInputNumber
                v-model:value="formData.maxWidth"
                style="width: 100%"
                :min="formData.minWidth"
                :max="500"
                :step="1"
                placeholder="最大宽度(px)"
              />
            </aFormItem>
          </aCol>
        </aRow>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="对齐方式" name="align">
          <aRadioGroup v-model:value="formData.align" button-style="solid">
            <aRadioButton v-for="(item, index) in alignOptions" :key="index" :value="item.value">
              {{ item.label }}
            </aRadioButton>
          </aRadioGroup>
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="固定位置" name="fixed">
          <aRadioGroup v-model:value="formData.fixed" button-style="solid">
            <aRadioButton v-for="(item, index) in fixedOptions" :key="index" :value="item.value">
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
import type { ColumnProps } from '@/types'
import type { RuleObject } from 'ant-design-vue/es/form'
import {
  Form as aForm,
  FormItem as aFormItem,
  Input as aInput,
  Row as aRow,
  Col as aCol,
  // Select as aSelect,
  Switch as aSwitch,
} from 'ant-design-vue'
import { alignOptions, fixedOptions } from '@/datas'

defineOptions({
  name: 'ColumnForm',
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
  title: [{ required: true, message: '请输入名称' }],
  dataIndex: [{ required: true, message: '请输入字段' }],
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
