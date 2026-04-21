import { h } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import type { BreadcrumbRoute } from '@/types/routeJson'
import type { ItemType } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import GIcon from '@/components/GIcon/GIcon.vue'
import { autoRoutes, notFoundRoute } from '@/router/autoRoute'
import router from '@/router'
import { ICONIFY_ICONS } from '@/icons'
import { useStorage } from '@vueuse/core'

interface State {
  TOKEN: string // 登录凭证token
  enableRoutePermission: boolean // 是否开启路由权限管理
  allRoutes: RouteRecordRaw[] // 所有路由配置
  permissionRoutes: RouteRecordRaw[] // 有权限访问的路由
}

const TOKEN_KEY = 'GRITTY_DESIGN_TOKEN'

/**
 * 将可访问的路由转换为菜单项数组
 * 1. 隐藏路由不添加到菜单中
 * 2. 递归处理子路由
 * 3. 处理菜单项的图标、标题等属性
 * @param {RouteRecordRaw[]} routes 路由配置数组
 * @param {ItemType[]} target 菜单项数组
 */
function convertPermissionRoutesToMenuItems(routes: RouteRecordRaw[], target: ItemType[]) {
  routes.forEach((route) => {
    // 隐藏路由不添加到菜单中
    if (route.meta?.hidden) {
      return
    }
    const { type = 'page', title, icon } = route.meta || {}
    const menuItem: ItemType = {
      key: route.name as string,
      label: title || route.name || '',
      icon: () => h(GIcon, { name: ICONIFY_ICONS[icon as string] || '', size: 16 }),
      type: type as 'group' | 'divider' | undefined,
    }
    // 子路由
    if (route.children?.length) {
      menuItem.children = []
      convertPermissionRoutesToMenuItems(route.children, menuItem?.children || [])
    }
    target.push(menuItem)
  })
}

/**
 * 递归处理路由权限，根据权限路由ID数组筛选出有权限访问的路由
 * @param {string | number[]} ids 权限路由ID数组
 * @param {RouteRecordRaw[]} originalRoutes 原始路由数组
 * @param {RouteRecordRaw[]} target 目标路由数组
 */
function dealPermissionRoutes(
  ids: string | number[],
  originalRoutes: RouteRecordRaw[],
  target: RouteRecordRaw[],
) {
  originalRoutes.forEach((route: RouteRecordRaw) => {
    if (ids.includes(route.meta?.id as never)) {
      const newRoute = {
        ...route,
        children: [],
      }
      if (route.children?.length) {
        dealPermissionRoutes(ids, route.children, newRoute.children)
      }
      target.push(newRoute)
    }
  })
}

/**
 * 递归处理路由重定向
 * @param routes 路由数组
 */
function dealRoutesRedirect(routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    if (route.children?.length) {
      route.redirect = { name: route.children[0]?.name }
      dealRoutesRedirect(route.children)
    }
  })
}

export const useRouteStore = defineStore('route', {
  state: (): State => ({
    TOKEN: useStorage(TOKEN_KEY).value,
    enableRoutePermission: import.meta.env.VITE_ENABLE_ROUTE_PERMISSION === 'true',
    allRoutes: autoRoutes,
    permissionRoutes: [],
  }),
  getters: {
    // 是否已登录
    isAuthenticated: (state) => !!state.TOKEN,
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
      let allRoutes: RouteRecordRaw[]
      // 根据环境变量判断是否开启路由权限管理
      if (state.enableRoutePermission) {
        allRoutes = state.permissionRoutes
      } else {
        allRoutes = state.allRoutes
      }
      convertPermissionRoutesToMenuItems(allRoutes, routes)
      return routes
    },
  },
  actions: {
    // 模拟登录
    async loginIn(loginForm: { username: string; password: string }) {
      console.log('登录信息：', loginForm)
      message.success('登录中')
      // 1、模拟登录请求
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // 2、设置登录凭证token
      const token = useStorage(TOKEN_KEY, '123456')
      this.TOKEN = token.value
      // 3、跳转到主页
      router.replace({ name: 'home' })
    },
    // 模拟请求权限路由
    async getPermissionRoutes() {
      message.success('菜单请求中')
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await this.createPermissionRoutes([1, 2, 201, 202, 203, 20301, 20302])
      console.log('有权限访问的路由：', this.permissionRoutes)
    },
    // 创建有权限访问的路由
    createPermissionRoutes(permissionRouteIds: string | number[]) {
      const permissionRoutes: RouteRecordRaw[] = []
      if (this.enableRoutePermission) {
        dealPermissionRoutes(permissionRouteIds, this.allRoutes, permissionRoutes)
      } else {
        permissionRoutes.push(...this.allRoutes)
      }
      // 处理路由重定向
      dealRoutesRedirect(permissionRoutes)
      // 处理根路由重定向
      const rootRoute: RouteRecordRaw | undefined = router
        .getRoutes()
        .find((item) => item.name === 'home')
      if (rootRoute && permissionRoutes.length) {
        rootRoute.redirect = {
          name: permissionRoutes[0]?.name,
        }
      }
      this.permissionRoutes = permissionRoutes
    },
    // 动态添加路由
    addRoutes() {
      this.permissionRoutes.forEach((route) => {
        router.addRoute('home', route)
      })
      // 添加404路由
      router.addRoute('home', notFoundRoute)
    },
  },
})
