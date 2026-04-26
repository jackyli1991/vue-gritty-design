import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'

export default defineHandler(async (event: H3Event) => {
  // 设置 CORS 头
  event.res.headers.set('Access-Control-Allow-Origin', '*')
  event.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
  event.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  event.res.headers.set('Access-Control-Allow-Credentials', 'true')
  event.res.headers.set('Access-Control-Max-Age', '86400')

  // 处理 OPTIONS 预检请求
  if (event.req.method === 'OPTIONS') {
    event.res.statusCode = 204
    return 'OK'
  }
})
