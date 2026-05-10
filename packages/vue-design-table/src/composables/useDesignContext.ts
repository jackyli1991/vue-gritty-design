import { storeToRefs } from 'pinia'
import { useDesignStore } from '@/stores'
import { useAddLayout } from '@/composables/useAddLayoutModal'
import { useDeleteConfirm } from '@/composables/useDeleteLayoutModal'
import { Position } from '@/types'

/**
 * 设计上下文
 * 将设计状态和操作暴露给组件，并且提供中间拦截操作，例如添加弹窗、删除确认、日志记录、操作历史等
 */
export function useDesignContext() {
  const store = useDesignStore()
  const { canvasData, activeCanvasElement, activeCanvasLayout, hoveredLayoutId } =
    storeToRefs(store)

  return {
    canvasData,
    activeCanvasElement,
    activeCanvasLayout,
    hoveredLayoutId,
    getLayout: store.getLayout,
    selectLayout: store.selectLayout,
    // 删除布局拦截，弹窗确认后删除布局
    deleteLayout: (layoutId: string) => {
      if (!layoutId) {
        return
      }
      const { openModal } = useDeleteConfirm(
        {
          title: '删除布局',
          content: '确定要删除该布局吗？',
          subContent: '该操作将同时删除所有子布局，且不可撤销。',
          confirmText: '确定',
          cancelText: '取消',
          layoutId // 要删除的布局ID
        },
        store.deleteLayout,
        (layoutId: string) => {
          console.log('删除布局取消', layoutId)
        }
      )
      openModal()
    },
    // 添加布局拦截，弹窗编辑后添加布局
    addLayout: (parentId: string, direction: Position) => {
      const { openModal } = useAddLayout(
        {
          direction,
          parentId
        },
        store.addLayout,
        (parentId: string) => {
          console.log('添加布局取消', parentId)
        }
      )

      openModal()
    },
    hoverLayout: store.hoverLayout,
    selectCanvasElement: store.selectCanvasElement,
    addCanvasElement: store.addCanvasElement,
    deleteCanvasElement: store.deleteCanvasElement,
    resetCanvas: store.resetCanvas,
  }
}
