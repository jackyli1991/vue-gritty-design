<!-- 图标库说明 -->
<template>
  <div>
    <h3 class="font-bold border-b border-gray-300 pb-2 mb-2">图标库</h3>
    <div class="flex flex-wrap">
      <span
        v-for="(icon, key) in ICONIFY_ICONS"
        :key="key"
        class="w-1/5 text-center p-1.5 hover:bg-gray-100 cursor-pointer rounded-md"
      >
        <GIcon :name="icon" />
        <span class="w-full inline-block whitespace-nowrap text-ellipsis overflow-hidden">
          {{ key }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICONIFY_ICONS } from '@/icons'
import { GIcon } from '@/components'

defineOptions({
  name: 'IconsLibrary',
})
</script>
