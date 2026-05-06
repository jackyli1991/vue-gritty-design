<template>
  <span class="iconify-icon" :class="{ danger: danger }" :style="sizeStyle">
    <Icon :icon="icon" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'IconifyIcon',
})

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 24,
  },
  danger: {
    type: Boolean,
    default: false,
  },
})

const sizeStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}))
</script>

<style scoped lang="scss">
.iconify-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  &.danger {
    background: var(--vdt-danger-light);
    color: var(--vdt-danger);
  }
}
</style>
