<script setup>
import { computed } from 'vue'
import { useArticle } from '@/composables/useArticle'

const { isLoading, error, article, createArticle, handleBackList } = useArticle()

// 記事データの状態

/**
 * 入力値がすべて埋まっているかチェック
 * @returns {boolean} フォームが無効かどうか
 */
const isSubmitDisabled = computed(() => {
  return !(article.value.title && article.value.content && article.value.author)
})
</script>

<template>
  <div class="container">
    <button class="button button-secondary" @click="handleBackList">← 記事一覧に戻る</button>
    <h1>記事の新規作成</h1>

    <template v-if="isLoading">
      <p class="loading">投稿中...</p>
    </template>

    <template v-else>
      <form @submit.prevent="createArticle">
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

        <button type="submit" class="button button-primary" :disabled="isSubmitDisabled">
          投稿
        </button>
      </form>
    </template>

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>
