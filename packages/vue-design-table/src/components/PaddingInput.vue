<!-- padding 输入框
modelValue数据格式：[top, right, bottom, left] -->
<template>
  <aRow class="padding-input-container">
    <aCol :span="8"></aCol>
    <aCol :span="8">
      <aInputNumber
        :value="modelValue[0]"
        :disabled="disabled"
        :controls="!disabled"
        @update:value="updateValue(0, $event as number)"
        prefix="上"
        :min="0"
        style="width: 100%"
      />
    </aCol>
    <aCol :span="8"></aCol>
    <aCol :span="8">
      <aInputNumber
        :value="modelValue[3]"
        :disabled="disabled"
        :controls="!disabled"
        @update:value="updateValue(3, $event as number)"
        prefix="左"
        :min="0"
        style="width: 100%"
      />
    </aCol>
    <aCol :span="8" class="link-icon">
      <IconifyIcon
        :class="{ 'link-icon-active': isLinkActive }"
        icon="material-symbols:link-rounded"
        @click="handleLinkClick"
      />
    </aCol>
    <aCol :span="8">
      <aInputNumber
        :value="modelValue[1]"
        :disabled="disabled"
        :controls="!disabled"
        @update:value="updateValue(1, $event as number)"
        prefix="右"
        :min="0"
        style="width: 100%"
      />
    </aCol>
    <aCol :span="8"></aCol>
    <aCol :span="8">
      <aInputNumber
        :value="modelValue[2]"
        :disabled="disabled"
        :controls="!disabled"
        @update:value="updateValue(2, $event as number)"
        prefix="下"
        :min="0"
        style="width: 100%"
      />
    </aCol>
    <aCol :span="8"></aCol>
  </aRow>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Row as aRow, Col as aCol, InputNumber as aInputNumber } from 'ant-design-vue'
import IconifyIcon from './IconifyIcon.vue'

defineOptions({
  name: 'PaddingInput',
})

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const isLinkActive = ref(false)
const modelValue = defineModel<number[]>({
  default: () => [0, 0, 0, 0],
})

/**
 * 更新padding值
 * @param index padding的索引
 * @param value 新的padding值
 */
function updateValue(index: number, value: number) {
  modelValue.value[index] = value
  if (isLinkActive.value) {
    modelValue.value = [value, value, value, value]
  } else {
    modelValue.value[index] = value
  }
}

/**
 * 点击链接图标，将上下左右的padding设置为相同的值
 */
const handleLinkClick = () => {
  isLinkActive.value = !isLinkActive.value
}
</script>

<style scoped lang="scss">
.padding-input-container {
  :deep(.ant-col) {
    margin-bottom: 4px;
    text-align: center;
  }
  .link-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    .link-icon-active {
      color: #1890ff;
      background-color: #e6f7ff;
    }
  }
}
</style>
