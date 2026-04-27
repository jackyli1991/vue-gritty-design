import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'
import { errorResponse, verifyToken, parseToken } from '../utils'

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
  // console.log('请求头Token信息', authorization)

  // token 验证
  if (!authorization || !verifyToken(authorization)) {
    // 设置 401 状态码并返回 JSON 格式错误信息
    event.res.status = 401
    event.res.headers.set('Content-Type', 'application/json')
    return errorResponse('authorizationError')
  }

  // 解析 token, 获取 userId
  const userId = parseToken(authorization)
  // 添加 userId 到上下文
  event.context.params = { userId }
})
