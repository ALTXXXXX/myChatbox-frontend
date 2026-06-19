import { ref, nextTick } from 'vue'
import { sendMessage } from '@/api'
import type { ChatMessage } from '@/types'

/** 生成唯一 ID */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useChat() {
  /** 消息列表 */
  const messages = ref<ChatMessage[]>([])
  /** 是否正在等待 AI 回复 */
  const loading = ref(false)
  /** 错误信息 */
  const error = ref<string | null>(null)

  /** 发送消息 */
  async function send(text: string): Promise<void> {
    const trimmed = text.trim()
    if (!trimmed || loading.value) return

    // 1) 添加用户消息
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    }
    messages.value.push(userMsg)

    // 2) 进入 loading
    loading.value = true
    error.value = null

    // 3) 调用后端
    try {
      const res = await sendMessage({ question: trimmed })
      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: res.answer,
        timestamp: Date.now(),
      }
      messages.value.push(assistantMsg)
    } catch (e: any) {
      error.value = e?.message || '请求失败，请稍后重试'
    } finally {
      loading.value = false
    }
  }

  /** 清空对话 */
  function clear(): void {
    messages.value = []
    error.value = null
  }

  return { messages, loading, error, send, clear }
}
