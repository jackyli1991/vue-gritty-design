<template>
  <GProgressBar />
  <GLoading :show="requestLoading" :text="requestLoadingText" />
  <RouterView />
  <Introduce />
</template>

<script setup lang="ts">
import Introduce from '@/views/introduce/index.vue'
import { useRequestLoading } from '@/composables/useLoading'

// 全局请求loading
const { requestLoading, requestLoadingText } = useRequestLoading()
</script>

<style lang="scss" scoped></style>
