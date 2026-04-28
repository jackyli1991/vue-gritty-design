import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import http from '@/http'
import router from '@/router'
import { loginApi, userInfoApi } from '@/apis'

interface UserInfo {
  username?: string // 用户名
  avatar?: string // 头像URL
  [key: string]: string | number | undefined
}

interface LoginResponse {
  token: string
}

interface State {
  TOKEN: string | undefined // 登录凭证token
  userInfo: UserInfo // 用户信息
}

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'token'

export const useUserStore = defineStore('user', {
  state: (): State => ({
    TOKEN: useStorage(TOKEN_KEY, undefined).value,
    userInfo: {},
  }),
  getters: {
    // 是否已登录
    isAuthenticated: (state) => !!state.TOKEN,
  },
  actions: {
    // 模拟登录
    async loginIn(loginForm: { username: string; password: string }) {
      // 1、登录请求
      const response: LoginResponse = await http.post<LoginResponse>(loginApi, loginForm)
      const { token } = response
      // 2、设置登录凭证token
      const loginToken = useStorage(TOKEN_KEY, token)
      this.TOKEN = loginToken.value
      // 3、跳转到主页
      router.replace({ name: 'home' })
    },
    // 获取用户信息
    async getUserInfo() {
      if (!this.TOKEN) {
        return
      }
      const response: UserInfo = await http.get<UserInfo>(userInfoApi)
      this.userInfo = response
    },
    // 清除登录凭证
    clearLoginInfo() {
      const logoutToken = useStorage(TOKEN_KEY, undefined)
      logoutToken.value = undefined
      this.TOKEN = logoutToken.value
      this.userInfo = {}
    },
    // 退出登录
    logout() {
      this.clearLoginInfo() // 清除登录凭证
      location.reload() // 网页刷新
    },
  },
})
