<template>
  <div class="chat-dialog h-full flex flex-col bg-white rounded-lg border border-gray-200">
    <!-- 头部 - 当前模型信息 -->
    <div class="chat-header p-4 border-b border-gray-100 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <a-avatar
          :src="currentModel?.avatar"
          :size="36"
          :style="{
            backgroundColor: currentModel?.avatar
              ? 'transparent'
              : currentModel?.color || '#1890ff',
          }"
        >
          <template v-if="!currentModel?.avatar">
            {{ currentModel?.name?.charAt(0) || '?' }}
          </template>
        </a-avatar>
        <div>
          <div class="font-medium text-gray-800">{{ currentModel?.name || '请选择模型' }}</div>
          <div class="text-xs text-gray-500">
            {{ currentModel?.description || '从左侧选择一个模型开始对话' }}
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <a-button class="flex! items-center gap-2" type="text" size="small" @click="clearMessages">
          <ClearOutlined />
          清空对话
        </a-button>
        <a-button class="flex! items-center gap-2" type="text" size="small">
          <SettingOutlined />
          设置
        </a-button>
      </div>
    </div>

    <!-- 消息列表 -->
    <div ref="messageContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- 欢迎消息 -->
      <div
        v-if="messages.length === 0"
        class="flex flex-col items-center justify-center h-full text-gray-400"
      >
        <RobotOutlined class="text-6xl mb-4" />
        <p class="text-lg">
          {{ currentModel ? `我是 ${currentModel.name}，有什么可以帮您的？` : '请先选择一个模型' }}
        </p>
      </div>

      <!-- 消息项 -->
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message-item flex gap-3"
        :class="{ 'flex-row-reverse': message.role === 'user' }"
      >
        <!-- 头像 -->
        <a-avatar
          :src="message.role === 'user' ? userAvatar : currentModel?.avatar"
          :size="36"
          :style="{
            backgroundColor: message.role === 'user' ? '#52c41a' : currentModel?.color || '#1890ff',
          }"
        >
          <template v-if="message.role === 'user' && !userAvatar">我</template>
          <template v-else-if="!currentModel?.avatar">{{
            currentModel?.name?.charAt(0) || 'AI'
          }}</template>
        </a-avatar>

        <!-- 消息内容 -->
        <div class="message-content max-w-[70%]">
          <div
            class="message-bubble p-3 rounded-lg"
            :class="
              message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
            "
          >
            <!-- 文本内容 -->
            <div v-if="message.type === 'text'" class="whitespace-pre-wrap">
              {{ message.content }}
            </div>

            <!-- 图片内容 -->
            <div v-else-if="message.type === 'image'">
              <a-image :src="message.content" :width="200" />
            </div>

            <!-- 代码块 -->
            <div v-else-if="message.type === 'code'">
              <div class="code-header text-xs text-gray-500 mb-1">
                {{ message.language || 'code' }}
              </div>
              <pre
                class="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto"
              ><code>{{ message.content }}</code></pre>
            </div>

            <!-- 加载中 -->
            <div v-else-if="message.type === 'loading'" class="flex items-center gap-2">
              <LoadingOutlined class="animate-spin" />
              <span>思考中...</span>
            </div>
          </div>

          <!-- 时间戳 -->
          <div
            class="text-xs text-gray-400 mt-1"
            :class="message.role === 'user' ? 'text-right' : 'text-left'"
          >
            {{ formatTime(message.timestamp) }}
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="chat-input p-4 border-t border-gray-100">
      <!-- 工具栏 -->
      <div class="flex items-center gap-2 mb-2">
        <a-tooltip title="上传图片">
          <a-button
            class="flex! items-center gap-2"
            type="text"
            size="small"
            :disabled="!currentModel"
          >
            <PictureOutlined />
          </a-button>
        </a-tooltip>
        <a-tooltip title="上传文件">
          <a-button
            class="flex! items-center gap-2"
            type="text"
            size="small"
            :disabled="!currentModel"
          >
            <FileOutlined />
          </a-button>
        </a-tooltip>
        <a-tooltip title="语音输入">
          <a-button
            class="flex! items-center gap-2"
            type="text"
            size="small"
            :disabled="!currentModel"
          >
            <AudioOutlined />
          </a-button>
        </a-tooltip>
      </div>

      <!-- 输入框 -->
      <div class="flex gap-2">
        <a-textarea
          v-model:value="inputMessage"
          :placeholder="currentModel ? '输入消息...' : '请先选择模型'"
          :disabled="!currentModel || isLoading"
          :auto-size="{ minRows: 4, maxRows: 8 }"
          @keydown.enter.prevent="handleEnter"
        />
        <a-button
          type="primary"
          class="self-end flex! items-center gap-2"
          :disabled="!inputMessage.trim() || !currentModel || isLoading"
          :loading="isLoading"
          @click="sendMessage"
        >
          <span>发送</span>
          <SendOutlined />
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, h } from 'vue'
import { Icon } from '@iconify/vue'
import type { Model, Message } from '../types'
// import http from '@/http'
// import { chatApi } from '@/apis'
import { sendStreamRequest } from '../utils/streamParser'

// 图标组件
const SendOutlined = () => h(Icon, { icon: 'material-symbols:send' })
const ClearOutlined = () => h(Icon, { icon: 'material-symbols:delete-outline' })
const SettingOutlined = () => h(Icon, { icon: 'material-symbols:settings-outline' })
const RobotOutlined = () => h(Icon, { icon: 'material-symbols:smart-toy' })
const LoadingOutlined = () =>
  h(Icon, { icon: 'material-symbols:progress-activity', class: 'animate-spin' })
const PictureOutlined = () => h(Icon, { icon: 'material-symbols:image-outline' })
const FileOutlined = () => h(Icon, { icon: 'material-symbols:attach-file' })
const AudioOutlined = () => h(Icon, { icon: 'material-symbols:mic-outline' })

const props = defineProps<{
  currentModel?: Model
}>()

const emit = defineEmits<{
  send: [content: string]
}>()

// 用户头像（可从用户信息获取）
const userAvatar = ref('')

// 消息列表
const messages = ref<Message[]>([])

// 输入消息
const inputMessage = ref('')

// 加载状态
const isLoading = ref(false)

// 消息容器引用
const messageContainer = ref<HTMLElement>()

// 发送消息
async function sendMessage() {
  const content = inputMessage.value.trim()
  if (!content || !props.currentModel || isLoading.value) return

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content,
    type: 'text',
    timestamp: Date.now(),
  })

  inputMessage.value = ''
  scrollToBottom()

  // 调用 DeepSeek API
  isLoading.value = true
  messages.value.push({
    role: 'assistant',
    content: '',
    type: 'loading',
    timestamp: Date.now(),
  })

  const stream = true

  try {
    const requestBody = {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...messages.value
          .filter((m) => m.type === 'text')
          .map((m) => ({ role: m.role, content: m.content })),
      ],
      stream,
    }

    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY || 'token')

    // 找到 loading 消息的索引
    const loadingIndex = messages.value.length - 1
    let aiContent = ''

    // 使用封装的流式请求工具函数
    await sendStreamRequest('/api/chat', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      onChunk: (chunk) => {
        aiContent += chunk
        // 更新消息内容，实现打字机效果
        messages.value[loadingIndex] = {
          role: 'assistant',
          content: aiContent,
          type: 'text',
          timestamp: Date.now(),
        }
        scrollToBottom()
      },
    })

    // 如果没有获取到内容，设置默认回复
    if (!aiContent) {
      messages.value[loadingIndex] = {
        role: 'assistant',
        content: '抱歉，我没有理解您的问题。',
        type: 'text',
        timestamp: Date.now(),
      }
    }
  } catch (error) {
    console.error('流式请求错误:', error)

    // 移除 loading 消息
    messages.value.pop()

    // 添加错误消息
    messages.value.push({
      role: 'assistant',
      content: '抱歉，请求出现错误，请稍后重试。',
      type: 'text',
      timestamp: Date.now(),
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }

  emit('send', content)
}

// 处理回车发送
function handleEnter(e: KeyboardEvent) {
  if (!e.shiftKey) {
    sendMessage()
  }
}

// 清空消息
function clearMessages() {
  messages.value = []
}

// 滚动到底部
function scrollToBottom() {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}

// 格式化时间
function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

// 监听模型变化，清空消息
watch(
  () => props.currentModel?.id,
  () => {
    clearMessages()
  },
)
</script>

<style scoped lang="scss">
.chat-dialog {
  .chat-header {
    background: linear-gradient(to right, #fafafa, #fff);
  }

  .message-item {
    .message-bubble {
      word-break: break-word;
    }
  }

  .code-header {
    border-bottom: 1px solid #4a4a4a;
    padding-bottom: 4px;
  }
}
</style>
