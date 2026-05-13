<template>
  <div class="table-main-container">
    <aTable :columns="tableColumns" :dataSource="tableMockData" />
  </div>
</template>

<script setup lang="ts">
import type { TableColumnType } from 'ant-design-vue'
import { computed } from 'vue'
import { Table as aTable } from 'ant-design-vue'
import { useDesignContext } from '@/composables/useDesignContext'

const { getTableElements } = useDesignContext()

defineOptions({
  name: 'TableDesign',
})

// 表格列配置
const tableColumns = computed<TableColumnType[]>(() => {
  const list = getTableElements()
  return list.map((item) => ({
    title: item.name,
    dataIndex: item.id,
    key: item.id,
  }))
})

// 表格模拟数据
const tableMockData = computed(() => {
  return getTableElements().map((item) => ({
    [item.id]: item.name,
  }))
})
</script>

<style scoped lang="scss">
.table-main-container {
  width: 100%;
  height: 100%;
}
</style>
