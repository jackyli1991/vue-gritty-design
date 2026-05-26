// 日志中间件
import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'

export default defineHandler(async (event: H3Event) => {
  console.log('\n\n请求日志----------------->\n\n', event.req.url)
})
