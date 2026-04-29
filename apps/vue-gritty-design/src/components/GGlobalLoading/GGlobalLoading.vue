<!-- 全局loading -->
<template>
  <Transition>
    <div
      v-show="requestLoading"
      class="global-loading flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black/10 z-10000 opacity-100 transition-opacity duration-500 ease-in-out"
      :class="{ '!opacity-0': !requestLoading }"
      xx
    >
      <GIcon :name="ICONIFY_ICONS.loading" size="26" />
      <Transition>
        <div
          v-if="requestLoadingList.length > 0"
          class="global-loading-list absolute bottom-10 left-10 rounded-md bg-white/95 p-2 text-[12px] w-[245px] text-gray-500 transition-opacity duration-500 ease-in-out"
        >
          <div
            v-for="item in requestLoadingList"
            :key="item.url"
            class="request-item flex items-center"
          >
            <GIcon :name="ICONIFY_ICONS.loading" size="8" />
            <span>{{ item.url }}</span>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ICONIFY_ICONS } from '@/icons'
import { useLoading } from '@/composables/useLoading'

const { requestLoading, requestLoadingList } = useLoading()
</script>
