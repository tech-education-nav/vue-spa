<script setup>
import { useArticle } from '@/composables/useArticle'
import ArticleForm from '@/components/articles/ArticleForm.vue'

const { isLoading, error, article, isSubmitDisabled, createArticle, handleBackList } = useArticle()

// 記事データの状態
</script>

<template>
  <div class="container">
    <button class="button button-secondary" @click="handleBackList">← 記事一覧に戻る</button>
    <h1>記事の新規作成</h1>

    <template v-if="isLoading">
      <p class="loading">投稿中...</p>
    </template>

    <template v-else>
      <ArticleForm
        v-model:article="article"
        @submit="createArticle"
        :isDisabled="isSubmitDisabled"
      />
    </template>

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>
