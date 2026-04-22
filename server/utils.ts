import { CODES } from './codes'

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
