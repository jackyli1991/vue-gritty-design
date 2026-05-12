<template>
  <aModal
    v-model:open="deleteLayoutModalVisible"
    title="删除布局"
    :width="400"
    cancelText="取消"
    okText="确定"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="delete-confirm-content">
      <div class="confirm-text">
        <p>确定要删除该布局吗？</p>
        <p class="sub-text">该操作将同时删除所有子布局，且不可撤销。</p>
      </div>
    </div>
  </aModal>
</template>

<script setup lang="ts">
import { Modal as aModal } from 'ant-design-vue'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'DeleteConfirmModal',
})

const {
  deleteLayoutModalVisible,
  deleteLayoutModalId,
  confirmDeleteLayout,
  closeDeleteLayoutModal,
} = useDesignContext()

function handleOk() {
  if (deleteLayoutModalId.value) {
    confirmDeleteLayout(deleteLayoutModalId.value)
  }
  closeDeleteLayoutModal()
}

function handleCancel() {
  closeDeleteLayoutModal()
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
