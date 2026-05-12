import { Position } from '@/types'
import { useDesignContext } from '@/composables/useDesignContext'

export function useToolbarAction() {
  const { deleteLayout, addLayout, activeCanvasLayout } = useDesignContext()

  // 处理布局工具栏操作
  function handleLayoutToolbarAction(action: string) {
    const _id = activeCanvasLayout.value?.id as string
    if (action === 'delete') {
      // 删除布局
      deleteLayout(_id)
    } else {
      // 添加布局
      addLayout(_id, action as Position)
    }
  }

  return {
    handleLayoutToolbarAction,
  }
}
