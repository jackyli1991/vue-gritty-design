import { storeToRefs } from 'pinia'
import { useDesignStore } from '@/stores/designStore'
import { useModalStore } from '@/stores/modalStore'
import { Position } from '@/types'

export function useDesignContext() {
  const designStore = useDesignStore()
  const modalStore = useModalStore()

  const {
    canvasData,
    activeCanvasElement,
    activeCanvasLayout,
    hoveredLayoutId,
    layoutIds,
    attributesPanelCollapsed,
  } = storeToRefs(designStore)

  const {
    addLayoutModalVisible,
    addLayoutModalData,
    deleteLayoutModalVisible,
    deleteLayoutModalId,
    layerPanelVisible,
    activeContextMenuId,
    contextMenuPosition,
  } = storeToRefs(modalStore)

  return {
    canvasData,
    layoutIds,
    activeCanvasElement,
    activeCanvasLayout,
    hoveredLayoutId,
    attributesPanelCollapsed,
    addLayoutModalVisible,
    addLayoutModalData,
    deleteLayoutModalVisible,
    deleteLayoutModalId,
    layerPanelVisible,
    activeContextMenuId,
    contextMenuPosition,
    getLayout: designStore.getLayout,
    selectLayout: designStore.selectLayout,
    toggleAttributesPanel: designStore.toggleAttributesPanel,
    deleteLayout: (layoutId: string) => {
      if (!layoutId) return
      modalStore.openDeleteLayoutModal(layoutId)
    }, // 删除布局，打开确认弹窗，回调方法为：confirmDeleteLayout
    addLayout: (parentId: string, direction: Position) => {
      modalStore.openAddLayoutModal(parentId, direction)
    }, // 添加布局，打开新增弹窗，回调方法为：confirmAddLayout
    confirmDeleteLayout: designStore.deleteLayout,
    confirmAddLayout: designStore.addLayout,
    closeAddLayoutModal: modalStore.closeAddLayoutModal,
    closeDeleteLayoutModal: modalStore.closeDeleteLayoutModal,
    openLayerPanel: modalStore.openLayerPanel,
    closeLayerPanel: modalStore.closeLayerPanel,
    openContextMenu: modalStore.openContextMenu,
    closeContextMenu: modalStore.closeContextMenu,
    hoverLayout: designStore.hoverLayout,
    getLayoutToolbar: designStore.getLayoutToolbar,
    selectCanvasElement: designStore.selectCanvasElement,
    addCanvasElement: designStore.addCanvasElement,
    deleteCanvasElement: designStore.deleteCanvasElement,
    resetCanvas: designStore.resetCanvas,
  }
}
