<template>
  <span class="iconify-icon">
    <Icon :icon="icon" />
  </span>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'IconifyIcon',
})

defineProps({
  icon: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.iconify-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
}
</style>
