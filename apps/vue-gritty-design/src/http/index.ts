import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type AxiosRequestConfig,
} from 'axios'
import { message } from 'ant-design-vue'
import { useRequestLoading } from '@/composables/useLoading'
import type { ApiConfig } from '@/types/api'

const { startLoading, endLoading } = useRequestLoading()

interface ResponseData<T> {
  success: boolean
  data: T
  message?: string
  msg?: string
  code?: string | number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Params = Record<string, any>

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  // 关键修改：允许所有状态码，让拦截器自己处理
  validateStatus: (status) => status >= 200 && status < 300,
})

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY || 'token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('HTTP 请求配置:', config)
    startLoading(config) // 开启全局loading
    return config
  },
  (error: AxiosError) => {
    endLoading(error.config) // 关闭全局loading
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    endLoading(response.config) // 关闭全局loading

    // 处理成功响应
    if (data.code === '000000') {
      return data.data
    } else {
      message.error(data.message || data.msg || '响应错误')
      return Promise.reject(new Error(data.message || data.msg || '响应错误'))
    }
  },

  (error: AxiosError) => {
    endLoading(error.config) // 关闭全局loading

    // 统一处理响应错误
    if (error.response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { status, data } = error.response as AxiosResponse<ResponseData<any>>

      switch (status) {
        case 401:
          message.error(data?.message || data?.msg || '未授权，请重新登录')
          break
        case 403:
          message.error(data?.message || data?.msg || '拒绝访问')
          break
        case 404:
          message.error(data?.message || data?.msg || '请求资源不存在')
          break
        case 500:
          message.error(data?.message || data?.msg || '服务器内部错误')
          break
        default:
          message.error(`请求失败，状态码: ${status}`)
      }

      return Promise.reject(data || error)
    } else {
      if (error.code === 'ERR_NETWORK') {
        message.error('网络错误')
        return Promise.reject(new Error('网络错误'))
      } else if (error.code === 'ECONNABORTED') {
        message.error('请求超时')
        return Promise.reject(new Error('请求超时'))
      }
    }

    message.error('请求失败')
    return Promise.reject(error)
  },
)

// 封装请求方法
const request = {
  get<T>(apiConfig: ApiConfig, params?: Params, config?: InternalAxiosRequestConfig): Promise<T> {
    return http.get(apiConfig.api, { params, ...config, apiConfig } as AxiosRequestConfig)
  },

  post<T>(apiConfig: ApiConfig, data?: Params, config?: InternalAxiosRequestConfig): Promise<T> {
    return http.post(apiConfig.api, data, { ...config, apiConfig } as AxiosRequestConfig)
  },

  put<T>(apiConfig: ApiConfig, data?: Params, config?: InternalAxiosRequestConfig): Promise<T> {
    return http.put(apiConfig.api, data, { ...config, apiConfig } as AxiosRequestConfig)
  },

  delete<T>(
    apiConfig: ApiConfig,
    params?: Params,
    config?: InternalAxiosRequestConfig,
  ): Promise<T> {
    return http.delete(apiConfig.api, { params, ...config, apiConfig } as AxiosRequestConfig)
  },

  patch<T>(apiConfig: ApiConfig, data?: Params, config?: InternalAxiosRequestConfig): Promise<T> {
    return http.patch(apiConfig.api, data, { ...config, apiConfig } as AxiosRequestConfig)
  },
}

export default request

// 导出类型定义
export type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  ResponseData,
  Params,
}
