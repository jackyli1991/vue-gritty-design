import type { InternalAxiosRequestConfig } from 'axios'
import { ref, computed } from 'vue'

// 全局请求loading列表（防止多个请求同时触发闪烁）
const requestLoadingList = ref<{ url: string; method: string | undefined }[]>([])

// 请求 loading 状态
const requestLoading = computed(() => requestLoadingList.value.length > 0)

/**
 * 统一管理请求 loading
 */
export function useRequestLoading() {
  /**
   * 开启 loading
   * @param config 请求配置
   */
  const startLoading = (config?: InternalAxiosRequestConfig) => {
    requestLoadingList.value.push({
      url: config?.url || '',
      method: config?.method,
    })
  }

  /**
   * 关闭 loading
   * @param config 请求配置
   */
  const endLoading = (config?: InternalAxiosRequestConfig) => {
    const idx = requestLoadingList.value.findIndex((item) => item.url === config?.url && item.method === config?.method)
    if (idx !== -1) {
      requestLoadingList.value.splice(idx, 1)
    } else {
      console.warn(`endLoading: ${config?.url}【 ${config?.method}】 not found in requestLoadingList`)
    }
  }

  return {
    requestLoading,
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
