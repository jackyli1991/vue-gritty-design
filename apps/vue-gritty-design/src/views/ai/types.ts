export interface Model {
  id: string
  name: string
  description: string
  avatar?: string
  color?: string
  status: 'online' | 'offline'
  tags: string[]
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
  type: 'text' | 'image' | 'code' | 'loading'
  timestamp: number
  language?: string
}
