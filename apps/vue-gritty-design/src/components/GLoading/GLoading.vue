<!-- 全局loading -->
<template>
  <Transition>
    <div
      v-show="show"
      class="global-loading flex flex-col items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-black/10 z-1000 opacity-100 transition-opacity duration-300 ease-in-out"
      :class="{ 'opacity-0!': !show }"
    >
      <GIcon :name="ICONIFY_ICONS.loading" :size="26" />
      <slot>
        <span class="text-sm mt-4">{{ text }}</span>
      </slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ICONIFY_ICONS } from '@/icons'

defineOptions({
  name: 'GLoading',
})

defineProps({
  /**
   * 是否显示loading
   */
  show: {
    type: Boolean,
    default: false,
  },
  /**
   * loading 文本
   */
  text: {
    type: String,
    default: '',
  },
})
</script>
