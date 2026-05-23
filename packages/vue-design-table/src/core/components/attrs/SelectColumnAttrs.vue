<template>
  <AttrWrapper title="基础" :componentName="activeCanvasElement?.name">
    <SelectColumnForm :form-data="formData" :cols="1" />
  </AttrWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ColumnProps } from '@/types'
import AttrWrapper from '@/components/AttrWrapper.vue'
import SelectColumnForm from '@/core/components/form/SelectColumnForm.vue'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'SelectColumnAttrs',
})

const { activeCanvasElement } = useDesignContext()

const formData = computed<ColumnProps>(() => {
  return (activeCanvasElement.value?.props || {}) as ColumnProps
})
</script>
