import type { ColumnProps } from '@/types'
import { FilterMode, FiltersSource } from '@/types'

// 列通用属性
export const columnCommonProps: ColumnProps = {
  title: '列标题',
  width: 150,
  maxWidth: 200,
  minWidth: 50,
  align: 'left',
  dataIndex: '',
  resizable: true,
  fixed: false,
}

// 表格筛选相关属性
export const columnFilterProps = {
  filterable: false,
  filterMultiple: false,
  filterMode: FilterMode.Menu,
  filters: [],
  filtersSource: FiltersSource.Static,
  filterIcon: undefined,
}

// 表格排序相关
export const columnSorterProps = {
  sortable: false,
}

/**
 * 创建表格列属性
 * @param props 列额外属性
 * @param config 列属性添加控制
 * @returns 表格列属性
 */
export function createColumnProps(
  props: Record<string, unknown> = {},
  config: {
    enableFilter: boolean // 是否启用列筛选
    enableSorter: boolean // 是否启用列排序
  } = {
    enableFilter: false,
    enableSorter: false,
  },
) {
  let columnProps = {
    ...columnCommonProps,
    ...props,
  }
  if (config.enableFilter) {
    columnProps = {
      ...columnProps,
      ...columnFilterProps,
    }
  }
  if (config.enableSorter) {
    columnProps = {
      ...columnProps,
      ...columnSorterProps,
    }
  }
  return columnProps as ColumnProps
}
