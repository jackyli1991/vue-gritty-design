import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import type { BreadcrumbRoute } from '@/types/routeJson'
import { autoRoutes } from '@/router/autoRoute'
import router from '@/router'

export const useRouteStore = defineStore('route', {
  state: () => ({
    allRoutes: autoRoutes, // 所有路由配置
  }),
  getters: {
    // 当前激活的路由名称
    activeRoute: () => [router.currentRoute.value.name as string],
    // 当前激活的路由父路由名称
    activeRouteParent: () => (router.currentRoute.value.meta?.parentRoute as string[]) || [],
    // 面包屑路由
    breadcrumbRoutes: () => {
      const curRoute = router.currentRoute.value
      const breadcrumbRoutes: BreadcrumbRoute[] = []
      curRoute.matched.forEach((item) => {
        breadcrumbRoutes.push({
          title: (item.meta?.title || item.name || '') as string,
          name: (item.name || '') as string,
          path: (item.path || '') as string,
        })
      })
      return breadcrumbRoutes.slice(1) // 去掉最顶层路由，因为最顶层路由是布局路由，不是页面路由
    },
  },
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.allRoutes = routes
    },
  },
})
