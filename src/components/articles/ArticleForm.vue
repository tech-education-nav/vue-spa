<script setup>
import { defineModel } from 'vue'

// 親コンポーネントから受け取る記事データ
const article = defineModel('article', { type: Object, required: true })

const props = defineProps({
  isDisabled: {
    type: Boolean,
  },
})

// 送信イベントの定義
const emit = defineEmits(['submit'])
</script>

<template>
  <div class="container">
    <form @submit.prevent="emit('submit')">
      <div class="form-group">
        <label for="title">タイトル</label>
        <input id="title" v-model="article.title" type="text" required />
      </div>

      <div class="form-group">
        <label for="content">本文</label>
        <textarea id="content" v-model="article.content" required></textarea>
      </div>

      <div class="form-group">
        <label for="author">作成者</label>
        <input id="author" v-model="article.author" type="text" required />
      </div>

      <div class="form-group">
        <label for="tags">タグ（カンマ区切り）</label>
        <input id="tags" v-model="article.tags" type="text" />
      </div>

      <button type="submit" :disabled="props.isDisabled" class="button button-primary">保存</button>
    </form>
  </div>
</template>
