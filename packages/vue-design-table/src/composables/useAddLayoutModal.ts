import { ref } from 'vue'
import { useDesignStore } from '@/stores'
import { Position, CanvasLayout } from '@/types'
import AddLayoutModal from '@/core/components/modal/AddLayoutModal.vue' // 添加布局弹窗

interface AddLayoutOptions {
  direction: Position // 添加布局的方向
  parentId: string // 父级布局的ID
  onCancel: () => void
  onConfirm: (layout: CanvasLayout, direction: Position) => void
}

const visible = ref(false)
const onCancelCallback = ref() // 取消回调
const onConfirmCallback = ref() // 确认回调

function openModal() {
  visible.value = true
}

function closeModal() {
  visible.value = false
}

/**
 * 添加布局弹窗 [外部调用]
 * @param store 设计状态管理器
 * @param options 添加布局弹窗的选项
 * @returns
 */
export function useAddLayout(options: AddLayoutOptions) {
  const { onCancel, onConfirm, ...args } = options
  const store = useDesignStore()
  store.setAsyncComponent(AddLayoutModal, args || {}) // 设置异步组件为添加布局弹窗
  onCancelCallback.value = onCancel
  onConfirmCallback.value = onConfirm
  return {
    openModal,
    closeModal,
  }
}

/**
 * 添加布局弹窗 [外部调用]
 * @description 添加布局弹窗的属性和回调
 */
export function useAddLayoutModal() {
  return {
    visible,
    closeModal,
    onConfirm: onConfirmCallback.value,
    onCancel: onCancelCallback.value,
  }
}
