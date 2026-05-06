<template>
  <aPopover v-if="!disabled">
    <div class="color-picker-container">
      <span class="color-picker-placeholder" :style="{ backgroundColor: modelValue }"></span>
    </div>
    <template #content>
      <div class="flex items-center justify-center">
        <ChromePicker v-model="modelValue" />
      </div>
    </template>
  </aPopover>
  <div v-else class="color-picker-container">
    <span class="color-picker-placeholder" :style="{ backgroundColor: modelValue }"></span>
  </div>
</template>

<script setup lang="ts">
import { Popover as aPopover } from 'ant-design-vue'
import { ChromePicker } from 'vue-color'
import 'vue-color/style.css'

defineOptions({
  name: 'ColorPicker',
})

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const modelValue = defineModel<string>()
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
