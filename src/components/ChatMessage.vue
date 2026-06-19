<script setup lang="ts">
import type { ChatMessage as ChatMessageType } from '@/types'

defineProps<{
  message: ChatMessageType
}>()
</script>

<template>
  <div
    class="message-row"
    :class="message.role === 'user' ? 'message-row--user' : 'message-row--assistant'"
  >
    <!-- 头像 -->
    <div class="avatar">
      <span v-if="message.role === 'assistant'">🤖</span>
      <span v-else>👤</span>
    </div>

    <!-- 气泡 -->
    <div
      class="bubble"
      :class="message.role === 'user' ? 'bubble--user' : 'bubble--assistant'"
    >
      <div class="bubble__text">{{ message.content }}</div>
      <div class="bubble__time">{{ new Date(message.timestamp).toLocaleTimeString() }}</div>
    </div>
  </div>
</template>

<style scoped>
.message-row {
  display: flex;
  gap: 12px;
  max-width: 800px;
  margin: 0 auto 16px;
  padding: 0 16px;
}

.message-row--user {
  flex-direction: row-reverse;
}

.avatar {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 16px;
  line-height: 1.6;
  font-size: 14px;
}

.bubble--assistant {
  background: #2a2a2a;
  color: #ececec;
  border-bottom-left-radius: 4px;
}

.bubble--user {
  background: #0b6bcb;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.bubble__text {
  white-space: pre-wrap;
  word-break: break-word;
}

.bubble__time {
  margin-top: 4px;
  font-size: 11px;
  opacity: 0.55;
  text-align: right;
}
</style>
