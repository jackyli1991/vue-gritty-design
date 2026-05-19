<template>
  <div class="element-attrs">
    <!-- 普通表格列、索引列、操作列 -->
    <NormalColumnAttrs v-if="isNormalColumn || isActionColumn">
      <!-- 操作列所有按钮显示在操作列属性面板 -->
      <ActionColumnBtns v-if="isActionColumn"></ActionColumnBtns>
    </NormalColumnAttrs>
    <!-- 表格操作按钮 -->
    <ActionBtnAttrs v-else-if="isActionBtn" />
    <!-- 表格选择列：单选列、复选列 -->
    <SelectColumnAttrs v-else-if="isSelectColumn" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDesignContext } from '@/composables/useDesignContext'
import { ColumnType } from '@/types'
import NormalColumnAttrs from './NormalColumnAttrs.vue'
import SelectColumnAttrs from './SelectColumnAttrs.vue'
import ActionBtnAttrs from './ActionBtnAttrs.vue'
import ActionColumnBtns from './ActionBtns/ActionColumnBtns.vue'

const { activeCanvasElement } = useDesignContext()

// 是否是普通表格列、索引列、操作列
const isNormalColumn = computed(() => {
  return [ColumnType.Column, ColumnType.Index].includes(
    activeCanvasElement.value?.type as ColumnType,
  )
})

// 操作列
const isActionColumn = computed(() => {
  return [ColumnType.Action].includes(activeCanvasElement.value?.type as ColumnType)
})

// 是否是表格操作按钮
const isActionBtn = computed(() => {
  return activeCanvasElement.value?.type === ColumnType.ActionBtn
})

// 是否是表格选择列：单选列、复选列
const isSelectColumn = computed(() => {
  return [ColumnType.Radio, ColumnType.Checkbox].includes(
    activeCanvasElement.value?.type as ColumnType,
  )
})

defineOptions({
  name: 'ElementAttrs',
})
</script>
