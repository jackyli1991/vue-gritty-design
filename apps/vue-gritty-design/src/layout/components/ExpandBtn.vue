<!-- 折叠按钮组件 -->
<template>
  <GIcon
    :class="{
      'rotate-180': collapsed,
    }"
    :name="ICONIFY_ICONS.doubleArrowLeft"
    @click="toggleCollapsed"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ICONIFY_ICONS } from '@/icons'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
const { collapsed } = storeToRefs(layoutStore)
const { toggleCollapsed } = layoutStore // 切换折叠状态
</script>
