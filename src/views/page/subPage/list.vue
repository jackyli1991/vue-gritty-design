<template>
  <div>
    <h1>list1中转站1</h1>
    <Button @click="handleClick">跳转</Button>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router'
  import { Button } from 'ant-design-vue'

  const handleClick = () => {
    router.push({
      path: '/page/subPage/list/23/detail',
    })
  }
</script>

<script lang="ts">
export const btnPermission = {
  add: 101,
}
</script>
