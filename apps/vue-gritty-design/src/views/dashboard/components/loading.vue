<template>
  <aCard>
    <template #title>
      <span>Loading</span>
    </template>
    <GLoading :show="loading">
      <aButton @click="endLoading">结束loading</aButton>
    </GLoading>
    <aButton class="mr-2" type="primary" @click="startLoading">组件loading</aButton>
    <aButton type="primary" @click="handleGlobalLoading">请求loading</aButton>
  </aCard>
</template>

<script setup lang="ts">
import {
  Card as aCard,
  Button as aButton,
  message,
} from 'ant-design-vue'
import { useLoading } from '@/composables'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const { loading, startLoading, endLoading } = useLoading()

// 全局loading
const handleGlobalLoading = () => {
  message.info('发送请求：获取用户信息')
  userStore.getUserInfo()
}
</script>
