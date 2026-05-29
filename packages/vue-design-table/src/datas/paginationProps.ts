import { PaginationProps } from '@/types'

export const paginationProps: PaginationProps = {
  enabled: true,
  position: ['bottomRight'],
  defaultPageSize: 10,
  hideOnSinglePage: false,
  pageSizeOptions: [10, 20, 50, 100],
  showQuickJumper: true,
  showSizeChanger: true,
  showLessItems: false,
  simple: false,
  size: 'small',
}

/**
 * 创建分页组件属性
 * @param props 自定义分页组件属性
 * @returns 分页组件属性
 */
export function createPaginationProps(props: Record<string, unknown> = {}) {
  return {
    ...paginationProps,
    ...props,
  }
}
