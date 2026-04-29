<template>
  <GProgressBar />
  <GLoading :show="requestLoading"/>
  <RouterView />
  <Introduce />
</template>

<script setup lang="ts">
import Introduce from '@/views/introduce/index.vue'
import { useRequestLoading } from '@/composables/useLoading'

// 全局请求loading
const { requestLoading } = useRequestLoading()
</script>

<style lang="scss" scoped></style>
