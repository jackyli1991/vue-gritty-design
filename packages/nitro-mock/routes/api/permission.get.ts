import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'
import { successResponse, errorResponse, getUserIdFromContext, delayResponse } from '../../utils'
import { mockUsers } from '../../database/users'

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
  const userId = getUserIdFromContext(event)
  const userInfo = mockUsers.find((u) => u.id === userId)
  if (!userInfo) {
    return errorResponse('userError')
  }
  await delayResponse()
  return successResponse({
    permission: userInfo.permission,
  })
})
