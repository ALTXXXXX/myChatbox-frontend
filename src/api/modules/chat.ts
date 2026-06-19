import request from '../request'
import type { ChatRequest, ChatResponse } from '@/types'

/**
 * 发送聊天消息
 * POST /chat
 */
export function sendMessage(data: ChatRequest): Promise<ChatResponse> {
  return request.post('/chat', data) as Promise<ChatResponse>
}
