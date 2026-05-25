<template>
  <aPopover v-if="!disabled">
    <div class="color-picker-container">
      <span class="color-picker-placeholder" :style="{ backgroundColor: modelValue }"></span>
    </div>
    <template #content>
      <div
        :style="{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }"
      >
        <a-button v-if="clearable" type="link" size="small" @click="clearColor">清除</a-button>
        <ChromePicker :modelValue="modelValue" @update:modelValue="updateModelValue" />
      </div>
    </template>
  </aPopover>
  <div v-else class="color-picker-container">
    <span class="color-picker-placeholder" :style="{ backgroundColor: modelValue }"></span>
  </div>
</template>

<script setup lang="ts">
import { Popover as aPopover, Button as aButton } from 'ant-design-vue'
import { ChromePicker, tinycolor } from 'vue-color'
import 'vue-color/style.css'

defineOptions({
  name: 'ColorPicker',
})

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否可清除空值
  clearable: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

// 清除颜色
function clearColor() {
  emit('update:modelValue', '')
}

// 默认转换为RGBA表示
const updateModelValue = (val: string) => {
  const rgb = tinycolor(val).toRgb()
  const color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
  emit('update:modelValue', color)
}
</script>

<style scoped lang="scss">
.color-picker-container {
  display: inline-block;
  padding: 2px;
  border-radius: 4px;
  font-size: 0;
  border: 1px solid #d9d9d9;
  .color-picker-placeholder {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 4px;
  }
}
</style>
