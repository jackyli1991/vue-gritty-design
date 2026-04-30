import type { InternalAxiosRequestConfig } from 'axios'
import { ref, computed } from 'vue'
import type { ApiConfig } from '@/types/api'

interface AxiosRequestConfig extends InternalAxiosRequestConfig {
  apiConfig?: ApiConfig
}

// 全局请求loading列表（防止多个请求同时触发闪烁）
const requestLoadingList = ref<{ url: string; method: string | undefined; loadingText?: string }[]>(
  [],
)

// 请求 loading 状态
const requestLoading = computed(() => requestLoadingList.value.length > 0)

// 全局loading文本
const requestLoadingText = computed(() => requestLoadingList.value[0]?.loadingText)

/**
 * 统一管理请求 loading
 */
export function useRequestLoading() {
  /**
   * 开启 loading
   * @param config 请求配置
   */
  const startLoading = (config?: AxiosRequestConfig) => {
    // 忽略loading
    if (config?.apiConfig?.ignoreLoading) {
      return
    }
    requestLoadingList.value.push({
      url: config?.url || '',
      method: config?.method,
      loadingText: config?.apiConfig?.loadingText,
    })
  }

  /**
   * 关闭 loading
   * @param config 请求配置
   */
  const endLoading = (config?: AxiosRequestConfig) => {
    const idx = requestLoadingList.value.findIndex(
      (item) => item.url === config?.url && item.method === config?.method,
    )
    if (idx !== -1) {
      requestLoadingList.value.splice(idx, 1)
    } else {
      console.warn(
        `endLoading: ${config?.url}【 ${config?.method}】 not found in requestLoadingList`,
      )
    }
  }

  return {
    requestLoading,
    requestLoadingText,
    startLoading,
    endLoading,
  }
}

/**
 * 组件独立 loading
 */
export function useLoading() {
  const loading = ref(false)

  function startLoading() {
    loading.value = true
  }

  function endLoading() {
    loading.value = false
  }

  return {
    loading,
    startLoading,
    endLoading,
  }
}
