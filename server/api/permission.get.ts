import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'
// import { successResponse, errorResponse } from '../utils'

/**
 * 登录接口
 * @url /api/permission
 */
export default defineHandler(async (event: H3Event) => {
  console.log(event)
  // return errorResponse('loginError')
  // return successResponse({
  //   token,
  //   userInfo,
  // })
})
