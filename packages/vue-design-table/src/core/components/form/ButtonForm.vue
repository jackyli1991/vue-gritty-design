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
      <!-- <aCol :span="24">
          <aFormItem label="ID" name="id" :rules="rules.id">
            <aInput :value="formData.id" readonly />
          </aFormItem>
        </aCol> -->
      <aCol :span="colSpan">
        <aFormItem label="文本" name="content" :rules="rules.content">
          <aInput v-model:value="formData.content" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="类型" name="type" :rules="rules.type">
          <aSelect v-model:value="formData.type" :options="buttonTypeOptions" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="尺寸" name="size" :rules="rules.size">
          <aSelect v-model:value="formData.size" :options="buttonSizeOptions" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aRow :gutter="12">
          <aCol :span="20">
            <aFormItem label="图标" name="icon">
              <aInput v-model:value="formData.icon" placeholder="iconfity图标名称"></aInput>
            </aFormItem>
          </aCol>
          <aCol :span="4">
            <aFormItem label=" ">
              <IconifyIcon :icon="formData.icon" />
            </aFormItem>
          </aCol>
        </aRow>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="危险按钮" name="danger" :rules="rules.danger">
          <aSwitch v-model:checked="formData.danger" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="幽灵按钮" name="ghost" :rules="rules.ghost">
          <aSwitch v-model:checked="formData.ghost" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="背景色" name="backgroundColor" :rules="rules.backgroundColor">
          {{ formData.backgroundColor }}
          <ColorPicker v-model="formData.backgroundColor" />
        </aFormItem>
      </aCol>
    </aRow>
  </aForm>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import type { ButtonProps } from '@/types'
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
import IconifyIcon from '@/components/IconifyIcon.vue'
import ColorPicker from '@/components/ColorPicker.vue'
import { buttonTypeOptions, buttonSizeOptions } from '@/datas'

defineOptions({
  name: 'ButtonForm',
})

interface Props {
  formData?: ButtonProps // 表单数据
  disabled?: boolean // 是否禁用
  disabledFields?: ButtonProps[] // 禁用的字段列表
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
