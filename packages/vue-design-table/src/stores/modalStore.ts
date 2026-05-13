import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Position } from '@/types'

export const useModalStore = defineStore('modal', () => {
  /** ************************* 创建布局弹窗相关 ************************* */

  const addLayoutModalVisible = ref(false) // 是否可见
  const addLayoutModalData = ref<{ parentId: string; direction: Position } | null>(null) // 弹窗数据

  // 打开创建布局弹窗
  function openAddLayoutModal(parentId: string, direction: Position) {
    addLayoutModalData.value = { parentId, direction }
    addLayoutModalVisible.value = true
  }

  // 关闭创建布局弹窗
  function closeAddLayoutModal() {
    addLayoutModalVisible.value = false
    addLayoutModalData.value = null
  }

  /** ************************* 删除布局弹窗相关 ************************* */

  const deleteLayoutModalVisible = ref(false) // 是否可见
  const deleteLayoutModalId = ref<string>('') // 要删除的布局id

  // 打开删除布局弹窗
  function openDeleteLayoutModal(layoutId: string) {
    deleteLayoutModalId.value = layoutId
    deleteLayoutModalVisible.value = true
  }

  // 关闭删除布局弹窗
  function closeDeleteLayoutModal() {
    deleteLayoutModalVisible.value = false
    deleteLayoutModalId.value = ''
  }

  /** ************************* 图层弹窗相关 ************************* */

  const layerPanelVisible = ref(false) // 是否可见

  // 打开图层弹窗
  function openLayerPanel() {
    layerPanelVisible.value = true
  }

  // 关闭图层弹窗
  function closeLayerPanel() {
    layerPanelVisible.value = false
  }

  /** ************************* 右键菜单相关 ************************* */

  const activeContextMenuId = ref<string>('') // 当前激活的右键菜单ID
  const contextMenuPosition = ref({ x: 0, y: 0 }) // 右键菜单位置

  // 打开右键菜单
  function openContextMenu(menuId: string, x: number, y: number) {
    activeContextMenuId.value = menuId
    contextMenuPosition.value = { x, y }
  }

  // 关闭右键菜单
  function closeContextMenu() {
    activeContextMenuId.value = ''
    contextMenuPosition.value = { x: 0, y: 0 }
  }

  return {
    addLayoutModalVisible,
    addLayoutModalData,
    deleteLayoutModalVisible,
    deleteLayoutModalId,
    layerPanelVisible,
    activeContextMenuId,
    contextMenuPosition,
    openAddLayoutModal,
    closeAddLayoutModal,
    openDeleteLayoutModal,
    closeDeleteLayoutModal,
    openLayerPanel,
    closeLayerPanel,
    openContextMenu,
    closeContextMenu,
  }
})

export type ModalStore = ReturnType<typeof useModalStore>
