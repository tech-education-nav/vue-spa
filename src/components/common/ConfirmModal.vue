<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  // モーダルの表示状態
  isVisible: Boolean,
  // モーダルのタイトル
  title: { type: String, default: '確認' },
  // メッセージ内容
  message: { type: String, default: '本当に実行しますか？' },
  // 実行ボタンのテキスト
  confirmText: { type: String, default: '実行する' },
})

const emit = defineEmits(['execute', 'close'])

/**
 * 実行
 */
const handleExecute = () => {
  emit('execute')
  close()
}

/**
 * モーダルを閉じる処理
 */
const close = () => {
  emit('close')
}
</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="modal-actions">
        <button class="button button-secondary" @click="close">キャンセル</button>
        <button class="button button-danger" @click="handleExecute">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>
