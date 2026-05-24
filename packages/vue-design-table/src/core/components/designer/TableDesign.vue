<template>
  <div class="table-main-container">
    <aTable
      :scroll="{
        x: 'auto',
      }"
      :row-selection="rowSelection"
      :columns="tableColumns"
      :dataSource="tableMockData"
    >
      <!-- 表头 -->
      <template #headerCell="{ title, column }">
        <span>{{ title }}</span>
        <span
          class="table-header-edit-icons"
          :class="{
            active: activeCanvasElement?.id === column.key,
          }"
          @click.stop
        >
          <IconifyIcon
            icon="material-symbols:select-check-box-rounded"
            :size="20"
            @click="handleHeaderCellClick('select', title, column)"
          />
          <IconifyIcon
            icon="material-symbols:delete"
            :size="20"
            danger
            @click="handleHeaderCellClick('delete', title, column)"
          />
        </span>
      </template>
      <!-- 表格内容 -->
      <template #bodyCell="{ column, index }">
        <template v-if="(column as NewTableColumnType).columnType === ColumnType.Index">
          {{ index + 1 }}
        </template>
        <!-- 操作按钮 -->
        <template v-if="(column as NewTableColumnType).columnType === ColumnType.Action">
          <span class="action-column_btns-wrapper">
            <span class="action-column_btns">
              <template v-for="btn in actionBtnGroups" :key="btn.id">
                <!-- 单个按钮 -->
                <ActionButton
                  v-if="(btn as CanvasElement).type === ColumnType.ActionBtn"
                  v-bind="(btn as CanvasElement).props"
                  :style="{
                    'margin-right': (column as NewTableColumnType).btnGap + 'px',
                  }"
                  @click.stop="handleActionBtnClick(btn as CanvasElement)"
                >
                  {{ (btn as CanvasElement).props.content }}
                  <!-- <IconifyIcon :icon="btn.icon" :size="20" /> -->
                </ActionButton>
                <!-- 按钮组 -->
                <template v-else>
                  <aDropdown>
                    <ActionButton
                      v-bind="(btn as unknown as ActionBtnGroup).button"
                      :style="{
                        'margin-right': (column as NewTableColumnType).btnGap + 'px',
                      }"
                    >
                      {{ (btn as unknown as ActionBtnGroup).button.content }}
                    </ActionButton>
                    <template #overlay>
                      <ul v-if="'children' in btn" :style="{ backgroundColor: '#fff' }">
                        <li v-for="item in btn.children" :key="item.id">
                          <ActionButton
                            v-bind="item.props"
                            :style="{
                              'margin-bottom': (column as NewTableColumnType).btnGap + 'px',
                            }"
                            @click.stop="handleActionBtnClick(item as CanvasElement)"
                          >
                            {{ item.props.content }}
                          </ActionButton>
                        </li>
                      </ul>
                    </template>
                  </aDropdown>
                </template>
              </template>
            </span>
          </span>
        </template>
      </template>
    </aTable>
  </div>
</template>

<script setup lang="ts">
import type { TableColumnType } from 'ant-design-vue'
import { computed, h } from 'vue'
import { ColumnType } from '@/types'
import type { CanvasElement, ColumnProps, ActionBtnGroup } from '@/types'
import { Table as aTable, Dropdown as aDropdown } from 'ant-design-vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import ActionButton from '@/components/Button.vue'
import { useDesignContext } from '@/composables/useDesignContext'
import { useConfirmModal } from '@/composables/useConfirmModal'

interface NewTableColumnType extends TableColumnType {
  columnType: ColumnType
  btnGap?: number
}

const { openModal } = useConfirmModal()

const { activeCanvasElement, actionBtnGroups, getTableElements, selectElement, deleteElement } =
  useDesignContext()

defineOptions({
  name: 'TableDesign',
})

const selectionColumns = [ColumnType.Checkbox, ColumnType.Radio] // 选择列类型
const excludeColumns = [ColumnType.ActionBtn, ColumnType.Pagination] // 排除的其他类型

// 表格列配置
const tableColumns = computed<NewTableColumnType[]>((): NewTableColumnType[] => {
  // 1、过滤出需要显示的列
  const list = getTableElements().filter(
    (item) =>
      !selectionColumns.includes(item.type as ColumnType) &&
      !excludeColumns.includes(item.type as ColumnType),
  )
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
  return list.map((item) => {
    const { filterable, filterMultiple, filterMode, filters, filterIcon, ...rest } =
      item.props as ColumnProps
    let column: NewTableColumnType = {
      ...rest,
      key: item.id,
      columnType: item.type as ColumnType,
    } as unknown as NewTableColumnType
    if (filterable) {
      column = {
        ...column,
        filterMultiple,
        filterMode,
        filters,
      }
      if (filterIcon) {
        column.filterIcon = h(IconifyIcon, { icon: filterIcon })
      }
    }
    console.log(column)
    return column
  })
})

// 表格模拟数据
const tableMockData = computed(() => {
  return getTableElements().map((item) => ({
    [item.id]: item.name,
    name: 'xxx',
    age: 23,
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

// 处理表头单元格点击事件
const handleHeaderCellClick = (type: string, title: string, column: TableColumnType) => {
  console.log('表头', column)
  const id = column.key as string
  if (type === 'select') {
    selectElement(id)
  } else if (type === 'delete') {
    openModal(
      {
        title: '删除',
        content: `确认删除列【${title}】吗？`,
      },
      () => {
        deleteElement(id)
      },
    )
  }
}

// 处理操作按钮单元格点击事件
const handleActionBtnClick = (column: CanvasElement) => {
  console.log('操作按钮', column)
  const id = column.id as string
  selectElement(id)
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
      opacity: 0.8;
    }
    &.active {
      opacity: 0.8;
    }
  }
  .action-column_btns-wrapper {
    display: inline-block;
    .action-column_btns {
      display: flex;
      align-items: center;
    }
  }
}
</style>
