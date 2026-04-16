<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
import type { RouteRecordRaw } from 'vue-router'

// 自定义路由元信息（会被自动路由读取）
export const routeMeta: RouteRecordRaw['meta'] = {
  title: '工作台',
  icon: 'user',
  requiresAuth: true, // 需要登录
}
</script>
