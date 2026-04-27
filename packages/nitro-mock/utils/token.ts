/**
 * 生成token
 * @param userId 用户id
 * @returns 生成结果
 */
export const generateToken = (userId: number) => {
  return `mock-token-${userId}-${Date.now()}`
}

/**
 * 验证token
 * @param token token
 * @returns 验证结果
 */
export const verifyToken = (token: string) => {
  return token.startsWith('Bearer mock-token-')
}

/**
 * 解析token
 * @param token token
 * @returns 解析结果
 */
export const parseToken = (token: string) => {
  return token.split('-')[2]
}

/**
 * 验证token是否过期
 * @param token token
 * @returns 验证结果
 */
export const verifyTokenExpire = (token: string) => {
  return Date.now() - Number(token.split('-')[3]) < 1000 * 60 * 5
}
