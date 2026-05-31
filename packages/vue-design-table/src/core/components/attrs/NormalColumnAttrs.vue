<template>
  <AttrWrapper title="基础">
    <ColumnForm :formData="formData" :cols="1" />
  </AttrWrapper>
  <AttrWrapper title="列筛选" v-if="formData.filterable !== undefined">
    <ColumnFilterForm :formData="formData" :cols="1" />
  </AttrWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { ColumnProps } from '@/types'
import AttrWrapper from '@/components/AttrWrapper.vue'
import { useDesignContext } from '@/composables/useDesignContext'
import ColumnForm from '@/core/components/form/ColumnForm.vue'
import ColumnFilterForm from '@/core/components/form/ColumnFilterForm.vue'

defineOptions({
  name: 'NormalColumnAttrs',
})

// export interface NormalColumnAttrsProps {
//   disabled?: boolean // 是否禁用
// }
// defineProps<NormalColumnAttrsProps>()

const { activeCanvasElement } = useDesignContext()

const formData = computed(() => (activeCanvasElement.value?.props || {}) as ColumnProps)
</script>
