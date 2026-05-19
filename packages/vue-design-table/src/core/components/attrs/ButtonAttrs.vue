<template>
  <FormWrapper v-if="attrs" :form-data="attrs" :form-rules="rules" :disabled="disabled">
    <AttrWrapper title="基础" :componentName="activeCanvasElement?.name">
      <aRow :gutter="12">
        <!-- <aCol :span="24">
          <aFormItem label="ID" name="id" :rules="rules.id">
            <aInput :value="formData.id" readonly />
          </aFormItem>
        </aCol> -->
        <aCol :span="24">
          <aFormItem label="文本" name="['props', 'content']" :rules="rules.content">
            <aInput v-model:value="attrs.content" />
          </aFormItem>
        </aCol>
        <aCol :span="12">
          <aFormItem label="类型" name="['props', 'type']" :rules="rules.type">
            <aSelect v-model:value="attrs.type" :options="buttonTypeOptions" />
          </aFormItem>
        </aCol>
        <aCol :span="12">
          <aFormItem label="尺寸" name="['props', 'size']" :rules="rules.size">
            <aSelect v-model:value="attrs.size" :options="buttonSizeOptions" />
          </aFormItem>
        </aCol>
        <aCol :span="24">
          <aRow :gutter="12">
            <aCol :span="20">
              <aFormItem label="图标" name="['props', 'icon']">
                <aInput v-model:value="attrs.icon" placeholder="iconfity图标名称"></aInput>
              </aFormItem>
            </aCol>
            <aCol :span="4">
              <aFormItem label=" ">
                <IconifyIcon :icon="attrs.icon" />
              </aFormItem>
            </aCol>
          </aRow>
        </aCol>
        <aCol :span="12">
          <aFormItem label="危险按钮" name="['props', 'danger']" :rules="rules.danger">
            <aSwitch v-model:checked="attrs.danger" />
          </aFormItem>
        </aCol>
        <aCol :span="12">
          <aFormItem label="幽灵按钮" name="['props', 'ghost']" :rules="rules.ghost">
            <aSwitch v-model:checked="attrs.ghost" />
          </aFormItem>
        </aCol>
      </aRow>
    </AttrWrapper>
  </FormWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  FormItem as aFormItem,
  Input as aInput,
  Row as aRow,
  Col as aCol,
  // RadioGroup as aRadioGroup,
  // RadioButton as aRadioButton,
  Select as aSelect,
  Switch as aSwitch,
} from 'ant-design-vue'
import type { RuleObject } from 'ant-design-vue/es/form'
import type { ButtonProps } from '@/types'
import { buttonTypeOptions, buttonSizeOptions } from '@/datas'
import IconifyIcon from '@/components/IconifyIcon.vue'
import AttrWrapper from '@/components/AttrWrapper.vue'
import FormWrapper from './FormWrapper.vue'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'ButtonAttrs',
})

interface Props {
  disabled?: boolean // 是否禁用
}
defineProps<Props>()

const { activeCanvasElement } = useDesignContext()

const attrs = computed<ButtonProps>(() => {
  return (activeCanvasElement.value?.props || {}) as ButtonProps
})

const rules = computed<Record<string, RuleObject[]>>(() => ({
  // name: [{ required: true, message: '请输入布局名称' }],
  // widthValue: [{ required: true, message: '请输入宽度值', type: 'number', min: 0 }],
  // heightValue: [{ required: true, message: '请输入高度值', type: 'number', min: 0 }],
}))
</script>
