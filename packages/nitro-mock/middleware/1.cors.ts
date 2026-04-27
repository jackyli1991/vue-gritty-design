import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'

export default defineHandler(async (event: H3Event) => {
  // 处理 OPTIONS 预检请求
  if (event.req.method === 'OPTIONS') {
    event.res.headers.set('Access-Control-Allow-Origin', '*')
    event.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    event.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    event.res.status = 200
    return ''
  }

  // 非 OPTIONS 请求也设置 CORS 头
  event.res.headers.set('Access-Control-Allow-Origin', '*')
  event.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  event.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
})
