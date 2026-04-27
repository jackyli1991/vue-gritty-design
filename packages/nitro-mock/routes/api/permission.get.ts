import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'
import { successResponse } from '../../utils'

/**
 * 获取权限路由接口
 * @url /api/permission
 * @description 获取权限路由接口
 * @example 获取权限路由成功
 * {
 *   "permission": [1, 2, 201]
 * }
 */
export default defineHandler(async (event: H3Event) => {
  console.log(event.context)

  return successResponse({
    permission: [1],
  })
})
