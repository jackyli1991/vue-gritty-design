import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'
import { errorResponse } from '../utils'

export default defineHandler(async (event: H3Event) => {
  // 跳过 OPTIONS 预检请求（CORS middleware 已处理）
  if (event.req.method === 'OPTIONS') {
    return
  }

  // 跳过登录接口
  if (event.req.url.includes('/login')) {
    return
  }

  const authorization = event.req.headers.get('Authorization')
  console.log('请求头Token信息', authorization)

  if (!authorization) {
    // 设置 401 状态码并返回 JSON 格式错误信息
    event.res.status = 401
    event.res.headers.set('Content-Type', 'application/json')
    return errorResponse('authorizationError')
  }

  // 验证 token 格式
  // if (!authorization.startsWith('Bearer ')) {
  //   event.res.status = 401
  //   event.res.headers.set('Content-Type', 'application/json')
  //   return {
  //     success: false,
  //     message: 'token 格式错误',
  //     code: '401',
  //   }
  // }

  // // 验证 token（这里可以添加更多验证逻辑）
  // const token = authorization.substring(7)
  // if (!token || token.length < 10) {
  //   event.res.status = 401
  //   event.res.headers.set('Content-Type', 'application/json')
  //   return {
  //     success: false,
  //     message: '无效的 token',
  //     code: '401',
  //   }
  // }

  // token 验证通过，继续处理请求
  console.log('token 验证通过')
})
