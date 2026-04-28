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
      :items="accessibleRoutes"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import router from '@/router'
import type { RouteRecordNameGeneric } from 'vue-router'
import type { MenuProps } from 'ant-design-vue'
import { Menu as aMenu } from 'ant-design-vue'
import logo from '@/assets/logo.png'
import { useLayoutStore } from '@/stores/layout'
import { useRouteStore } from '@/stores/route'

defineOptions({
  name: 'LayoutAside',
})

const layoutStore = useLayoutStore()
const { headerHeight } = storeToRefs(layoutStore)

const routeStore = useRouteStore()
const { activeRoute, activeRouteParent, accessibleRoutes } = storeToRefs(routeStore)

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
