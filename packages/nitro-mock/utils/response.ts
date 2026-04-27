import { CODES } from '../codes'

// 包裹成功响应数据
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const successResponse = (data: Record<string, any>) => {
  return {
    ...CODES.success,
    data,
  }
}

// 包裹错误响应数据
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorResponse = (code: string, data?: Record<string, any>) => {
  return {
    ...CODES[code],
    data,
  }
}

/**
 * 模拟请求延迟
 * @param ms 延迟时间，单位毫秒，默认1秒
 * @returns 延迟结果
 */
export const delayResponse = (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
