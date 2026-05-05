import type { CanvasLayout } from '@/types'

/**
 * 创建布局
 * @param parentId 父布局ID
 * @returns 布局对象
 */
export function createLayout(parentId: string): CanvasLayout {
  return {
    id: '',
    parentId,
    name: '',
    direction: undefined,
    children: [],
    editable: false,
    props: {
      padding: [0, 0, 0, 0],
      widthType: '%',
      widthValue: 100,
      heightType: 'px',
      heightValue: 80,
      gap: 12,
      backgroundColor: '#fff',
      isForm: false,
    },
  }
}
