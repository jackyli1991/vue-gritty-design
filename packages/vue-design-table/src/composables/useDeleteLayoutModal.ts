import { ref } from 'vue'
import { useDesignStore } from '@/stores'
import DeleteConfirmModal from '@/core/components/modal/DeleteConfirmModal.vue' // 删除确认弹窗

interface UseDeleteConfirmOptions {
  onCancel: () => void
  onConfirm: (layoutId: string) => void
  title: string // 弹窗标题
  content: string // 弹窗内容
  subContent?: string // 弹窗子内容，用于显示警告信息等
  confirmText?: string // 确认按钮文本
  cancelText?: string // 取消按钮文本
}

const visible = ref(false) // 弹窗是否可见
const onCancelCallback = ref() // 取消回调
const onConfirmCallback = ref() // 确认回调

// 打开弹窗
function openModal() {
  visible.value = true
}

// 关闭弹窗
function closeModal() {
  visible.value = false
}

/**
 * 删除确认弹窗 [外部调用]
 * 用于删除布局、元素等操作的确认弹窗
 * @param store 设计状态管理器
 * @param options 删除确认弹窗的选项
 * @param cbParams 删除操作的参数，例如布局ID、元素ID等
 */

export function useDeleteConfirm(
  options: UseDeleteConfirmOptions
) {
  const { onCancel, onConfirm, ...args } = options
  const store = useDesignStore()
  store.setAsyncComponent(DeleteConfirmModal, args || {}) // 设置异步组件为删除确认弹窗
  onCancelCallback.value = onCancel
  onConfirmCallback.value = onConfirm
  return {
    openModal,
    closeModal,
  }
}

/**
 * 删除确认弹窗 [外部调用]
 * @description 删除确认弹窗确认后执行删除操作
 */
export function useDeleteConfirmModal() {
  return {
    visible,
    closeModal,
    onConfirm: onConfirmCallback.value,
    onCancel: onCancelCallback.value,
  }
}
