<template>
  <aModal
    v-model:open="visible"
    :title="props.title"
    :width="props.width"
    :cancelText="props.cancelText"
    :okText="props.confirmText"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="delete-confirm-content">
      <div class="confirm-text">
        <p>{{ props.content }}</p>
        <p class="sub-text">{{ props.subContent }}</p>
      </div>
    </div>
  </aModal>
</template>

<script setup lang="ts">
import { Modal as aModal } from 'ant-design-vue'
import { useDeleteConfirmModal } from '@/composables/useDeleteLayoutModal'

defineOptions({
  name: 'DeleteConfirmModal',
})

interface Props {
  title?: string // 弹窗标题
  content?: string // 弹窗内容
  subContent?: string // 弹窗子内容
  confirmText?: string // 确认按钮文本
  cancelText?: string // 取消按钮文本
  width?: number // 弹窗宽度
}

const props = withDefaults(defineProps<Props>(), {
  title: '删除',
  content: '确定要删除吗？',
  subContent: '该操作不可撤销。',
  confirmText: '确定',
  cancelText: '取消',
  width: 400,
})

const { visible, closeModal, onCancel, onConfirm } = useDeleteConfirmModal()

function handleCancel() {
  onCancel()
  closeModal()
}

function handleOk() {
  onConfirm()
  closeModal()
}
</script>

<style scoped lang="scss">
.delete-confirm-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;

  .warning-icon {
    font-size: 24px;
    color: #faad14;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .confirm-text {
    p {
      margin: 0;
      font-size: 14px;
      color: #333;
      line-height: 1.6;

      &.sub-text {
        font-size: 13px;
        color: #999;
        margin-top: 4px;
      }
    }
  }
}
</style>
