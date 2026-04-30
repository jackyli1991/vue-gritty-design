import type { ApiConfig } from '@/types/api'

export const loginApi: ApiConfig = {
  api: '/login', // 接口地址
  ignoreLoading: true, // 接口不显示loading
  loadingText: '登录中...', // loading文本
}

// 权限路由接口
export const permissionApi: ApiConfig = {
  api: '/permission',
  ignoreLoading: false,
  loadingText: '菜单加载中...',
}

// 用户信息接口
export const userInfoApi: ApiConfig = {
  api: '/userInfo',
  ignoreLoading: false,
  loadingText: '用户信息加载中...',
}
