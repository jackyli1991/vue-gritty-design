<template>
  <div class="layout-attrs">
    {{ activeCanvasLayout }}
    <aForm v-if="activeCanvasLayout" layout="vertical">
      <aFormItem label="布局ID">
        <aInput :value="activeCanvasLayout?.id" readonly />
      </aFormItem>
      <aFormItem label="布局名称">
        <aInput :value="activeCanvasLayout?.name" readonly />
      </aFormItem>
      <aFormItem label="布局方向">
        <aRadioGroup v-model:value="activeCanvasLayout.direction" button-style="solid" disabled>
          <aRadioButton v-for="item in DirectionOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </aRadioButton>
        </aRadioGroup>
      </aFormItem>
      <aFormItem label="背景颜色">
        <ColorPicker v-model="activeCanvasLayout.props.backgroundColor" />
      </aFormItem>
      <aRow :gutter="4">
        <aCol :span="12">
          <aFormItem label="宽度">
            <aSelect
              v-model:value="activeCanvasLayout.props.widthType"
              disabled
              :options="widthTypeOptions"
            />
          </aFormItem>
        </aCol>
        <aCol :span="12">
          <aFormItem label=" ">
            <aInputNumber
              v-model:value="activeCanvasLayout.props.widthValue"
              disabled
              v-bind="{
                ...createInputNumberProps('widthType'),
              }"
            />
          </aFormItem>
        </aCol>
        <aCol :span="12">
          <aFormItem label="高度">
            <aSelect
              v-model:value="activeCanvasLayout.props.heightType"
              disabled
              :options="heightTypeOptions"
            />
          </aFormItem>
        </aCol>
        <aCol :span="12">
          <aFormItem label=" ">
            <aInputNumber
              v-model:value="activeCanvasLayout.props.heightValue"
              disabled
              v-bind="{
                ...createInputNumberProps('heightType'),
              }"
            />
          </aFormItem>
        </aCol>
      </aRow>
      <aFormItem label="内边距" tooltip="顺序: 上、右、下、左; 单位: px">
        <PaddingInput v-model="activeCanvasLayout.props.padding" disabled />
      </aFormItem>
    </aForm>
  </div>
</template>

<script setup lang="ts">
import { inject, toRef } from 'vue'
import {
  Form as aForm,
  FormItem as aFormItem,
  Input as aInput,
  RadioGroup as aRadioGroup,
  RadioButton as aRadioButton,
  Row as aRow,
  Col as aCol,
  Select as aSelect,
  InputNumber as aInputNumber,
} from 'ant-design-vue'
import ColorPicker from '@/components/ColorPicker.vue'
import PaddingInput from '@/components/PaddingInput.vue'
import type { CanvasContext, CanvasLayout } from '@/types'
import { DirectionOptions, widthTypeOptions, heightTypeOptions } from '@/datas'

type propType = keyof CanvasLayout['props']

defineOptions({
  name: 'LayoutAttrs',
})

// 从父组件注入配置数据
const canvasContext = inject<CanvasContext>('canvasContext')
const activeCanvasLayout = toRef(canvasContext?.activeCanvasLayout)

// 动态生成数字组件的props
function createInputNumberProps(field: propType) {
  const layoutProps = activeCanvasLayout.value?.props
  const isFlex = layoutProps?.[field] === 'flex'
  return {
    addonAfter: isFlex ? '' : layoutProps?.[field],
    addonBefore: isFlex ? 'flex=' : '',
    min: 0,
    max: isFlex ? 1 : 9999,
  }
}
</script>
