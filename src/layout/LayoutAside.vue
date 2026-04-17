<template>
  <div class="layout-aside h-full overflow-hidden flex flex-col">
    <div class="logo flex items-center justify-center" :style="{ height: `${headerHeight}px` }">
      <img class="h-full" :src="logo" alt="logo" />
    </div>
    <aMenu
      class="flex-1 overflow-auto"
      theme="light"
      mode="inline"
      :selected-keys="activeRoute"
      :open-keys="activeRouteParent"
      :items="menuItems"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import type { RouteRecordRaw, RouteRecordNameGeneric } from 'vue-router'
import type { ItemType, MenuProps } from 'ant-design-vue'
import { Menu as aMenu } from 'ant-design-vue'
import { GIcon } from '@/components'
import logo from '@/assets/logo.png'
import { useLayoutStore } from '@/stores/layout'
import { useRouteStore } from '@/stores/route'
import { ICONIFY_ICONS } from '@/icons'

defineOptions({
  name: 'LayoutAside',
})

const layoutStore = useLayoutStore()
const { headerHeight } = storeToRefs(layoutStore)

const routeStore = useRouteStore()
const { allRoutes, activeRoute, activeRouteParent } = storeToRefs(routeStore)

// 菜单项数组
const menuItems: ItemType[] = []

/**
 * 路由配置转换为菜单项
 * @param {RouteRecordRaw[]} routes 路由配置数组
 * @param {ItemType[]} target 菜单项数组
 */
function transformRoutesToMenuItems(routes: RouteRecordRaw[], target: ItemType[]) {
  routes.forEach((route) => {
    // 隐藏路由不添加到菜单中
    if (route.meta?.hidden) {
      return
    }
    const menuItem: ItemType = {
      key: route.name as string,
      label: route.meta?.title || route.name || '',
      icon: () => h(GIcon, { name: ICONIFY_ICONS[route.meta?.icon as string] || '', size: 16 }),
    }
    if (route.children?.length) {
      menuItem.children = []
      transformRoutesToMenuItems(route.children, menuItem.children)
    }
    target.push(menuItem)
  })
}

transformRoutesToMenuItems(allRoutes.value, menuItems)

/**
 * 处理菜单项点击事件
 * @param {string} key 菜单项的key值
 */
const handleSelect: MenuProps['onSelect'] = (params) => {
  const { key } = params
  router.push({
    name: key as RouteRecordNameGeneric,
  })
}
</script>

<style lang="scss" scoped>
.layout-aside {
  .logo {
    padding: 14px 0;
  }
}
</style>
