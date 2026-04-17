import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'
import type { RouteJsonConfig } from '@/types/routeJson'
interface VueModule {
  default: Component
  btnPermission?: Record<string, number>
}
interface JsonModule {
  default: RouteJsonConfig[]
}
interface VuePages {
  [key: string]: VueModule
}

interface JsonPages {
  [key: string]: JsonModule
}

const pagesDir: string = '/src/views/' // 页面所在目录
const routeConfFile: string = 'routes.json' // 路由配置文件名
const autoRoutes: RouteRecordRaw[] = [] // 自动路由配置

// 导入所有 vue 组件
const pages: VuePages = import.meta.glob('@/views/**/*.vue', { eager: true })
// 导入所有 routes.json 文件
const routesJson: JsonPages = import.meta.glob('@/views/**/routes.json', { eager: true })
// console.log(pages, routesJson)

// 第一级路由配置
const levelOneJson = routesJson[pagesDir + routeConfFile]

/**
 * 递归创建路由
 * @param routes 路由配置数组
 * @param target 目标路由数组
 * @param parentPath 父路由路径
 */
function createRoutes(
  routes: RouteJsonConfig[],
  target: RouteRecordRaw[],
  parentPath: string = '',
) {
  routes.forEach((route) => {
    const { name, title, icon, type, ...rest } = route
    const isGroup = type === 'group'
    const importPath = `/src/views/${parentPath}${name}${isGroup ? '' : '.vue'}`

    const { default: component, btnPermission = {} } = pages[importPath] || {}
    // 路由配置
    const pathParams = name.split('_') // 文件名可能为：detail_id_type.vue形式，_后的部分作为路由参数
    let path: string = pathParams[0] || ''
    if (pathParams.length > 1) {
      path += `/${pathParams
        .slice(1)
        .map((item) => `:${item}`)
        .join('/')}`
    }
    const routeItem: RouteRecordRaw = {
      path, // 路径
      name, // 名称
      component: isGroup ? null : component, // 组件，目录没有，菜单才有
      meta: {
        ...rest,
        icon: icon || '', // 图标
        title: title || '', // 标题
        btnPermission, // 按钮权限
        parentRoute: parentPath
          .slice(0, -1)
          .split('/')
          .filter((item) => !!item), // 父路由路径
      },
      children: [], // 子路由
      // props: {}, // 路由参数
    }

    // 递归处理子路由
    if (isGroup) {
      const groupConfigPath = `${pagesDir}${parentPath}${name}/routes.json` // 子路由配置文件路径
      const groupJson = routesJson[groupConfigPath]
      createRoutes(groupJson?.default || [], routeItem.children, `${parentPath}${name}/`)
    }

    target.push(routeItem)
  })
}

createRoutes(levelOneJson?.default || [], autoRoutes, '')

// 404
autoRoutes.push({
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/404.vue'),
  meta: {
    title: '404',
    hidden: true,
    requiresAuth: false,
    parentRoute: [],
  },
})

console.log(autoRoutes)

export { autoRoutes }
