<script lang="ts" setup>
import { computed } from 'vue'
import { createIcon } from './create-icon'

defineOptions({
  name: 'GIcon',
})

interface GIconProps {
  name: string // 图标名称
  size?: number // 图标大小
}

const props = withDefaults(defineProps<GIconProps>(), {
  name: '',
  size: 24,
})

const Icon = computed(() => createIcon(props.name))
</script>

<template>
  <Icon
    :style="{
      display: 'inline-block',
      width: `${size}px`,
      height: `${size}px`,
    }"
  />
</template>
