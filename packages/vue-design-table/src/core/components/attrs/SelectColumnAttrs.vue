<template>
  <FormWrapper v-if="attrs" :form-data="attrs" :form-rules="rules" :disabled="disabled">
    <AttrWrapper title="基础" :componentName="activeCanvasElement?.name">
      <aRow :gutter="12">
        <!-- <aCol :span="24">
          <aFormItem label="ID" name="id" :rules="rules.id">
            <aInput :value="attrs.id" readonly />
          </aFormItem>
        </aCol> -->
        <aCol :span="24">
          <aFormItem label="名称" name="['props', 'title']" :rules="rules.title">
            <aInput v-model:value="attrs.title" />
          </aFormItem>
        </aCol>
      </aRow>
    </AttrWrapper>
  </FormWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormItem as aFormItem, Input as aInput, Row as aRow, Col as aCol } from 'ant-design-vue'
import type { RuleObject } from 'ant-design-vue/es/form'
import type { ColumnProps } from '@/types'
import AttrWrapper from '@/components/AttrWrapper.vue'
import FormWrapper from './components/FormWrapper.vue'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'SelectColumnAttrs',
})

export interface SelectColumnAttrsProps {
  disabled?: boolean // 是否禁用
}
defineProps<SelectColumnAttrsProps>()

const { activeCanvasElement } = useDesignContext()

const attrs = computed<ColumnProps>(() => {
  return (activeCanvasElement.value?.props || {}) as ColumnProps
})
const rules = computed<Record<string, RuleObject[]>>(() => ({
  // name: [{ required: true, message: '请输入布局名称' }],
  // widthValue: [{ required: true, message: '请输入宽度值', type: 'number', min: 0 }],
  // heightValue: [{ required: true, message: '请输入高度值', type: 'number', min: 0 }],
}))
</script>
