<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'
import { useChat } from '@/composables/useChat'

const { messages, loading, error, send, clear } = useChat()

const chatBodyRef = ref<HTMLElement | null>(null)

/** 新消息到达时自动滚动到底部 */
watch(
  () => messages.value.length,
  async () => {
    await nextTick()
    if (chatBodyRef.value) {
      chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
    }
  }
)

/** loading 状态变化时也滚动 */
watch(loading, async (val) => {
  if (val) {
    await nextTick()
    if (chatBodyRef.value) {
      chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
    }
  }
})

function handleSend(text: string) {
  send(text)
}
</script>

<template>
  <div class="chat-container">
    <!-- 顶栏 -->
    <header class="chat-header">
      <h1 class="chat-header__title">AI Chat</h1>
      <button
        v-if="messages.length"
        class="chat-header__clear-btn"
        @click="clear"
      >
        清空对话
      </button>
    </header>

    <!-- 消息列表 -->
    <main ref="chatBodyRef" class="chat-body">
      <!-- 空状态 -->
      <div v-if="messages.length === 0" class="chat-body__empty">
        <div class="empty-icon">💬</div>
        <p>开始和 AI 对话吧</p>
      </div>

      <!-- 消息 -->
      <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :message="msg"
      />

      <!-- Loading 提示 -->
      <div v-if="loading" class="loading-indicator">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="loading-text">AI 思考中...</span>
      </div>

      <!-- 错误提示 -->
      <div v-if="error" class="error-banner">
        {{ error }}
      </div>
    </main>

    <!-- 输入区域 -->
    <footer class="chat-footer">
      <ChatInput @send="handleSend" />
    </footer>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  background: #1a1a1a;
  color: #ececec;
}

/* ---- Header ---- */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  height: 56px;
  padding: 0 20px;
  border-bottom: 1px solid #2a2a2a;
}

.chat-header__title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.chat-header__clear-btn {
  background: transparent;
  border: 1px solid #3a3a3a;
  color: #999;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.15s;
}

.chat-header__clear-btn:hover {
  border-color: #e55;
  color: #e55;
}

/* ---- Body ---- */
.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
  scroll-behavior: smooth;
}

.chat-body::-webkit-scrollbar {
  width: 6px;
}

.chat-body::-webkit-scrollbar-thumb {
  background: #3a3a3a;
  border-radius: 3px;
}

.chat-body__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  gap: 12px;
}

.empty-icon {
  font-size: 48px;
}

/* ---- Loading ---- */
.loading-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 800px;
  margin: 0 auto;
  padding: 12px 16px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #0b6bcb;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }
.dot:nth-child(3) { animation-delay: 0s; }

.loading-text {
  margin-left: 8px;
  font-size: 13px;
  color: #888;
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

/* ---- Error ---- */
.error-banner {
  max-width: 800px;
  margin: 8px auto;
  padding: 10px 16px;
  background: rgba(255, 85, 85, 0.15);
  border: 1px solid rgba(255, 85, 85, 0.3);
  border-radius: 8px;
  color: #f66;
  font-size: 13px;
}

/* ---- Footer ---- */
.chat-footer {
  flex-shrink: 0;
  border-top: 1px solid #2a2a2a;
  background: #1a1a1a;
}
</style>
