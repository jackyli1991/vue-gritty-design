<template>
  <div class="element-attrs">
    <!-- 普通表格列 -->
    <ColumnAttrs v-if="isTableColumn" />
    <!-- 表格操作按钮 -->
    <ActionBtnAttrs v-else-if="isActionBtn" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDesignContext } from '@/composables/useDesignContext'
import { ColumnType } from '@/types'
import ColumnAttrs from './ColumnAttrs.vue'
import ActionBtnAttrs from './ActionBtnAttrs.vue'

const { activeCanvasElement } = useDesignContext()

// 是否是表格列
const isTableColumn = computed(() => {
  return [ColumnType.Column, ColumnType.Action].includes(activeCanvasElement.value?.type as ColumnType)
})



// 是否是表格操作列
const isActionBtn = computed(() => {
  return activeCanvasElement.value?.type === ColumnType.ActionBtn
})



defineOptions({
  name: 'ElementAttrs',
})
</script>
