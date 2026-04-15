<template>
  <div
    class="layout-header flex items-center justify-between bg-white pl-5 pr-5 dark:bg-black-500"
    :style="{ height: `${headerHeight}px` }"
  >
    <!-- 左侧折叠按钮、面包屑导航 -->
    <div class="flex items-center">
      <ExpandBtn class="mr-2.5" />
      <aBreadcrumb>
        <aBreadcrumbItem>首页</aBreadcrumbItem>
        <aBreadcrumbItem>列表</aBreadcrumbItem>
        <aBreadcrumbItem>详情</aBreadcrumbItem>
      </aBreadcrumb>
    </div>
    <!-- 右侧用户信息、常用设置栏 -->
    <div class="flex items-center">
      <div class="layout-header-setting flex items-start justify-center">
        <DarkModeIcon />
        <GIcon class="mr-2.5" :name="ICONIFY_ICONS.language" />
        <SettingIcon />
        <GIcon class="mr-2.5" :name="ICONIFY_ICONS.fullScreen" />
        <ThemeIcon />
        <GIcon class="mr-2.5" :name="ICONIFY_ICONS.notice" />
      </div>
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Breadcrumb as aBreadcrumb, BreadcrumbItem as aBreadcrumbItem } from 'ant-design-vue'
import ExpandBtn from './components/ExpandBtn.vue' // 折叠按钮
import DarkModeIcon from './components/DarkModeIcon.vue' // 暗黑模式图标
import ThemeIcon from './components/ThemeIcon.vue' // 主题切换图标
import SettingIcon from './components/SettingIcon.vue' // 常用设置图标
import UserInfo from './components/UserInfo.vue' // 用户信息
import { ICONIFY_ICONS } from '@/icons'
import { useLayoutStore } from '@/stores/layout'

import { GIcon } from '@/components'

defineOptions({
  name: 'LayoutHeader',
})

const layoutStore = useLayoutStore()
const { headerHeight } = storeToRefs(layoutStore)
</script>

<style lang="scss" scoped></style>
