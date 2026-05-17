<template>
  <aForm v-if="formData" ref="aFormRef" :model="formData" layout="vertical" :disabled="disabled">
    <AttrWrapper title="基础" :componentName="formData?.name">
      <aRow :gutter="12">
        <!-- <aCol :span="colSpan">
          <aFormItem label="ID" name="id" :rules="rules.id">
            <aInput :value="formData.id" readonly />
          </aFormItem>
        </aCol> -->
        <aCol :span="colSpan">
          <aFormItem label="名称" name="['props', 'title']" :rules="rules.title">
            <aInput v-model:value="formData.props.title" />
          </aFormItem>
        </aCol>
        <aCol :span="colSpan">
          <aFormItem
            label="字段"
            name="['props', 'dataIndex']"
            :rules="rules.dataIndex"
            :tooltip="'支持嵌套路径，例如: a.b.c'"
          >
            <aInput v-model:value="formData.props.dataIndex" />
          </aFormItem>
        </aCol>
        <aCol :span="colSpan">
          <aRow :gutter="12">
            <aCol :span="12">
              <aFormItem
                label="宽度"
                name="['props', 'width']"
                :rules="rules.width"
                :tooltip="'列宽度, 单位:px'"
              >
                <aInputNumber
                  v-model:value="formData.props.width"
                  style="width: 100%"
                  :min="formData.props.minWidth"
                  :max="formData.props.maxWidth"
                  :step="1"
                  placeholder="列宽度, 单位:px"
                />
              </aFormItem>
            </aCol>
            <aCol :span="12">
              <aFormItem label="允许调整宽度" name="['props', 'resizable']">
                <aSwitch v-model:checked="formData.props.resizable" />
              </aFormItem>
            </aCol>
          </aRow>
        </aCol>
        <aCol :span="colSpan">
          <aRow :gutter="2">
            <aCol :span="11">
              <aFormItem label="宽度范围" name="['props', 'minWidth']" :rules="rules.minWidth">
                <aInputNumber
                  v-model:value="formData.props.minWidth"
                  style="width: 100%"
                  :min="0"
                  :max="formData.props.maxWidth"
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
                  v-model:value="formData.props.maxWidth"
                  style="width: 100%"
                  :min="formData.props.minWidth"
                  :max="500"
                  :step="1"
                  placeholder="最大宽度(px)"
                />
              </aFormItem>
            </aCol>
          </aRow>
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
        <aCol :span="colSpan">
          <aFormItem label="固定位置" name="['props', 'fixed']">
            <aRadioGroup v-model:value="formData.props.fixed" button-style="solid">
              <aRadioButton v-for="(item, index) in fixedOptions" :key="index" :value="item.value">
                {{ item.label }}
              </aRadioButton>
            </aRadioGroup>
          </aFormItem>
        </aCol>
      </aRow>
    </AttrWrapper>
    <AttrWrapper title="列筛选" v-if="formData.props.filterable !== undefined">
      <aRow :gutter="12">
        <aCol :span="12">
          <aFormItem label="启用筛选" name="['props', 'filterable']">
            <aSwitch v-model:checked="formData.props.filterable" />
          </aFormItem>
        </aCol>
        <template v-if="formData.props.filterable">
          <aCol :span="12">
            <aFormItem label="可多选" name="['props', 'filterMultiple']">
              <aSwitch v-model:checked="formData.props.filterMultiple" />
            </aFormItem>
          </aCol>
          <aCol :span="24">
            <aFormItem label="筛选模式" name="['props', 'filterMode']">
              <aRadioGroup v-model:value="formData.props.filterMode" button-style="solid">
                <aRadioButton v-for="(item, index) in filterModeOptions" :key="index" :value="item.value">
                  {{ item.label }}
                </aRadioButton>
              </aRadioGroup>
            </aFormItem>
          </aCol>
          <aCol :span="24">
            <aFormItem label="筛选选项来源" name="['props', 'filtersSource']">
              <aRadioGroup v-model:value="formData.props.filtersSource" button-style="solid">
                <aRadioButton v-for="(item, index) in filtersSourceOptions" :key="index" :value="item.value">
                  {{ item.label }}
                </aRadioButton>
              </aRadioGroup>
            </aFormItem>
          </aCol>
          <aCol :span="24">
            <aFormItem label="筛选图标" name="['props', 'filterIcon']">
              <aInput v-model:value="formData.props.filterIcon" placeholder="iconfity图标名称">
                <template #suffix>
                  <IconifyIcon :icon="formData.props.filterIcon" />
                </template>
              </aInput>
            </aFormItem>
          </aCol>
        </template>
      </aRow>
    </AttrWrapper>
    <AttrWrapper title="排序"></AttrWrapper>
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
  InputNumber as aInputNumber,
  Switch as aSwitch,
} from 'ant-design-vue'
import type { RuleObject } from 'ant-design-vue/es/form'
// import type { DefaultOptionType } from 'ant-design-vue/es/select'
import IconifyIcon from '@/components/IconifyIcon.vue'
import AttrWrapper from '@/components/AttrWrapper.vue'
import { alignOptions, fixedOptions, filterModeOptions, filtersSourceOptions } from '@/datas'
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
