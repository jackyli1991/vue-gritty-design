/**
 * 基础弹窗相关，不涉及到数据传递，只是单纯的确认、取消操作的弹窗
 * 用于确认操作
 */
import type { Component, Ref } from 'vue'
import { ref } from 'vue'
import ConfirmModal from '@/core/components/modal/ConfirmModal.vue'
import { createUUID } from '@/utils'

interface CommonModal {
  id: string // 弹窗id
  attrs: Record<string, unknown> // 弹窗属性
  component: Component // 弹窗组件
}

interface UseConfirmModal {
  commonModals: Ref<CommonModal[]>
  openModal: (attrs: Record<string, unknown>, onOk: () => void) => void
}

const commonModals = ref<CommonModal[]>([])
// 打开基础弹窗
function openCommonModal(modal: CommonModal) {
  commonModals.value.push(modal)
}
// 关闭基础弹窗
function closeCommonModal(id: string) {
  commonModals.value = commonModals.value.filter((item) => item.id !== id)
}

export const useConfirmModal = (): UseConfirmModal => {
  /**
   * 打开确认弹窗
   * @param attrs 弹窗属性
   * @param onOk 确认回调
   */
  function openModal(attrs: Record<string, unknown> = {}, onOk: () => void) {
    const id = createUUID()
    openCommonModal({
      id,
      attrs: {
        ...attrs,
        id,
        visible: true,
        onOk: () => {
          onOk()
          closeCommonModal(id)
        },
        onCancel: () => closeCommonModal(id),
      },
      component: ConfirmModal,
    })
  }

  return {
    commonModals,
    openModal,
  }
}
