<template>
  <div
    class="layout-header flex items-center justify-between bg-white pl-5 pr-5"
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
        <span class="flex flex-col relative mr-2.5 overflow-hidden">
          <GIcon :name="ICONIFY_ICONS.placeholder" />
          <GIcon class="absolute top-0 left-0" :name="ICONIFY_ICONS.sun" />
          <GIcon class="absolute left-0 top-full" :name="ICONIFY_ICONS.moon" />
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

defineOptions({
  name: 'LayoutHeader',
})

const layoutStore = useLayoutStore()
const { collapsed, headerHeight } = storeToRefs(layoutStore)
const { toggleCollapsed } = layoutStore // 切换折叠状态

const userStore = useUserStore()
const { userName, avatar } = storeToRefs(userStore)
</script>

<style lang="scss" scoped></style>
