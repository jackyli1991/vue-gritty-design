import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { autoRoutes } from '@/router/autoRoute'


export const useRouteStore = defineStore('route', {
  state: () => ({
    routes: autoRoutes,
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.routes = routes
    },
  },
})