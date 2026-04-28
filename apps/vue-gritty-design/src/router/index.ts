import { createRouter, createWebHistory } from 'vue-router'
import { useRouteStore } from '@/stores/route'
import { useUserStore } from '@/stores/user'
import { useProgressStore } from '@/stores/progress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/LayoutIndex.vue'),
      children: [], // 由路由权限管理动态添加
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const progressStore = useProgressStore()
  const routerStore = useRouteStore()
  const userStore = useUserStore()

  // 开始显示进度条
  progressStore.start()

  const isAuthenticated = userStore.isAuthenticated // 是否已登录
  const isPermissionRequest = routerStore.isPermissionRequest // 是否已请求权限路由

  // isAuthenticated：检查用户是否已登录
  // to.name !== 'login'：避免无限重定向
  if (!isAuthenticated && to.name !== 'login') {
    // console.log('未登录')
    progressStore.finish()
    return { name: 'login' } // 重定向到登录页
  }
  // 已登录
  if (isAuthenticated) {
    // console.log('已登录')
    const hasRoutes = routerStore.accessibleRoutes.length > 0
    if (!hasRoutes && !isPermissionRequest) {
      // console.log('初始化路由权限')
      try {
        await routerStore.getPermissionRoutes() // 获取权限路由
        await routerStore.addRoutes() // 动态添加路由
        // console.log('路由权限初始化完成')
        progressStore.finish()
        return { name: 'home' } // 重定向到当前路由
      } catch (error) {
        console.error('路由权限初始化失败', error)
        progressStore.error()
        userStore.clearLoginInfo() // 清除登录凭证
        return { name: 'login' } // 重定向到登录页
      }
    }
    // console.log('有路由权限')
    return true
  }
})

router.afterEach(() => {
  // 路由切换完成后结束进度条
  const progressStore = useProgressStore()
  progressStore.finish()
})

router.onError(() => {
  // 路由错误时显示错误状态
  const progressStore = useProgressStore()
  progressStore.error()
})

export default router
