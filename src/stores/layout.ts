import { ref, unref } from 'vue'
import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

/**
 * 布局状态管理
 * 用于管理布局组件的状态
 */
export const useLayoutStore = defineStore('layout', () => {
  // 是否折叠
  const collapsed = ref(false)

  // 是否暗黑模式
  const isDark = useDark({
    storageKey: 'GRITTY_DESIGN_DARK_MODE', // 持久化存储键
    selector: 'body',
    attribute: 'color-scheme',
    valueDark: 'dark',
    valueLight: 'light'
  })

  const isDarkMode = ref(unref(isDark))

  // header栏高度
  const headerHeight = ref(60)

  // 切换折叠状态
  function toggleCollapsed() {
    collapsed.value = !collapsed.value
  }

  // 切换暗黑模式状态
  async function toggleDark() {
    isDarkMode.value = !isDarkMode.value
    setTimeout(() => {
      isDark.value = !isDark.value
    }, 300)
  }

  return { collapsed, headerHeight, toggleCollapsed, isDarkMode, toggleDark }
})
