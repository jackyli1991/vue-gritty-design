import { Position, Option } from '@/types'
import { useDesignContext } from '@/composables/useDesignContext'

export function useToolbarAction() {
  const { deleteLayout, addLayout, deleteElement, activeCanvasLayout, activeCanvasElement } =
    useDesignContext()

  // 处理布局工具栏操作
  function handleLayoutToolbarAction(item: Option) {
    const action = item.value as Position | 'delete'
    const _id = activeCanvasLayout.value?.id as string
    if (action === 'delete') {
      // 删除布局
      deleteLayout(_id)
    } else {
      // 添加布局
      addLayout(_id, action as Position)
    }
  }

  // 处理元素工具栏操作
  function handleElementToolbarAction(item: Option) {
    console.log('元素操作', item)
    const _id = activeCanvasElement.value?.id as string
    // if (action === 'delete') {
    //   // 删除布局
    deleteElement(_id)
    // } else {
    //   // 添加布局
    //   addLayout(_id, action as Position)
    // }
  }

  return {
    handleLayoutToolbarAction,
    handleElementToolbarAction,
  }
}
