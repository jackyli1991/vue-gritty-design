import { ref, computed } from 'vue'

// 全局请求loading列表（防止多个请求同时触发闪烁）
const requestLoadingList = ref<{ url: string; loading: boolean }[]>([])

// 请求 loading 状态
const requestLoading = computed(() => requestLoadingList.value.length > 0)

/**
 * 统一管理请求 loading
 * 支持：全局loading + 组件独立loading
 */
export function useLoading() {
  // 组件独立 loading（可选）
  const loading = ref(false)

  /**
   * 开启 loading
   * @param url 请求url（用于关闭 loading）
   * @param isGlobal 是否全局（默认true）
   */
  const startLoading = (isGlobal = true, url: string) => {
    if (isGlobal) {
      requestLoadingList.value.push({
        url,
        loading: true,
      })
    } else {
      loading.value = true
    }
  }

  /**
   * 关闭 loading
   * @param url 请求url（用于关闭 loading）
   * @param isGlobal 是否全局（默认true）
   */
  const endLoading = (isGlobal = true, url: string) => {
    if (isGlobal) {
      const idx = requestLoadingList.value.findIndex((item) => item.url === url)
      if (idx !== -1) {
        requestLoadingList.value.splice(idx, 1)
      } else {
        console.warn(`endLoading: ${url} not found in requestLoadingList`)
      }
    } else {
      loading.value = false
    }
  }

  return {
    // 全局请求loading列表
    requestLoadingList,
    // 全局 loading
    requestLoading,
    // 组件独立 loading
    loading,
    startLoading,
    endLoading,
  }
}
