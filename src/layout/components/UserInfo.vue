<!-- header栏 用户信息组件 -->
<template>
  <aAvatar :src="avatar" :size="30" />
  <span class="pl-2.5">{{ userName }}</span>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Avatar as aAvatar } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { userName, avatar } = storeToRefs(userStore)
</script>
