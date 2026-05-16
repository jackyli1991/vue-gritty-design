<template>
  <div class="table-main-container">
    <aTable :row-selection="rowSelection" :columns="tableColumns" :dataSource="tableMockData" />
  </div>
</template>

<script setup lang="ts">
import type { TableColumnType } from 'ant-design-vue'
import { computed } from 'vue'
import { ColumnType } from '@/types'
import { Table as aTable } from 'ant-design-vue'
import { useDesignContext } from '@/composables/useDesignContext'

const { getTableElements } = useDesignContext()

defineOptions({
  name: 'TableDesign',
})

// 排除的列类型
const excludeColumns = [ColumnType.Checkbox, ColumnType.Radio]

// 表格列配置
const tableColumns = computed<TableColumnType[]>((): TableColumnType[] => {
  const list = getTableElements()
  return list
    .filter((item) => !excludeColumns.includes(item.type as ColumnType))
    .map((item) => {
      const { title, dataIndex, width } = item.props as TableColumnType
      const column: TableColumnType = {
        title,
        dataIndex,
        width,
      }
      return column
    }) as TableColumnType[]
})

// 表格模拟数据
const tableMockData = computed(() => {
  return getTableElements().map((item) => ({
    [item.id]: item.name,
  }))
})

// 表格行选择配置
const rowSelection = computed(() => {
  const hasSelection = getTableElements().find((item) =>
    excludeColumns.includes(item.type as ColumnType),
  )
  if (!hasSelection) {
    return undefined
  }
  const type = hasSelection.type
  return {
    type,
  }
})
</script>

<style scoped lang="scss">
.table-main-container {
  width: 100%;
  height: 100%;
}
</style>
