<template>
  <aCard>
    <template #title>
      <aBadge :count="totalIcons">
        <span>Iconfiny字体图标</span>
      </aBadge>
    </template>
    <aCard :class="`max-h-[${maxHeight}px] overflow-auto`">
      <aCardGrid
        v-for="(icon, key) in ICONIFY_ICONS"
        :key="icon"
        style="width: 10%; text-align: center; padding: 8px 0; font-size: 0"
        @click="copy(key)"
      >
        <div class="flex flex-col items-center cursor-pointer">
          <GIcon :name="icon" :size="24" />
          <span v-if="showTitle" class="text-[12px] text-[#999]">{{ key }}</span>
        </div>
      </aCardGrid>
    </aCard>
  </aCard>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import {
  Card as aCard,
  CardGrid as aCardGrid,
  Badge as aBadge,
  message,
} from 'ant-design-vue'
import { ICONIFY_ICONS } from '@/icons'
import { useClipboard } from '@vueuse/core'

defineProps({
  showTitle: {
    type: Boolean,
    default: false,
  },
  maxHeight: {
    type: Number,
    default: 200,
  },
})

// 图标总数
const totalIcons = computed(() => {
  return Object.keys(ICONIFY_ICONS).length
})

// 复制图标名称
const { copy, copied } = useClipboard({
  // source: text,
  legacy: true, // 低版本浏览器降级
})

watch(copied, (newVal) => {
  if (newVal) {
    message.success('复制成功')
  }
})
</script>
