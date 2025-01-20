<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// ルート情報とルーター取得
const route = useRoute()
const router = useRouter()

// 記事データの状態
const article = ref(null)
const isLoading = ref(false)
const error = ref('')

/**
 * 指定された記事を取得する
 * @param {number} id 記事ID
 */
const fetchArticle = async (id) => {
  isLoading.value = true
  try {
    const response = await fetch(`http://localhost:3000/articles/${id}`)
    if (!response.ok) {
      throw new Error(`サーバーエラー: ${response.status}`)
    }

    const data = await response.json()
    article.value = data
  } catch (err) {
    error.value = '記事の取得に失敗しました。時間を置いて再試行してください。'
    console.error('記事取得エラー:', err)
  }
  isLoading.value = false
}

// コンポーネントのマウント時に記事を取得
onMounted(() => {
  const id = Number(route.params.id)
  if (isNaN(id)) {
    error.value = '不正な記事IDです'
    return
  }
  fetchArticle(id)
})

/**
 * 記事一覧に戻る処理
 */
const handleBackList = () => {
  router.push('/articles')
}
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
