import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'
import { successResponse, errorResponse, getUserIdFromContext, delayResponse } from '../../utils'
import { mockUsers } from '../../database/users'

/**
 * 获取用户信息路由接口
 * @url /api/userInfo
 * @description 获取用户信息路由接口
 * @example 获取用户信息路由成功
 * {
 *   "id": 1,
 *   "username": "admin",
 *   "email": "admin@example.com",
 *   "role": "admin"
 * }
 */
export default defineHandler(async (event: H3Event) => {
  // 从上下文获取 userId
  const userId = getUserIdFromContext(event)
  const userInfo = mockUsers.find((u) => u.id === userId)
  if (!userInfo) {
    return errorResponse('userError')
  }
  await delayResponse()
  return successResponse(userInfo)
})
