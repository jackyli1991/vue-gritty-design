<template>
  <ConfirmModal
    :visible="deleteLayoutModalVisible"
    title="删除布局"
    content="确定要删除该布局吗？"
    subContent="该操作将同时删除所有子布局，且不可撤销。"
    @ok="handleOk"
    @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import ConfirmModal from './ConfirmModal.vue'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'DeleteLayoutModal',
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
