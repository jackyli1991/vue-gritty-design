import { h } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import type { BreadcrumbRoute } from '@/types/routeJson'
import type { ItemType } from 'ant-design-vue'
import { GIcon } from '@/components'
import { autoRoutes } from '@/router/autoRoute'
import router from '@/router'
import { ICONIFY_ICONS } from '@/icons'

interface State {
  allRoutes: RouteRecordRaw[] // 所有路由配置
}

/**
 * 路由权限处理
 * 1. 隐藏路由不添加到菜单中
 * 2. 路由权限判断，过滤没有权限的路由【to do】
 * 3. 递归处理子路由
 * 4. 处理菜单项的图标、标题等属性
 * @param {RouteRecordRaw[]} routes 路由配置数组
 * @param {ItemType[]} target 菜单项数组
 */
function handleRoutesPermission(routes: RouteRecordRaw[], target: ItemType[]) {
  routes.forEach((route) => {
    // 隐藏路由不添加到菜单中
    if (route.meta?.hidden) {
      return
    }
    const menuItem: ItemType = {
      key: route.name as string,
      label: route.meta?.title || route.name || '',
      icon: () => h(GIcon, { name: ICONIFY_ICONS[route.meta?.icon as string] || '', size: 16 }),
      // type: 'group',
    }
    // 子路由
    if (route.children?.length) {
      menuItem.children = []
      handleRoutesPermission(route.children, menuItem?.children || [])
    }
    target.push(menuItem)
  })
}

export const useRouteStore = defineStore('route', {
  state: (): State => ({
    allRoutes: autoRoutes,
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
    // 有权限访问的路由
    accessibleRoutes: (state) => {
      const routes: ItemType[] = []
      handleRoutesPermission(state.allRoutes, routes)
      return routes
    },
  },
})
