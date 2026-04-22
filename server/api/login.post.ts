import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'
import { successResponse, errorResponse } from '../utils'
import { mockUsers } from '../dataBase/users' // 模拟用户数据

interface LoginRequest {
  username: string
  password: string
}

// 模拟token
const generateToken = (userId: number) => {
  return `mock-token-${userId}-${Date.now()}`
}
/**
 * 登录接口
 * @url /api/login
 * @description 登录接口
 * @param username 用户名
 * @param password 密码
 * @example 登录成功
 * {
 *   "token": "mock-token-1-1694502400000",
 *   "userInfo": {
 *     "id": 1,
 *     "username": "admin",
 *     "email": "admin@example.com",
 *     "role": "admin"
 *   }
 * }
 */
export default defineHandler(async (event: H3Event) => {
  // 获取请求体
  const body: LoginRequest = (await event.req.json()) as LoginRequest
  const { username, password } = body
  const userInfo = mockUsers.find((u) => u.username === username && u.password === password)
  if (!userInfo) {
    return errorResponse('loginError')
  }
  const token = generateToken(userInfo.id)
  return successResponse({
    token,
    userInfo,
  })
})
