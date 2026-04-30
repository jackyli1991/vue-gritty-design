<template>
  <GPage>
    <aRow :gutter="8">
      <aCol :span="12">
        <aCard>
          <template #title>
            <span>组件loading</span>
          </template>
          <GLoading :show="loading">
            <aButton @click="endLoading">结束loading</aButton>
          </GLoading>
          <aButton type="primary" @click="startLoading">开始loading</aButton>
        </aCard>
      </aCol>
      <aCol :span="12">
        <aCard>
          <template #title>
            <aBadge :count="totalIcons">
              <span>Iconfiny字体图标</span>
            </aBadge>
          </template>
          <aCardGrid
            v-for="icon in icons"
            :key="icon"
            style="width: 10%; text-align: center; padding: 8px 0; font-size: 0"
          >
            <GIcon :name="icon" :size="24" />
          </aCardGrid>
        </aCard>
      </aCol>
    </aRow>
  </GPage>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Row as aRow,
  Col as aCol,
  Button as aButton,
  Badge as aBadge,
  Card as aCard,
  CardGrid as aCardGrid,
} from 'ant-design-vue'
import { useLoading } from '@/composables/useLoading'
import { ICONIFY_ICONS } from '@/icons'

const { loading, startLoading, endLoading } = useLoading()

// 截取前19个图标
const icons = computed(() => {
  const values = Object.values(ICONIFY_ICONS)
  return values.slice(0, 19)
})

// 图标总数
const totalIcons = computed(() => {
  return Object.keys(ICONIFY_ICONS).length
})
</script>
