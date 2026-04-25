import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'
import { successResponse } from '../../utils'

export default defineHandler(async (event: H3Event) => {
  console.log('获取权限请求----->', event)
  return successResponse({
    permission: ['admin', 'user'],
  })
})
