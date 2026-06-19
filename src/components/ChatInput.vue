<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  send: [text: string]
}>()

const input = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

function handleSend() {
  const text = input.value.trim()
  if (!text) return
  emit('send', text)
  input.value = ''

  // 重置 textarea 高度
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }
}

function handleKeydown(e: KeyboardEvent) {
  // Enter 发送，Shift+Enter 换行
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

/** 自动调整 textarea 高度 */
function autoResize() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 150) + 'px'
}
</script>

<template>
  <div class="chat-input">
    <div class="chat-input__inner">
      <textarea
        ref="textareaRef"
        v-model="input"
        class="chat-input__textarea"
        placeholder="输入消息，Enter 发送，Shift+Enter 换行"
        rows="1"
        @keydown="handleKeydown"
        @input="autoResize"
      />
      <button
        class="chat-input__btn"
        :disabled="!input.trim()"
        @click="handleSend"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-input {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.chat-input__inner {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  background: #2a2a2a;
  border-radius: 16px;
  padding: 8px 16px;
  border: 1px solid #3a3a3a;
  transition: border-color 0.15s;
}

.chat-input__inner:focus-within {
  border-color: #0b6bcb;
}

.chat-input__textarea {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ececec;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  max-height: 150px;
  font-family: inherit;
}

.chat-input__textarea::placeholder {
  color: #777;
}

.chat-input__btn {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #0b6bcb;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.chat-input__btn:hover:not(:disabled) {
  background: #0954a3;
}

.chat-input__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
