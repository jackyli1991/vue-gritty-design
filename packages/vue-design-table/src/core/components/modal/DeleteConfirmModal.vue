<template>
  <aModal
    v-model:open="visible"
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
import { ref } from 'vue'
import { Modal as aModal } from 'ant-design-vue'

const emit = defineEmits<{
  confirm: []
}>()

const visible = ref(false)

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

function handleOk() {
  emit('confirm')
  close()
}

function handleCancel() {
  close()
}

defineExpose({ open, close })
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
