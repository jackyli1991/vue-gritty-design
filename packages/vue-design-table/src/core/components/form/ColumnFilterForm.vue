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
        <aFormItem label="启用筛选" name="filterable">
          <aSwitch v-model:checked="formData.filterable" />
        </aFormItem>
      </aCol>
      <template v-if="formData.filterable">
        <aCol :span="colSpan">
          <aFormItem label="可多选" name="filterMultiple" :rules="rules.filterMultiple">
            <aSwitch v-model:checked="formData.filterMultiple" />
          </aFormItem>
        </aCol>
        <aCol :span="colSpan">
          <aFormItem label="筛选模式" name="filterMode" :rules="rules.filterMode">
            <aRadioGroup v-model:value="formData.filterMode" button-style="solid">
              <aRadioButton
                v-for="(item, index) in filterModeOptions"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </aRadioButton>
            </aRadioGroup>
          </aFormItem>
        </aCol>
        <aCol :span="colSpan">
          <aFormItem label="筛选选项来源" name="filtersSource" :rules="rules.filtersSource">
            <aRadioGroup v-model:value="formData.filtersSource" button-style="solid">
              <aRadioButton
                v-for="(item, index) in filtersSourceOptions"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </aRadioButton>
            </aRadioGroup>
          </aFormItem>
        </aCol>
        <aCol :span="colSpan">
          <aFormItem label="筛选图标" name="filterIcon" :rules="rules.filterIcon">
            <aInput v-model:value="formData.filterIcon" placeholder="iconfity图标名称">
              <template #suffix>
                <IconifyIcon :icon="formData.filterIcon" />
              </template>
            </aInput>
          </aFormItem>
        </aCol>
      </template>
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
import IconifyIcon from '@/components/IconifyIcon.vue'
import { filterModeOptions, filtersSourceOptions } from '@/datas'

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
