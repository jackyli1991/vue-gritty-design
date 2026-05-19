<template>
  <div
    v-for="item in list"
    :key="item.value as string"
    class="toolbar-item"
    @click.stop="handleToolbarClick(item)"
  >
    <aTooltip :title="item.label" placement="top">
      <IconifyIcon :icon="item.icon" :size="20" :danger="item.danger" />
    </aTooltip>
  </div>
</template>

<script lang="ts" setup>
import { Tooltip as aTooltip } from 'ant-design-vue'
import { Option } from '@/types'
import IconifyIcon from './IconifyIcon.vue'

defineProps<{
  list: Option[]
}>()

const emit = defineEmits(['handle'])

function handleToolbarClick (item: Option) {
  emit('handle', item)
}
</script>
