<template>
  <aModal
    :open="visible"
    :title="title"
    :width="width"
    :cancelText="cancelText"
    :okText="okText"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="delete-confirm-content">
      <div class="confirm-text">
        <p>{{ content }}</p>
        <p class="sub-text">{{ subContent }}</p>
      </div>
    </div>
  </aModal>
</template>

<script setup lang="ts">
import { Modal as aModal } from 'ant-design-vue'

defineOptions({
  name: 'ConfirmModal',
})

interface ConfirmModalProps {
  visible: boolean // 是否显示
  title?: string // 标题
  width?: number // 宽度
  okText?: string // 确认按钮文本
  cancelText?: string // 取消按钮文本
  content?: string // 内容文本
  subContent?: string // 子内容文本
}

const emit = defineEmits(['ok', 'cancel'])

withDefaults(defineProps<ConfirmModalProps>(), {
  visible: false,
  title: '确认',
  width: 400,
  okText: '确定',
  cancelText: '取消',
  content: '确认要进行此操作吗？',
  subContent: '该操作将不可撤销，是否继续？',
})

function handleOk() {
  emit('ok')
}

function handleCancel() {
  emit('cancel')
}
</script>

<style scoped lang="scss">
.delete-confirm-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;

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
