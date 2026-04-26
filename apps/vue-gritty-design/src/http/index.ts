import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios'
import { message } from 'ant-design-vue'

// 定义响应数据接口
interface ResponseData<T> {
  success: boolean
  data: T
  message: string
  code?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Params = Record<string, any>

// 创建axios实例
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加token到请求头
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY || 'token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response

    // 统一处理响应
    if (data.code === '000000') {
      return data.data
    } else {
      // 处理业务错误
      message.error(data.msg)
      return Promise.reject(new Error(data.msg))
    }
  },
  (error: AxiosError) => {
    console.error('http 请求错误', error)
    // 处理HTTP错误
    if (error.response) {
      const { status, data } = error.response

      // 处理不同的HTTP状态码
      switch (status) {
        case 401:
          // 未授权，跳转到登录页
          message.error('未授权，请重新登录')
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          message.error('拒绝访问')
          break
        case 404:
          message.error('请求资源不存在')
          break
        case 500:
          message.error('服务器内部错误')
          break
        default:
          message.error(`请求失败，状态码: ${status}`)
      }

      return Promise.reject(data || error.message)
    } else if (error.request) {
      message.error('请求超时或网络错误')
      return Promise.reject(new Error('请求超时或网络错误'))
    } else {
      return Promise.reject(error)
    }
  },
)

// 封装请求方法
const request = {
  get<T>(url: string, params?: Params, config?: InternalAxiosRequestConfig): Promise<T> {
    return http.get(url, { params, ...config })
  },

  post<T>(url: string, data?: Params, config?: InternalAxiosRequestConfig): Promise<T> {
    return http.post(url, data, config)
  },

  put<T>(url: string, data?: Params, config?: InternalAxiosRequestConfig): Promise<T> {
    return http.put(url, data, config)
  },

  delete<T>(url: string, params?: Params, config?: InternalAxiosRequestConfig): Promise<T> {
    return http.delete(url, { params, ...config })
  },

  patch<T>(url: string, data?: Params, config?: InternalAxiosRequestConfig): Promise<T> {
    return http.patch(url, data, config)
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
