<script setup>
import { useArticle } from '@/composables/useArticle'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { isLoading, error, article, fetchArticle, handleBackList } = useArticle()

// ルート情報とルーター取得
const route = useRoute()

// コンポーネントのマウント時に記事を取得
onMounted(() => {
  const id = route.params.id
  fetchArticle(id)
})
</script>

<template>
  <div class="container">
    <button class="button button-secondary" @click="handleBackList">← 記事一覧に戻る</button>

    <template v-if="isLoading">
      <p class="loading">記事を読み込み中...</p>
    </template>

    <template v-else-if="error">
      <p class="error-message">{{ error }}</p>
    </template>

    <template v-else-if="article">
      <h1>{{ article.title }}</h1>
      <p class="meta-info">
        <strong>作成者:</strong> {{ article.author }} | <strong>作成日:</strong>
        {{ new Date(article.createdAt).toLocaleDateString() }}
      </p>
      <div class="content">
        <p>{{ article.content }}</p>
      </div>
      <div class="tags">
        <strong>タグ:</strong>
        <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </template>

    <template v-else>
      <p class="not-found">記事が見つかりません。</p>
    </template>
  </div>
</template>
