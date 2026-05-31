<template>
  <AttrWrapper title="分页">
    <PaginationForm :formData="formData" :cols="2" />
  </AttrWrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { PaginationProps } from '@/types'
import PaginationForm from '@/core/components/form/PaginationForm.vue'
import { useDesignContext } from '@/composables/useDesignContext'
import AttrWrapper from '@/components/AttrWrapper.vue'

defineOptions({
  name: 'PaginationAttrs',
})

const { activeCanvasElement } = useDesignContext()

const formData = computed(() => (activeCanvasElement.value?.props || {}) as PaginationProps)
</script>
