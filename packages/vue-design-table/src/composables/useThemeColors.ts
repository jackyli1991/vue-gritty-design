import { ref, computed } from 'vue'
import type { ThemeColors } from '@/types'

// 默认主题颜色
const DEFAULT_THEME_COLORS: Required<ThemeColors> = {
  primary: '#1890ff',
  danger: '#ff4d4f',
  success: '#52c41a',
  warning: '#faad14',
  info: '#1890ff',
}

export function useThemeColors(initialColors?: ThemeColors) {
  const themeColors = ref<Required<ThemeColors>>({ ...DEFAULT_THEME_COLORS, ...initialColors })

  // 计算CSS变量
  // 用于在组件中使用var(--vdt-primary)等变量
  const cssVariables = computed(() => {
    return {
      '--vdt-primary': themeColors.value.primary,
      '--vdt-primary-hover': themeColors.value.primary,
      '--vdt-primary-light': themeColors.value.primary,
      '--vdt-danger': themeColors.value.danger,
      '--vdt-danger-hover': themeColors.value.danger,
      '--vdt-danger-light': themeColors.value.danger,
      '--vdt-success': themeColors.value.success,
      '--vdt-success-hover': themeColors.value.success,
      '--vdt-success-light': themeColors.value.success,
      '--vdt-warning': themeColors.value.warning,
      '--vdt-warning-hover': themeColors.value.warning,
      '--vdt-warning-light': themeColors.value.warning,
      '--vdt-info': themeColors.value.info,
      '--vdt-info-hover': themeColors.value.info,
      '--vdt-info-light': themeColors.value.info,
    }
  })

  // 设置主题颜色
  function setThemeColors(colors: ThemeColors) {
    themeColors.value = { ...themeColors.value, ...colors }
  }

  // 应用CSS变量到指定元素
  // 用于在组件中使用var(--vdt-primary)等变量
  function applyCssVariables(element: HTMLElement) {
    Object.entries(cssVariables.value).forEach(([key, value]) => {
      element.style.setProperty(key, value)
    })
  }

  return {
    themeColors,
    cssVariables,
    setThemeColors,
    applyCssVariables,
  }
}

export { DEFAULT_THEME_COLORS }
