interface Code {
  code: string
  msg: string
}

// 响应码汇总
export const CODES: Record<string, Code> = {
  success: {
    code: '000000',
    msg: 'success',
  },
  loginError: {
    code: '000101',
    msg: '用户名或密码错误',
  },
  userError: {
    code: '000102',
    msg: '用户不存在',
  },
  notFound: {
    code: '000404',
    msg: '请求资源不存在',
  },
  authorizationError: {
    code: '000401',
    msg: '未授权，请重新登录',
  },
  aiChatError: {
    code: '000501',
    msg: 'AI 模型调用错误',
  },
}
