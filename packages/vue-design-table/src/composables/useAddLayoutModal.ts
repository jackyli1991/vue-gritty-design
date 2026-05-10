import { ref } from 'vue'
import { useDesignStore } from '@/stores'
import { Position, CanvasLayout } from '@/types'
import AddLayoutModal from '@/core/components/modal/AddLayoutModal.vue' // 添加布局弹窗

interface AddLayoutOptions {
  direction: Position // 添加布局的方向
  parentId: string // 父级布局的ID
}

const visible = ref(false)
const onCancelCallback = ref() // 取消回调
const onConfirmCallback = ref() // 确认回调
const parentId = ref<string>() // 父级布局的ID
const direction = ref<Position>() // 添加布局的方向

function openModal() {
  visible.value = true
}

function closeModal() {
  onCancelCallback.value = null
  onConfirmCallback.value = null
  visible.value = false
}

/**
 * 添加布局弹窗 [外部调用]
 * @param store 设计状态管理器
 * @param options 添加布局弹窗的选项
 * @returns
 */
export function useAddLayout(
  options: AddLayoutOptions,
  onConfirm: (layout: CanvasLayout, parentId: string, direction: Position) => void,
  onCancel: (parentId: string) => void,
) {
  // 设置异步组件为添加布局弹窗
  const store = useDesignStore()
  store.setAsyncComponent(AddLayoutModal, options || {})
  // 初始化弹窗数据
  parentId.value = options.parentId || ''
  direction.value = options.direction || Position.Top
  // 回调函数
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
    onConfirm: (layout: CanvasLayout) => onConfirmCallback.value(layout, parentId.value, direction.value),
    onCancel: () => onCancelCallback.value(parentId.value),
  }
}
