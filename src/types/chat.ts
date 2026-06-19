/** 单条聊天消息 */
export interface ChatMessage {
  /** 消息唯一 ID */
  id: string
  /** 消息角色 */
  role: 'user' | 'assistant'
  /** 消息内容 */
  content: string
  /** 消息时间戳 */
  timestamp: number
}

/** POST /chat 请求体 */
export interface ChatRequest {
  question: string
}

/** POST /chat 响应体 */
export interface ChatResponse {
  question: string
  answer: string
}

/** API 统一响应格式（预留扩展） */
export interface ApiResponse<T> {
  code: number
  data: T
  message: string
}
