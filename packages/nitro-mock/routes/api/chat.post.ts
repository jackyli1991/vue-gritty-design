import { defineHandler } from 'nitro'
import type { H3Event } from 'nitro'
import { errorResponse } from '../../utils'

interface ChatRequest {
  messages: {
    role: string
    content: string
  }[]
  stream?: boolean
  temperature?: number
  top_p?: number
  max_tokens?: number
}

// NVIDIA API Key
const NVIDIA_API_KEY = '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'
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1'

export default defineHandler(async (event: H3Event) => {
  try {
    const body: ChatRequest = (await event.req.json()) as ChatRequest
    const { messages, stream = false, temperature = 0.6, top_p = 0.7, max_tokens = 4096 } = body

    // 调用 NVIDIA DeepSeek API
    const response = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-ai/deepseek-v4-pro',
        messages,
        stream,
        temperature,
        top_p,
        max_tokens,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      return errorResponse('aiChatError', { error })
    }

    // 流式响应
    if (stream) {
      event.res.headers.set('Content-Type', 'text/event-stream')
      event.res.headers.set('Cache-Control', 'no-cache')
      event.res.headers.set('Connection', 'keep-alive')
    }

    return response.body // 响应直接返回，客户端去处理
  } catch (error) {
    return errorResponse('aiChatError', { error })
  }
})
