import { ref, computed } from 'vue'
import type { ThemeColors } from '@/types'
import { lighten, darken } from '@/utils/colorUtils'

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
    const c = themeColors.value
    return {
      '--vdt-primary': c.primary,
      '--vdt-primary-hover': darken(c.primary, 0.1),
      '--vdt-primary-light': lighten(c.primary, 0.9),
      '--vdt-danger': c.danger,
      '--vdt-danger-hover': darken(c.danger, 0.1),
      '--vdt-danger-light': lighten(c.danger, 0.9),
      '--vdt-success': c.success,
      '--vdt-success-hover': darken(c.success, 0.1),
      '--vdt-success-light': lighten(c.success, 0.9),
      '--vdt-warning': c.warning,
      '--vdt-warning-hover': darken(c.warning, 0.1),
      '--vdt-warning-light': lighten(c.warning, 0.9),
      '--vdt-info': c.info,
      '--vdt-info-hover': darken(c.info, 0.1),
      '--vdt-info-light': lighten(c.info, 0.9),
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
