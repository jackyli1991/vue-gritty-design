<template>
  <aButton v-bind="mergeProps" :style="{ backgroundColor: props.backgroundColor }">
    <span class="gritty-button-content">
      <Icon v-if="props.icon" :icon="props.icon" />
      {{ props.backgroundColor }}
      <span>{{ props.content }}</span>
    </span>
  </aButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from 'ant-design-vue'
import { Icon } from '@iconify/vue'
import { Button as aButton } from 'ant-design-vue'

defineOptions({
  name: 'GrittyButtonComponent',
})

interface GrittyButtonProps extends ButtonProps {
  content?: string
  backgroundColor?: string
}

defineEmits(['click'])

const props = defineProps<GrittyButtonProps>()

// 排除 icon 属性
const mergeProps = computed(() => ({
  ...props,
  icon: '',
  content: '',
  backgroundColor: '',
}))
</script>

<style scoped lang="scss">
.gritty-button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
</style>
