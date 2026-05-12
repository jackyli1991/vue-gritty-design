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
    getLayout: designStore.getLayout,
    selectLayout: designStore.selectLayout,
    toggleAttributesPanel: designStore.toggleAttributesPanel,
    deleteLayout: (layoutId: string) => {
      if (!layoutId) return
      modalStore.openDeleteLayoutModal(layoutId)
    },
    addLayout: (parentId: string, direction: Position) => {
      modalStore.openAddLayoutModal(parentId, direction)
    },
    confirmDeleteLayout: designStore.deleteLayout,
    confirmAddLayout: designStore.addLayout,
    closeAddLayoutModal: modalStore.closeAddLayoutModal,
    closeDeleteLayoutModal: modalStore.closeDeleteLayoutModal,
    openLayerPanel: modalStore.openLayerPanel,
    closeLayerPanel: modalStore.closeLayerPanel,
    hoverLayout: designStore.hoverLayout,
    getLayoutToolbar: designStore.getLayoutToolbar,
    selectCanvasElement: designStore.selectCanvasElement,
    addCanvasElement: designStore.addCanvasElement,
    deleteCanvasElement: designStore.deleteCanvasElement,
    resetCanvas: designStore.resetCanvas,
  }
}
