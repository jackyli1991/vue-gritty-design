/**
 * 流式响应数据解析器
 * 用于处理 OpenAI/NVIDIA 风格的 SSE 流式响应
 */

export interface StreamChunk {
  choices?: {
    delta?: {
      content?: string
    }
  }[]
}

export interface StreamParserOptions {
  /** 请求头 */
  headers?: Record<string, string>
  /** 数据块回调 */
  /** 数据块回调 */
  onChunk?: (content: string) => void
  /** 完成回调 */
  onComplete?: (fullContent: string) => void
  /** 错误回调 */
  onError?: (error: Error) => void
}

/**
 * 解析流式响应数据
 * @param reader - ReadableStreamDefaultReader
 * @param options - 回调选项
 * @returns Promise<string> - 完整的响应内容
 */
export async function parseStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  options?: StreamParserOptions,
): Promise<string> {
  const decoder = new TextDecoder('utf-8')
  let buffer = ''
  let fullContent = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      // 按行分割数据（SSE 格式）
      const lines = buffer.split('\n')
      buffer = lines.pop() || '' // 保留未完成的行

      for (const line of lines) {
        if (line.trim() === '') continue

        // 解析 SSE 格式的数据
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6)
          if (dataStr === '[DONE]') continue

          try {
            const data: StreamChunk = JSON.parse(dataStr)
            const chunk = data.choices?.[0]?.delta?.content || ''

            if (chunk) {
              fullContent += chunk
              options?.onChunk?.(chunk)
            }
          } catch {
            // 忽略解析错误（可能是不完整的 JSON）
          }
        }
      }
    }

    options?.onComplete?.(fullContent)
    return fullContent
  } catch (error) {
    options?.onError?.(error instanceof Error ? error : new Error(String(error)))
    throw error
  }
}

/**
 * 发送流式请求
 * @param url - 请求地址
 * @param data - 请求体
 * @param options - 回调选项
 * @returns Promise<string> - 完整的响应内容
 */
export async function sendStreamRequest(
  url: string,
  data: Record<string, unknown>,
  options?: StreamParserOptions,
): Promise<string> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('无法获取响应流')
  }

  return parseStream(reader, options)
}
