<!-- 图标库说明 -->
<template>
  <div>
    <aFloatButton
      type="primary"
      icon="plus"
      @click="modalOpen = true"
    >
      <template #icon>
        <GIcon class="p-[0] hover:bg-transparent" :name="ICONIFY_ICONS.font" />
      </template>
    </aFloatButton>
    <a-modal
      v-model:open="modalOpen"
      title="图标库(点击复制)"
      width="80vw"
      :footer="null">
      <div class="flex flex-wrap items-start max-h-[60vh] overflow-auto">
      <span
        v-for="(icon, key) in ICONIFY_ICONS"
        :key="key"
        class="w-[80px] text-center p-1.5 hover:bg-gray-100 cursor-pointer rounded-md"
      >
        <GIcon :name="icon" :size="24"/>
        <span class="w-full inline-block whitespace-nowrap text-ellipsis overflow-hidden">
          {{ key }}
        </span>
      </span>
    </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ICONIFY_ICONS } from '@/icons'
import { GIcon } from '@/components'
import { Modal as aModal, FloatButton as aFloatButton } from 'ant-design-vue'

defineOptions({
  name: 'IconsLibrary',
})

const modalOpen = ref(false)
</script>
