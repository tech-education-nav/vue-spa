<script setup>
import { useArticle } from '@/composables/useArticle'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// ルート情報とルーター取得
const route = useRoute()
const articleId = computed(() => route.params.id)
// 記事データの状態
const { article, isLoading, error, fetchArticle, updateArticle, handleBackList } = useArticle()

// コンポーネントのマウント時に記事データを取得
onMounted(() => {
  fetchArticle(articleId.value)
})
</script>

<template>
  <div class="container">
    <button class="button button-secondary" @click="handleBackList">← 記事一覧に戻る</button>
    <h1>記事編集</h1>

    <template v-if="isLoading">
      <p class="loading">記事を読み込み中...</p>
    </template>

    <template v-else-if="error">
      <p class="error-message">{{ error }}</p>
    </template>

    <template v-else>
      <form @submit.prevent="updateArticle(articleId)">
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

        <button type="submit" class="button button-primary">保存</button>
      </form>
    </template>
  </div>
</template>
