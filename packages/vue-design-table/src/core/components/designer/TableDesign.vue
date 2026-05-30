<template>
  <div class="table-main-container" @click.stop="handleSelectTableLayout">
    <aTable
      :scroll="{
        x: 'auto',
      }"
      :row-selection="rowSelection"
      :columns="tableColumns"
      :dataSource="tableMockData"
      :pagination="paginationConfig"
      @change="handleTableChange"
    >
      <!-- 表头 -->
      <template #headerCell="{ title, column }">
        <div
          class="table-header-title-wrapper"
          @click.stop="handleHeaderCellClick('select', title, column)"
        >
          <span>{{ title }}</span>
          <aTooltip v-if="(column as ColumnProps).tip">
            <IconifyIcon icon="material-symbols:info" :size="20" />
            <template #title>
              <div :style="{ whiteSpace: 'pre-line' }">{{ (column as ColumnProps)?.tip }}</div>
            </template>
          </aTooltip>
          <span
            class="table-header-edit-icons"
            :class="{
              active: activeCanvasElement?.id === column.key,
            }"
          >
            <IconifyIcon icon="material-symbols:select-check-box-rounded" :size="20" />
            <IconifyIcon
              icon="material-symbols:delete"
              :size="20"
              danger
              @click.stop="handleHeaderCellClick('delete', title, column)"
            />
          </span>
        </div>
      </template>
      <!-- 表格内容 -->
      <template #bodyCell="{ column, index }">
        <template v-if="(column as NewTableColumnType)?.columnType === ColumnType.Index">
          {{ index + 1 }}
        </template>
        <!-- 操作按钮 -->
        <template v-if="(column as NewTableColumnType)?.columnType === ColumnType.Action">
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
                  {{ ((btn as CanvasElement).props as ButtonProps).content }}
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
                            {{ (item.props as ButtonProps).content || '' }}
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
import { ref, computed, h } from 'vue'
import { ColumnType } from '@/types'
import type {
  CanvasElement,
  ColumnProps,
  ActionBtnGroup,
  PaginationProps,
  ButtonProps,
} from '@/types'
import { isObject } from '@/utils'
import { Table as aTable, Dropdown as aDropdown, Tooltip as aTooltip } from 'ant-design-vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import ActionButton from '@/components/Button.vue'
import { useDesignContext } from '@/composables/useDesignContext'
import { useConfirmModal } from '@/composables/useConfirmModal'

interface NewTableColumnType extends TableColumnType {
  columnType: ColumnType
  btnGap?: number
}

defineOptions({
  name: 'TableDesign',
})

const props = defineProps<{
  layoutId: string
}>()

const { openModal } = useConfirmModal()

const {
  activeCanvasElement,
  actionBtnsList,
  selectLayout,
  getTableElements,
  selectElement,
  getElement,
  deleteElement,
} = useDesignContext()

const clickFlag = ref<string>('')
const selectionColumns = [ColumnType.Checkbox, ColumnType.Radio] // 选择列类型
const excludeColumns = [ColumnType.ActionBtn, ColumnType.Pagination] // 排除的其他类型

// 操作按钮组，根据actionBtnsList生成带按钮信息的数据
const actionBtnGroups = computed(() => {
  return actionBtnsList.value.map((item) => {
    if (isObject(item) && 'children' in (item as ActionBtnGroup)) {
      return {
        ...(item as ActionBtnGroup),
        children: (item as ActionBtnGroup).children.map(
          (child: string) => getElement(child as string) || ({} as CanvasElement),
        ),
      }
    }
    return getElement(item as string) || ({} as CanvasElement)
  })
})

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

// 分页配置
const paginationConfig = computed(() => {
  const hasPagination = getTableElements().find((item) => item.type === ColumnType.Pagination)
  if (!hasPagination) {
    return false
  }
  const { enabled, prePageText, nextPageText, totalText, ...rest } =
    hasPagination.props as PaginationProps
  if (!enabled) {
    return false
  }
  const pagination = {
    ...rest,
    total: 1000,
    showQuickJumper: rest.showQuickJumper
      ? {
          goButton: '前往',
        }
      : false,
  }
  // 自定义总页数文本
  if (totalText) {
    pagination.showTotal = (total) => totalText.replace('${total}', total.toString())
  }
  // 自定义上一页、下一页文本
  if (prePageText || nextPageText) {
    pagination.itemRender = ({ type, originalElement }) => {
      if (type === 'prev' && prePageText?.trim()) {
        return h('span', { style: { cursor: 'pointer', padding: '0 4px' } }, prePageText)
      }
      if (type === 'next' && nextPageText?.trim()) {
        return h('span', { style: { cursor: 'pointer', padding: '0 4px' } }, nextPageText)
      }
      return originalElement
    }
  }
  return pagination
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

// 处理表格点击事件
const handleSelectTableLayout = () => {
  if (clickFlag.value === 'paginate') {
    clickFlag.value = ''
    return
  }
  selectLayout(props.layoutId)
}

// 处理表格变化事件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleTableChange(...args: any[]) {
  // console.log('表格变化事件', args)
  const { action } = args[3] as { action: string }
  // 选中分页
  if (action === 'paginate') {
    const hasPagination = getTableElements().find((item) => item.type === ColumnType.Pagination)
    if (!hasPagination) return
    clickFlag.value = 'paginate'
    selectElement(hasPagination.id)
  }
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
  .table-header-title-wrapper {
    display: flex;
    flex-wrap: wrap;
    .table-header-edit-icons {
      display: flex;
      align-items: center;
      opacity: 0;
      transition: all 0.2s;
      gap: 6px;
      padding: 0 6px;
      &.active {
        opacity: 0.8;
      }
    }
    &:hover .table-header-edit-icons {
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
