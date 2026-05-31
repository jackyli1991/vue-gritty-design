import type { CanvasLayout } from '@/types'
import { Position, Option } from '@/types'
import { useDesignContext } from '@/composables/useDesignContext'
import { useConfirmModal } from '@/composables/useConfirmModal'
import { elementOperateOptions, layoutOperateOptions } from '@/datas'
import { excludeOption } from '@/utils'

export function useToolbarAction() {
  const { deleteLayout, addLayout, deleteElement, activeCanvasLayout, activeCanvasElement } =
    useDesignContext()
  const { openModal } = useConfirmModal()

  /**
   * 获取布局操作选项
   * @description 获取指定画布布局的操作选项
   * @param layoutId 布局
   * @returns 布局操作选项列表
   */
  function getLayoutToolbar(layout: CanvasLayout) {
    if (!layout) return []
    const canDelete = layout?.deleteAllowed === true
    if (canDelete) return layoutOperateOptions
    else return excludeOption(layoutOperateOptions, 'delete')
  }

  // 获取元素工具栏
  function getElementToolbar() {
    return elementOperateOptions
  }

  // 处理布局工具栏操作
  function handleLayoutToolbarAction(item: Option) {
    console.log('布局操作', item)
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
    const _name = activeCanvasElement.value?.name as string
    openModal(
      {
        title: '删除',
        content: `确认删除列【${_name}】吗？`,
      },
      () => {
        deleteElement(_id)
      },
    )
  }

  return {
    getLayoutToolbar,
    getElementToolbar,
    handleLayoutToolbarAction,
    handleElementToolbarAction,
  }
}
