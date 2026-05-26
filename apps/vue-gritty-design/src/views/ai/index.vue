<template>
  <GPage>
    <div class="ai-chat-page h-full flex gap-4 overflow-hidden">
      <!-- 左侧模型列表 -->
      <div class="w-80 flex-shrink-0 h-full overflow-hidden">
        <ModelList
          :models="modelList"
          :selected-id="selectedModel?.id"
          @select="handleModelSelect"
        />
      </div>

      <!-- 右侧对话框 -->
      <div class="flex-1 min-w-0 h-full overflow-hidden">
        <ChatDialog :current-model="selectedModel" @send="handleMessageSend" />
      </div>
    </div>
  </GPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModelList from './components/ModelList.vue'
import ChatDialog from './components/ChatDialog.vue'
import type { Model } from './types'
import { modelList as modelsData } from './datas/models'

// 大模型数据
const modelList = ref<Model[]>(modelsData)

// 当前选中的模型
const selectedModel = ref<Model>()

// 选择模型
function handleModelSelect(model: Model) {
  selectedModel.value = model
}

// 发送消息（可在此处理实际的 API 调用）
function handleMessageSend(content: string) {
  console.log('发送消息到模型:', selectedModel.value?.name, '内容:', content)
  // 实际项目中这里调用后端 API
}
</script>

<style scoped lang="scss">
.ai-chat-page {
  min-height: 600px;
}
</style>
