import { createRouter, createWebHistory } from 'vue-router'
import { autoRoutes } from './autoRoute'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/LayoutIndex.vue'),
      children: autoRoutes,
    },
  ],
})

export default router
