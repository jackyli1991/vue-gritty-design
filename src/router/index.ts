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
  ],
})

router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  const routerStore = useRouteStore()
  if (routerStore.permissionRoutes.length > 0) {
    next()
  } else {
    console.log('没有权限路由')
    routerStore.createPermissionRoutes([1, 2, 201]) // 生成有权限的路由
    routerStore.addRoutes() // 动态添加路由
    router.addRoute('home', {
      path: '/404',
      name: 'notFound',
      component: () => import('@/views/404.vue'),
    }) // 404路由
    next()
  }
})

export default router
