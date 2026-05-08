import { storeToRefs } from 'pinia'
import { useDesignStore } from '@/stores'

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
    deleteLayout: store.deleteLayout,
    addLayout: useAddLayoutModal(store),
    hoverLayout: store.hoverLayout,
    selectCanvasElement: store.selectCanvasElement,
    addCanvasElement: store.addCanvasElement,
    deleteCanvasElement: store.deleteCanvasElement,
    resetCanvas: store.resetCanvas,
  }
}
