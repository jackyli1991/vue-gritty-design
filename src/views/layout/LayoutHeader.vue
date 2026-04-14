<template>
  <div
    class="layout-header flex items-center justify-between bg-white pl-5 pr-5 dark:bg-black-500"
    :style="{ height: `${headerHeight}px` }"
  >
    <!-- 左侧折叠按钮、面包屑导航 -->
    <div class="flex items-center">
      <GIcon
        class="mr-5"
        :class="{
          'rotate-180': collapsed,
        }"
        :name="ICONIFY_ICONS.doubleArrowLeft"
        @click="toggleCollapsed"
      />
      <aBreadcrumb>
        <aBreadcrumbItem>首页</aBreadcrumbItem>
        <aBreadcrumbItem>列表</aBreadcrumbItem>
        <aBreadcrumbItem>详情</aBreadcrumbItem>
      </aBreadcrumb>
    </div>
    <!-- 右侧用户信息、常用设置栏 -->
    <div class="flex items-center">
      <div class="layout-header-setting flex items-start justify-center">
        <span class="relative mr-2.5 overflow-hidden" v-dark-mode="isDarkMode" @click="toggleDark">
          <!-- 占位图标，空白 -->
          <GIcon :name="ICONIFY_ICONS.placeholder" />
          <span
            class="flex flex-col absolute top-0 transition-all duration-300"
            :class="{
              '-translate-y-1/2': isDarkMode,
            }"
          >
            <GIcon :name="ICONIFY_ICONS.sun" />
            <GIcon :name="ICONIFY_ICONS.moon" />
          </span>
        </span>
        <GIcon class="mr-2.5" :name="ICONIFY_ICONS.language" />
        <GIcon class="mr-2.5" :name="ICONIFY_ICONS.setting" />
        <GIcon class="mr-2.5" :name="ICONIFY_ICONS.fullScreen" />
        <GIcon class="mr-2.5" :name="ICONIFY_ICONS.theme" />
        <GIcon class="mr-2.5" :name="ICONIFY_ICONS.notice" />
      </div>
      <aAvatar :src="avatar" :size="30" />
      <span class="pl-2.5">{{ userName }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  Breadcrumb as aBreadcrumb,
  BreadcrumbItem as aBreadcrumbItem,
  Avatar as aAvatar,
} from 'ant-design-vue'
import { ICONIFY_ICONS } from '@/icons'
import { useUserStore } from '@/stores/user'
import { useLayoutStore } from '@/stores/layout'

import { GIcon } from '@/components'
import { useDark } from '@vueuse/core'

const isDarkMode = useDark({
  storageKey: 'GRITTY_DESIGN_DARK_MODE', // 持久化存储键
  selector: 'body',
  // attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})

defineOptions({
  name: 'LayoutHeader',
})

//// 布局状态管理
const layoutStore = useLayoutStore()
const { collapsed, headerHeight } = storeToRefs(layoutStore)
const { toggleCollapsed } = layoutStore // 切换折叠状态、暗黑模式状态

// 用户信息
const userStore = useUserStore()
const { userName, avatar } = storeToRefs(userStore)

function toggleDark() {
  isDarkMode.value = !isDarkMode.value
}
</script>

<style lang="scss" scoped></style>
