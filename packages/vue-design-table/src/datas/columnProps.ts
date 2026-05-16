import type { ColumnProps } from '@/types'

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

// 表格过滤相关属性
export const columnFilterProps = {
  filterable: false,
  filterMultiple: false,
  filterMode: 'menu',
  filters: [],
  filterIcon: undefined,
}

/**
 * 创建表格列属性
 * @param props 列属性
 * @param enableFilter 是否启用过滤
 * @returns 表格列属性
 */
export function createColumnProps(
  props: Record<string, unknown> = {},
  enableFilter: boolean = false,
) {
  let columnProps = {
    ...columnCommonProps,
    ...props,
  }
  if (enableFilter) {
    columnProps = {
      ...columnProps,
      ...columnFilterProps,
    } as ColumnProps
  }
  return columnProps
}
