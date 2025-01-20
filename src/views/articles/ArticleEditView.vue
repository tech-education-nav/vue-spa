<script setup>
import ArticleForm from '@/components/articles/ArticleForm.vue'
import { useArticle } from '@/composables/useArticle'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// ルート情報とルーター取得
const route = useRoute()
const articleId = computed(() => route.params.id)
// 記事データの状態
const { article, isLoading, error, isSubmitDisabled, fetchArticle, updateArticle, handleBackList } =
  useArticle()

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
      <ArticleForm
        v-model:article="article"
        @submit="updateArticle(article.id)"
        :isDisabled="isSubmitDisabled"
      />
    </template>
  </div>
</template>
