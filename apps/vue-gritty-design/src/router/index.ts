import { createRouter, createWebHistory } from 'vue-router'
import { useRouteStore } from '@/stores/route'

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
  console.log('to', to)
  const routerStore = useRouteStore()
  const isAuthenticated = routerStore.isAuthenticated

  // isAuthenticated：检查用户是否已登录
  // to.name !== 'login'：避免无限重定向
  if (!isAuthenticated && to.name !== 'login') {
    console.log('未登录')
    return { name: 'login' } // 重定向到登录页
  }
  // 已登录
  if (isAuthenticated) {
    console.log('已登录')
    const hasRoutes = routerStore.accessibleRoutes.length > 0
    if (!hasRoutes) {
      console.log('初始化路由权限')
      await routerStore.getPermissionRoutes() // 获取权限路由
      await routerStore.addRoutes() // 动态添加路由
      console.log('路由权限初始化完成')
      return { name: 'home' } // 重定向到当前路由
    }
    console.log('有路由权限')
    return true
  }
})

export default router
