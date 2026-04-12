<template>
  <div class="layout-header flex items-center bg-white pl-5" :style="{ height: `${headerHeight}px` }">
    <GIcon
      class="mr-5 cursor-pointer transition-transform duration-300"
      :class="{
        'rotate-180': collapsed
      }"
      name="solar:double-alt-arrow-left-linear"
      @click="toggleCollapsed"
      />
    <aBreadcrumb>
      <aBreadcrumbItem>首页</aBreadcrumbItem>
      <aBreadcrumbItem>列表</aBreadcrumbItem>
      <aBreadcrumbItem>详情</aBreadcrumbItem>
    </aBreadcrumb>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  Breadcrumb as aBreadcrumb,
  BreadcrumbItem as aBreadcrumbItem,
} from 'ant-design-vue'

import { useLayoutStore } from '@/stores/layout'

import { GIcon } from '@/components'

defineOptions({
  name: 'LayoutHeader',
})

const layoutStore = useLayoutStore()
const { collapsed, headerHeight } = storeToRefs(layoutStore)
const { toggleCollapsed } = layoutStore // 切换折叠状态
</script>

<style lang="scss" scoped></style>
