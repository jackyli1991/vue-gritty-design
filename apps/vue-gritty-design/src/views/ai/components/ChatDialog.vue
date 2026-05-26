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
        <a-button
          class="flex! items-center gap-2"
          type="text"
          size="small"
          @click="showSettingsModal = true"
        >
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
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = -1"
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
            :class="[
              message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800',
              { 'border border-red-300': message.isError },
            ]"
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

          <!-- 时间戳和操作按钮 -->
          <div
            class="flex items-center gap-2 mt-1"
            :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <span class="text-xs text-gray-400 p-1">{{ formatTime(message.timestamp) }}</span>
            <!-- 操作按钮 -->
            <div class="message-actions flex gap-1">
              <!-- 删除按钮（鼠标悬停时显示，请求中不显示） -->
              <a-tooltip
                v-if="hoveredIndex === index && message.type !== 'loading'"
                title="删除消息"
              >
                <a-button
                  type="text"
                  size="small"
                  class="p-0.5 text-gray-400 hover:text-red-500"
                  @click.stop="deleteMessage(index)"
                >
                  <DeleteOutlined />
                </a-button>
              </a-tooltip>
              <!-- 重发按钮（仅错误消息显示） -->
              <a-tooltip v-if="message.isError" title="重新发送">
                <a-button
                  type="text"
                  size="small"
                  class="p-0.5 text-gray-400 hover:text-blue-500"
                  @click.stop="resendMessage(index)"
                >
                  <RefreshOutlined />
                </a-button>
              </a-tooltip>
            </div>
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

  <!-- 设置弹窗 -->
  <a-modal v-model:open="showSettingsModal" title="模型设置" :footer="null" width="480px">
    <div class="space-y-4">
      <!-- 流式传输设置 -->
      <div>
        <a-form-item label="数据传输方式">
          <a-radio-group v-model:value="chatSettings.stream" button-style="solid">
            <a-radio :value="true">流式传输</a-radio>
            <a-radio :value="false">非流式传输</a-radio>
          </a-radio-group>
        </a-form-item>
      </div>

      <!-- 温度参数 -->
      <div>
        <a-form-item label="温度参数 (Temperature)">
          <a-slider
            v-model:value="chatSettings.temperature"
            :min="0"
            :max="2"
            :step="0.1"
            :marks="{ 0: '0', 0.5: '0.5', 1: '1', 1.5: '1.5', 2: '2' }"
          />
          <span class="text-sm text-gray-500 mt-2 block">
            当前值: {{ chatSettings.temperature.toFixed(1) }}
          </span>
        </a-form-item>
      </div>

      <!-- Top P 参数 -->
      <div>
        <a-form-item label="Top P">
          <a-slider
            v-model:value="chatSettings.topP"
            :min="0"
            :max="1"
            :step="0.05"
            :marks="{ 0: '0', 0.25: '0.25', 0.5: '0.5', 0.75: '0.75', 1: '1' }"
          />
          <span class="text-sm text-gray-500 mt-2 block">
            当前值: {{ chatSettings.topP.toFixed(2) }}
          </span>
        </a-form-item>
      </div>

      <!-- 最大Token数 -->
      <div>
        <a-form-item label="最大Token数">
          <a-select v-model:value="chatSettings.maxTokens">
            <a-select-option :value="512">512</a-select-option>
            <a-select-option :value="1024">1024</a-select-option>
            <a-select-option :value="2048">2048</a-select-option>
            <a-select-option :value="4096">4096</a-select-option>
            <a-select-option :value="8192">8192</a-select-option>
          </a-select>
        </a-form-item>
      </div>

      <!-- 按钮 -->
      <div class="flex gap-2 justify-end pt-4">
        <a-button @click="showSettingsModal = false">取消</a-button>
        <a-button type="primary" @click="saveSettings">保存设置</a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, h, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import type { Model, Message } from '../types'
// import http from '@/http'
// import { chatApi } from '@/apis'
import { sendChatRequest } from '../utils/streamParser'

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
const DeleteOutlined = () => h(Icon, { icon: 'material-symbols:delete-outline' })
const RefreshOutlined = () => h(Icon, { icon: 'material-symbols:refresh' })

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

// 当前悬停的消息索引
const hoveredIndex = ref(-1)

// 设置弹窗显示状态
const showSettingsModal = ref(false)

// 聊天设置
const chatSettings = reactive({
  stream: true, // 是否使用流式传输
  temperature: 0.6, // 温度参数
  topP: 0.7, // Top P 参数
  maxTokens: 4096, // 最大 Token 数
})

// 保存设置
function saveSettings() {
  showSettingsModal.value = false
}

// 删除消息
function deleteMessage(index: number) {
  messages.value.splice(index, 1)
}

// 重新发送消息（针对错误消息）
async function resendMessage(index: number) {
  console.log('重发消息:', messages.value[index])
}

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

  try {
    const requestBody = {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...messages.value
          .filter((m) => m.type === 'text')
          .map((m) => ({ role: m.role, content: m.content })),
      ],
      stream: chatSettings.stream,
      temperature: chatSettings.temperature,
      top_p: chatSettings.topP,
      max_tokens: chatSettings.maxTokens,
    }

    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY || 'token')
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    // 找到 loading 消息的索引
    const loadingIndex = messages.value.length - 1

    // 使用封装的聊天请求工具函数（自动处理流式/非流式）
    await sendChatRequest('/api/chat', requestBody, {
      method: 'POST',
      headers,
      // 流式传输时，处理每个 chunk
      onChunk: chatSettings.stream
        ? (chunk) => {
            // 更新消息内容，实现打字机效果
            messages.value[loadingIndex] = {
              role: 'assistant',
              content: (messages.value[loadingIndex]?.content || '') + chunk,
              type: 'text',
              timestamp: Date.now(),
            }
            scrollToBottom()
          }
        : undefined,
      // 非流式传输时，处理完整响应
      onComplete: (content) => {
        messages.value[loadingIndex] = {
          role: 'assistant',
          content: content || '抱歉，我没有理解您的问题。',
          type: 'text',
          timestamp: Date.now(),
        }
      },
      // 错误回调
      onError: (error) => {
        console.error('请求错误:', error)
        // 移除 loading 消息
        messages.value.pop()
        // 添加错误消息（标记为错误消息）
        messages.value.push({
          role: 'assistant',
          content: '抱歉，请求出现错误，请稍后重试。',
          type: 'text',
          timestamp: Date.now(),
          isError: true,
        })
      },
    })
  } catch (error) {
    console.error('sendChatRequest 错误:', error)
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
