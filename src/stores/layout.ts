import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * 布局状态管理
 * 用于管理布局组件的状态，如是否折叠
 */
export const useLayoutStore = defineStore('layout', () => {
  // 是否折叠
  const collapsed = ref(false)
  // header栏高度
  const headerHeight = ref(60)

  // 切换折叠状态
  function toggleCollapsed() {
    collapsed.value = !collapsed.value
  }

  return { collapsed, headerHeight, toggleCollapsed }
})
