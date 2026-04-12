<template>
  <div class="layout-aside h-full overflow-hidden flex flex-col">
    <div class="logo flex items-center justify-center" :style="{ height: `${headerHeight}px` }">
      <img class="h-full" :src="logo" alt="logo" />
    </div>
    <aMenu
      class="flex-1 overflow-auto"
      theme="light"
      mode="inline"
      default-selected-keys="['1']"
      :items="menuItems"
    />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { storeToRefs } from 'pinia'
import type { ItemType } from 'ant-design-vue/es/menu'
import { Menu as aMenu } from 'ant-design-vue'
import { GIcon } from '@/components'
import { useLayoutStore } from '@/stores/layout'
import logo from '@/assets/logo.png'

defineOptions({
  name: 'LayoutAside',
})

const layoutStore = useLayoutStore()
const { headerHeight } = storeToRefs(layoutStore)

const menuItems: ItemType[] = [
  {
    key: '1',
    label: '首页',
    icon: () => h(GIcon, { name: 'solar:home-2-broken' }),
  },
  {
    key: '2',
    label: '列表',
    icon: () => h(GIcon, { name: 'solar:airbuds-case-minimalistic-broken' }),
  },
  {
    key: '3',
    label: '详情',
    icon: () => h(GIcon, { name: 'solar:clipboard-list-broken' }),
    children: [
      {
        key: '3-1',
        label: '详情1',
        icon: () => h(GIcon, { name: 'solar:clipboard-list-broken' }),
      },
      {
        key: '3-2',
        label: '详情2',
        children: [
          {
            key: '3-2-1',
            label: '详情2-1详情2-1详情2-1详情2-1',
          },
          {
            key: '3-2-2',
            label: '详情2-2',
            icon: () => h(GIcon, { name: 'solar:clipboard-list-broken' }),
            children: [
              {
                key: '3-2-2-1',
                label: '详情2-2-1',
              },
            ],
          },
        ],
      },
    ],
  }
]
</script>

<style lang="scss" scoped>
.layout-aside {
  .logo {
    padding: 14px 0;
  }
}
</style>
