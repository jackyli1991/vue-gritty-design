import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import http from '@/http'
import router from '@/router'
import { loginApi } from '@/apis'

interface UserInfo {
  username?: string // 用户名
  avatar?: string // 头像URL
  [key: string]: string | number | undefined
}

interface LoginResponse {
  token: string
  userInfo: UserInfo
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
      const { token, userInfo } = response
      // 2、设置登录凭证token
      const loginToken = useStorage(TOKEN_KEY, token)
      this.TOKEN = loginToken.value
      // 3、设置用户信息
      this.userInfo = userInfo
      // 3、跳转到主页
      router.replace({ name: 'home' })
    },
  },
})
