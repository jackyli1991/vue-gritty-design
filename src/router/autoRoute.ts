import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'
interface VueModule {
  default: Component
  routeMeta?: RouteRecordRaw['meta']
}

interface Pages {
  [key: string]: VueModule
}

// const pagesDir: string = '/src/views'

// 导入所有 vue 组件
const pages: Pages = import.meta.glob('@/views/**/*.vue', { eager: true })
// 导入所有 routes.json 文件
const routesJson = import.meta.glob('@/views/**/routes.json', { eager: true })
console.log(pages, routesJson)



const autoRoutes: RouteRecordRaw[] = []

// for (const filePath of Object.keys(pages)) {
//   // 1. 处理路径
//   let routePath = filePath.replace(pagesDir, '').replace('.vue', '')

//   // index.vue 变成目录根路径
//   routePath = routePath.replace(/\/?index$/, '')

//   // [id] 转 :id
//   routePath = routePath.replace(/\[(\w+)\]/g, ':$1')

//   // 空路径 = /
//   if (routePath === '') routePath = '/'

//   // 2. 组件
//   const comp: VueModule = pages[filePath]!
//   const component = comp.default

//   // 3. 名称：驼峰
//   const name =
//     routePath
//       .split('/')
//       .filter(Boolean)
//       .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
//       .join('') || 'Index'

//   // 4. meta 支持页面自定义
//   const meta = comp.routeMeta || {
//     title: name.replace(/([A-Z])/g, ' $1').trim(),
//   }

//   autoRoutes.push({
//     path: routePath,
//     name,
//     component,
//     meta,
//   })
// }

// 404
// autoRoutes.push({
//   path: '/:pathMatch(.*)*',
//   name: 'NotFound',
//   component: () => import('../views/404.vue'),
//   meta: { title: '404' },
// })

export { autoRoutes }
