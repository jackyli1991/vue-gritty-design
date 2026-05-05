import type { CanvasLayout } from '@/types'

/**
 * 创建布局
 * @param id 布局ID
 * @param parentId 父布局ID
 * @param name 布局名称
 * @returns 布局对象
 */
export function createLayout(id: string, parentId: string, name: string): CanvasLayout {
  return {
    id,
    parentId,
    name,
    direction: undefined,
    children: [],
    editable: false,
    props: {
      padding: [0, 0, 0, 0],
      widthType: '%',
      widthValue: 100,
      heightType: '%',
      heightValue: 50,
      gap: 12,
      backgroundColor: '#f5f5f5',
      isForm: false,
    },
  }
}
