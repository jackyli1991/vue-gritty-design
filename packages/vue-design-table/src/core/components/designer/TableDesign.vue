<template>
  <div class="table-main-container">
    <aTable
      :scroll="{
        x: 'auto',
      }"
      :row-selection="rowSelection"
      :columns="tableColumns"
      :dataSource="tableMockData">
      <!-- 表头 -->
      <template #headerCell="{ title, column }">
        <span>{{ title }}</span>
        <span
          class="table-header-edit-icons"
          :class="{
            active: activeCanvasElement?.id === column.key
          }"
          @click.stop>
          <IconifyIcon icon="material-symbols:select-check-box-rounded" :size="20" @click="handleHeaderCellClick('select', title, column)"/>
          <IconifyIcon icon="material-symbols:delete" :size="20" danger @click="handleHeaderCellClick('delete', title, column)"/>
        </span>
      </template>
      <!-- 表格内容 -->
      <template #bodyCell="{ column, index }">
        <template v-if="column.columnType === ColumnType.Index">
          {{ index + 1 }}
        </template>
        <template v-if="column.columnType === ColumnType.Action">
          <aButton
            v-for="item in actionBtns"
            :key="item.id"
            size="small"
            class="table-action-btn"
            @click.stop="handleActionBtnClick(item)">
            {{ item.props.title }}
            <!-- <IconifyIcon :icon="item.icon" :size="20" /> -->
          </aButton>
        </template>
      </template>
    </aTable>
  </div>
</template>

<script setup lang="ts">
import type { TableColumnType } from 'ant-design-vue'
import { computed, h } from 'vue'
import { ColumnType } from '@/types'
import type { CanvasElement } from '@/types'
import { Table as aTable, Button as aButton } from 'ant-design-vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import { useDesignContext } from '@/composables/useDesignContext'
import { useConfirmModal } from '@/composables/useConfirmModal'

const { openModal } = useConfirmModal()

const { getTableElements, activeCanvasElement, selectCanvasElement, deleteCanvasElement } = useDesignContext()

defineOptions({
  name: 'TableDesign',
})

const selectionColumns = [ColumnType.Checkbox, ColumnType.Radio] // 选择列类型
const excludeColumns = [ColumnType.ActionBtn, ColumnType.Pagination] // 排除的其他类型

// 表格列配置
const tableColumns = computed<TableColumnType[]>((): TableColumnType[] => {
  // 1、过滤出需要显示的列
  let list = getTableElements().filter((item) => !selectionColumns.includes(item.type as ColumnType) && !excludeColumns.includes(item.type as ColumnType))
  // 2、排序，序号列固定在最前面，操作列固定在最后面，其他普通列按sort字段排序
  list.sort((a, b) => {
    if (a.type === ColumnType.Index) {
      return -1
    }
    if (b.type === ColumnType.Index) {
      return 1
    }
    if (a.type === ColumnType.Action) {
      return 1
    }
    if (b.type === ColumnType.Action) {
      return -1
    }
    return 0
  })
  // 3、处理字段
  list = list.map((item) => {
      const { filterable, filterMultiple, filterMode, filters, filterIcon, ...rest } = item.props
      let column = {
        ...rest,
        key: item.id,
        columnType: item.type
      }
      if (filterable) {
        column = {
          ...column,
          filterMultiple,
          filterMode,
          filters
        }
        if (filterIcon) {
          column.filterIcon = h(IconifyIcon, { icon: filterIcon })
        }
      }
      console.log(column)
      return column
    })
  return list as TableColumnType[]
})

// 表格模拟数据
const tableMockData = computed(() => {
  return getTableElements().map((item) => ({
    [item.id]: item.name,
    name: 'xxx',
    age: 23
  }))
})

// 表格行选择配置：单选、多选
const rowSelection = computed(() => {
  const hasSelection = getTableElements().find((item) =>
    selectionColumns.includes(item.type as ColumnType),
  )
  if (!hasSelection) {
    return undefined
  }
  const type = hasSelection.type
  const { width } = hasSelection.props as TableColumnType
  return {
    type,
    columnWidth: width,
  }
})

// 表格操作按钮
const actionBtns = computed(() => {
  return getTableElements().filter((item) => item.type === ColumnType.ActionBtn)
})

// 处理表头单元格点击事件
const handleHeaderCellClick = (type: string, title: string, column: TableColumnType) => {
  console.log('表头', column)
  const id = column.key as string
  if (type === 'select') {
    selectCanvasElement(id)
  } else if (type === 'delete') {
    openModal({
      title: '删除',
      content: `确认删除列【${title}】吗？`
    }, () => {
      deleteCanvasElement(id)
    })
  }
}

// 处理操作按钮单元格点击事件
const handleActionBtnClick = (column: CanvasElement) => {
  console.log('操作按钮', column)
  const id = column.id as string
  selectCanvasElement(id)
}
</script>

<style scoped lang="scss">
.table-main-container {
  width: 100%;
  height: 100%;
  :deep(.ant-table-cell) {
    .ant-table-cell {
      position: relative;
    }
  }
  .table-header-edit-icons {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 4px 0;
    border-radius: 4px;
    position: absolute;
    left: 10%;
    bottom: 5px;
    width: 80%;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    opacity: 0;
    transition: all 0.2s;
    &:hover {
      opacity: .8;
    }
    &.active {
      opacity: .8;
    }
  }
}
</style>
