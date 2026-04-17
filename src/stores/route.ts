import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { autoRoutes } from '@/router/autoRoute'

export const useRouteStore = defineStore('route', {
  state: () => ({
    allRoutes: autoRoutes, // 所有路由配置
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.allRoutes = routes
    },
  },
})
