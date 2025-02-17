<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// ルーターインスタンス
const router = useRouter()

// 記事データの状態
const article = ref({
  title: '',
  content: '',
  author: '',
  tags: '',
})
const isLoading = ref(false)
const error = ref('')

/**
 * 入力値がすべて埋まっているかチェック
 * @returns {boolean} フォームが無効かどうか
 */
const isSubmitDisabled = computed(() => {
  return !(article.value.title && article.value.content && article.value.author)
})

/**
 * 記事の新規作成処理
 * @async
 */
const handleSubmit = async () => {
  if (isSubmitDisabled.value) return

  const newArticle = {
    title: article.value.title,
    content: article.value.content,
    author: article.value.author,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: article.value.tags.split(',').map((tag) => tag.trim()), // カンマ区切りでタグを配列化
  }

  isLoading.value = true

  try {
    const response = await fetch('http://localhost:3000/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle),
    })

    if (!response.ok) {
      throw new Error(`サーバーエラー: ${response.status}`)
    }
    router.push('/articles')
  } catch (err) {
    error.value = '記事の投稿に失敗しました。時間をおいて再試行してください。'
    console.error('記事投稿エラー:', err)
  }
  isLoading.value = false
}

/**
 * 記事一覧に戻る
 */
const handleBackList = () => {
  router.push('/articles')
}
</script>

<template>
  <div class="container">
    <button class="button button-secondary" @click="handleBackList">← 記事一覧に戻る</button>
    <h1>記事の新規作成</h1>

    <template v-if="isLoading">
      <p class="loading">投稿中...</p>
    </template>

    <template v-else>
      <form @submit.prevent="handleSubmit">
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
