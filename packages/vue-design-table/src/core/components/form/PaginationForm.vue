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
      <aCol :span="24">
        <aFormItem label="启用" name="enabled" :rules="rules.enabled">
          <aSwitch v-model:checked="formData.enabled" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="简洁模式" name="simple">
          <aSwitch v-model:checked="formData.simple" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="尺寸" name="size">
          <aSwitch
            v-model:checked="formData.size"
            :checkedValue="'small'"
            :checkedChildren="'小'"
            :unCheckedValue="''"
            :unCheckedChildren="'大'"
          />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="单页时隐藏" name="hideOnSinglePage">
          <aSwitch v-model:checked="formData.hideOnSinglePage" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="快速跳转" name="showQuickJumper">
          <aSwitch v-model:checked="formData.showQuickJumper" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="pageSize选择器" name="showSizeChanger">
          <aSwitch v-model:checked="formData.showSizeChanger" />
        </aFormItem>
      </aCol>
      <template v-if="formData.showSizeChanger">
        <aCol :span="colSpan">
          <aFormItem label="默认数量" name="defaultPageSize">
            <aSelect v-model:value="formData.defaultPageSize" :options="pageSizeOptionsSelected" />
          </aFormItem>
        </aCol>
        <aCol :span="24">
          <aFormItem label="pageSize选项" name="pageSizeOptions">
            <aSelect
              v-model:value="formData.pageSizeOptions"
              mode="multiple"
              :maxTagCount="4"
              :options="pageSizeOptions"
            />
          </aFormItem>
        </aCol>
      </template>
      <aCol :span="24">
        <aRow :gutter="12">
          <aCol :span="colSpan">
            <aFormItem label="上一页文本" name="prePageText">
              <aInput v-model:value="formData.prePageText" placeholder="上一页" />
            </aFormItem>
          </aCol>
          <aCol :span="colSpan">
            <aFormItem label="下一页文本" name="nextPageText">
              <aInput v-model:value="formData.nextPageText" placeholder="下一页" />
            </aFormItem>
          </aCol>
        </aRow>
      </aCol>
      <aCol :span="24">
        <aFormItem label="总数文本" name="totalText" help="使用${total}作为总数占位符">
          <aInput v-model:value="formData.totalText" placeholder="总数文本" />
        </aFormItem>
      </aCol>
    </aRow>
  </aForm>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import type { PaginationProps } from '@/types'
import type { RuleObject } from 'ant-design-vue/es/form'
import {
  Form as aForm,
  FormItem as aFormItem,
  Input as aInput,
  Row as aRow,
  Col as aCol,
  Select as aSelect,
  Switch as aSwitch,
} from 'ant-design-vue'
import { pageSizeOptions } from '@/datas'

defineOptions({
  name: 'PaginationForm',
})

interface Props {
  formData?: PaginationProps // 表单数据
  disabled?: boolean // 是否禁用
  disabledFields?: PaginationProps[] // 禁用的字段列表
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
  content: [{ required: true, message: '请输入文本' }],
  // widthValue: [{ required: true, message: '请输入宽度值', type: 'number', min: 0 }],
  // heightValue: [{ required: true, message: '请输入高度值', type: 'number', min: 0 }],
}))

const pageSizeOptionsSelected = computed(() => {
  return formData.value?.pageSizeOptions?.map((item) => ({
    label: `${item}条/页`,
    value: item,
  })).sort((a, b) => Number(a.value) - Number(b.value))
})

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
