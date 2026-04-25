<!-- header栏 暗黑模式图标组件 -->
<template>
  <span class="relative mr-2.5 overflow-hidden" v-dark-mode="isDarkMode" @click="toggleDark">
    <!-- 占位图标，空白 -->
    <GIcon :name="ICONIFY_ICONS.placeholder" />
    <span
      class="flex flex-col absolute top-0 transition-all duration-300"
      :class="{
        '-translate-y-1/2': isDarkMode,
      }"
    >
      <GIcon :name="ICONIFY_ICONS.sun" />
      <GIcon :name="ICONIFY_ICONS.moon" />
    </span>
  </span>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { ICONIFY_ICONS } from '@/icons'

const isDarkMode = useDark({
  storageKey: 'GRITTY_DESIGN_DARK_MODE', // 持久化存储键
  selector: 'body',
  // attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})

function toggleDark() {
  isDarkMode.value = !isDarkMode.value
}
</script>
