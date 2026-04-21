<template>
  <GPage>
    <h1>隐藏路由页面</h1>
    <h1>路由参数：{{ params }}</h1>
  </GPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const params = ref(route.params)
</script>
