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
          <aFormItem label="名称" name="['props', 'title']" :rules="rules.title">
            <aInput v-model:value="attrs.title" />
          </aFormItem>
        </aCol>
        <aCol :span="24">
          <aFormItem
            label="字段"
            name="['props', 'dataIndex']"
            :rules="rules.dataIndex"
            :tooltip="'支持嵌套路径，例如: a.b.c'"
          >
            <aInput v-model:value="attrs.dataIndex" />
          </aFormItem>
        </aCol>
        <aCol :span="24">
          <aRow :gutter="12">
            <aCol :span="12">
              <aFormItem
                label="宽度"
                name="['props', 'width']"
                :rules="rules.width"
                :tooltip="'列宽度, 单位:px'"
              >
                <aInputNumber
                  v-model:value="attrs.width"
                  style="width: 100%"
                  :min="attrs.minWidth"
                  :max="attrs.maxWidth"
                  :step="1"
                  placeholder="列宽度, 单位:px"
                />
              </aFormItem>
            </aCol>
            <aCol :span="12">
              <aFormItem label="允许调整宽度" name="['props', 'resizable']">
                <aSwitch v-model:checked="attrs.resizable" />
              </aFormItem>
            </aCol>
          </aRow>
        </aCol>
        <aCol :span="24">
          <aRow :gutter="2">
            <aCol :span="11">
              <aFormItem label="宽度范围" name="['props', 'minWidth']" :rules="rules.minWidth">
                <aInputNumber
                  v-model:value="attrs.minWidth"
                  style="width: 100%"
                  :min="0"
                  :max="attrs.maxWidth"
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
              <aFormItem label=" " name="['props', 'maxWidth']" :rules="rules.maxWidth">
                <aInputNumber
                  v-model:value="attrs.maxWidth"
                  style="width: 100%"
                  :min="attrs.minWidth"
                  :max="500"
                  :step="1"
                  placeholder="最大宽度(px)"
                />
              </aFormItem>
            </aCol>
          </aRow>
        </aCol>
        <aCol :span="24">
          <aFormItem label="对齐方式" name="['props', 'align']">
            <aRadioGroup v-model:value="attrs.align" button-style="solid">
              <aRadioButton v-for="(item, index) in alignOptions" :key="index" :value="item.value">
                {{ item.label }}
              </aRadioButton>
            </aRadioGroup>
          </aFormItem>
        </aCol>
        <aCol :span="24">
          <aFormItem label="固定位置" name="['props', 'fixed']">
            <aRadioGroup v-model:value="attrs.fixed" button-style="solid">
              <aRadioButton v-for="(item, index) in fixedOptions" :key="index" :value="item.value">
                {{ item.label }}
              </aRadioButton>
            </aRadioGroup>
          </aFormItem>
        </aCol>
      </aRow>
    </AttrWrapper>
    <AttrWrapper title="列筛选" v-if="attrs.filterable !== undefined">
      <aRow :gutter="12">
        <aCol :span="12">
          <aFormItem label="启用筛选" name="['props', 'filterable']">
            <aSwitch v-model:checked="attrs.filterable" />
          </aFormItem>
        </aCol>
        <template v-if="attrs.filterable">
          <aCol :span="12">
            <aFormItem label="可多选" name="['props', 'filterMultiple']">
              <aSwitch v-model:checked="attrs.filterMultiple" />
            </aFormItem>
          </aCol>
          <aCol :span="24">
            <aFormItem label="筛选模式" name="['props', 'filterMode']">
              <aRadioGroup v-model:value="attrs.filterMode" button-style="solid">
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
          <aCol :span="24">
            <aFormItem label="筛选选项来源" name="['props', 'filtersSource']">
              <aRadioGroup v-model:value="attrs.filtersSource" button-style="solid">
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
          <aCol :span="24">
            <aFormItem label="筛选图标" name="['props', 'filterIcon']">
              <aInput v-model:value="attrs.filterIcon" placeholder="iconfity图标名称">
                <template #suffix>
                  <IconifyIcon :icon="attrs.filterIcon" />
                </template>
              </aInput>
            </aFormItem>
          </aCol>
        </template>
      </aRow>
    </AttrWrapper>
    <AttrWrapper title="排序" v-if="attrs.sortable !== undefined"></AttrWrapper>
    <slot></slot>
  </FormWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  FormItem as aFormItem,
  Input as aInput,
  RadioGroup as aRadioGroup,
  RadioButton as aRadioButton,
  Row as aRow,
  Col as aCol,
  // Select as aSelect,
  InputNumber as aInputNumber,
  Switch as aSwitch,
} from 'ant-design-vue'
import type { RuleObject } from 'ant-design-vue/es/form'
import type { ColumnProps } from '@/types'
import IconifyIcon from '@/components/IconifyIcon.vue'
import AttrWrapper from '@/components/AttrWrapper.vue'
import FormWrapper from './components/FormWrapper.vue'
import { alignOptions, fixedOptions, filterModeOptions, filtersSourceOptions } from '@/datas'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'NormalColumnAttrs',
})

export interface NormalColumnAttrsProps {
  disabled?: boolean // 是否禁用
}
defineProps<NormalColumnAttrsProps>()

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
