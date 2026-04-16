<!-- 图标库说明 -->
<template>
  <div>
    <aFloatButton type="primary" icon="plus" @click="modalOpen = true">
      <template #icon>
        <GIcon class="p-[0] hover:bg-transparent" :name="ICONIFY_ICONS.font" />
      </template>
    </aFloatButton>
    <a-modal v-model:open="modalOpen" title="图标库(点击复制)" width="80vw" :footer="null">
      <div class="flex flex-wrap items-start max-h-[60vh] overflow-auto">
        <span
          v-for="(icon, key) in ICONIFY_ICONS"
          :key="key"
          class="w-[80px] text-center p-1.5 hover:bg-gray-100 cursor-pointer rounded-md"
          @click="copy(icon)"
        >
          <GIcon :name="icon" :size="24" />
          <span class="w-full inline-block whitespace-nowrap text-ellipsis overflow-hidden">
            {{ key }}
          </span>
        </span>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ICONIFY_ICONS } from '@/icons'
import { GIcon } from '@/components'
import { Modal as aModal, FloatButton as aFloatButton, message } from 'ant-design-vue'
import { useClipboard } from '@vueuse/core'

defineOptions({
  name: 'IconsLibrary',
})

// const text = ref('') // 要复制的内容
const { copy, copied } = useClipboard({
  // source: text,
  legacy: true, // 低版本浏览器降级
})

watch(copied, (newVal) => {
  if (newVal) {
    message.success('复制成功')
  }
})

const modalOpen = ref(false)
</script>
