<template>
  <aForm
    ref="aFormRef"
    :model="formData"
    :hideRequiredMark="hideRequiredMark"
    layout="vertical"
    :disabled="disabled"
  >
    <aRow :gutter="12">
      <aCol :span="colSpan">
        <aFormItem label="布局ID" name="id" :rules="rules.id" :tooltip="'不能和已有布局ID重复'">
          <aInput v-model:value="formData.id" :disabled="props.disabledFields.includes('id')" />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="布局名称" name="name" :rules="rules.name">
          <aInput v-model:value="formData.name" :disabled="props.disabledFields.includes('name')" />
        </aFormItem>
      </aCol>
      <!-- <aCol :span="colSpan">
        <aFormItem label="布局方向" name="direction">
          <aRadioGroup v-model:value="formData.direction" button-style="solid">
            <aRadioButton v-for="item in directionOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </aRadioButton>
          </aRadioGroup>
        </aFormItem>
      </aCol> -->
      <aCol :span="colSpan">
        <aRow :gutter="4">
          <aCol :span="12">
            <aFormItem label="宽度" :name="['props', 'widthType']">
              <aSelect v-model:value="formData.props.widthType" :options="widthTypeOptions as DefaultOptionType[]"  />
            </aFormItem>
          </aCol>
          <aCol :span="12">
            <aFormItem label=" " :name="['props', 'widthValue']" :rules="rules.widthValue">
              <aInputNumber
                v-model:value="formData.props.widthValue"
                v-bind="{
                  ...createInputNumberProps('widthType'),
                }"
              />
            </aFormItem>
          </aCol>
        </aRow>
      </aCol>
      <aCol :span="colSpan">
        <aRow :gutter="4">
          <aCol :span="12">
            <aFormItem label="高度" :name="['props', 'heightType']">
              <aSelect v-model:value="formData.props.heightType" :options="heightTypeOptions as DefaultOptionType[]" />
            </aFormItem>
          </aCol>
          <aCol :span="12">
            <aFormItem label=" " :name="['props', 'heightValue']" :rules="rules.heightValue">
              <aInputNumber
                v-model:value="formData.props.heightValue"
                v-bind="{
                  ...createInputNumberProps('heightType'),
                }"
              />
            </aFormItem>
          </aCol>
        </aRow>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="内边距" tooltip="顺序: 上、右、下、左; 单位: px">
          <PaddingInput
            v-model="formData.props.padding"
            :name="['props', 'padding']"
            :disabled="disabled"
          />
        </aFormItem>
      </aCol>
      <aCol :span="colSpan">
        <aFormItem label="背景颜色">
          <ColorPicker
            v-model="formData.props.backgroundColor"
            :name="['props', 'backgroundColor']"
            :disabled="disabled"
          />
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
  // RadioGroup as aRadioGroup,
  // RadioButton as aRadioButton,
  Row as aRow,
  Col as aCol,
  Select as aSelect,
  InputNumber as aInputNumber,
} from 'ant-design-vue'
import type { RuleObject } from 'ant-design-vue/es/form'
import type { DefaultOptionType } from 'ant-design-vue/es/select'
import type { CanvasLayout } from '@/types'
import ColorPicker from '@/components/ColorPicker.vue'
import PaddingInput from '@/components/PaddingInput.vue'
import { useDesignContext } from '@/composables/useDesignContext'
import { widthTypeOptions, heightTypeOptions } from '@/datas' // directionOptions

type propType = keyof CanvasLayout['props']
type CanvasLayoutFields = keyof CanvasLayout

interface Props {
  formData: CanvasLayout // 表单数据
  disabled?: boolean // 是否禁用
  disabledFields?: CanvasLayoutFields[] // 禁用的字段列表
  hideRequiredMark?: boolean // 是否隐藏必填项提示
  cols?: number // 布局列数
}

defineOptions({
  name: 'LayoutForm',
})

const { layoutIds } = useDesignContext()
const aFormRef = useTemplateRef<typeof aForm>('aFormRef')
const props = withDefaults(defineProps<Props>(), {
  cols: 2,
  disabledFields: () => [],
})

const rules = computed<Record<string, RuleObject[]>>(() => ({
  id: [
    { required: true, message: '请输入布局ID' },
    { validator:
      (rule, value) => {
        if (layoutIds.value.includes(value)) {
          return Promise.reject('布局ID已存在')
        } else {
          return Promise.resolve()
        }
      }
    },
  ],
  name: [{ required: true, message: '请输入布局名称' }],
  widthValue: [{ required: true, message: '请输入宽度值', type: 'number', min: 0 }],
  heightValue: [{ required: true, message: '请输入高度值', type: 'number', min: 0 }],
}))

const formData = computed(() => props.formData)
const colSpan = computed(() => Math.floor(24 / props.cols))

// 动态生成数字组件的props
function createInputNumberProps(field: propType) {
  const layoutProps = props.formData?.props
  const isFlex = layoutProps?.[field] === 'flex'
  return {
    addonAfter: isFlex ? '' : layoutProps?.[field],
    addonBefore: isFlex ? 'flex=' : '',
    min: 0,
    max: isFlex ? 1 : 9999,
  }
}

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
