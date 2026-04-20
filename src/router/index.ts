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

router.beforeEach((to) => {
  // console.log('to', to)
  const routerStore = useRouteStore()
  const isAuthenticated = routerStore.isAuthenticated
  // isAuthenticated：检查用户是否已登录
  // to.name !== 'login'：避免无限重定向
  if (!isAuthenticated && to.name !== 'login') {
    return { name: 'login' } // 重定向到登录页
  }
})

export default router
