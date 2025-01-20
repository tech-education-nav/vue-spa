<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// ルート情報とルーター取得
const route = useRoute()
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
 * 記事データをAPIから取得する
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
    article.value = {
      ...data,
      tags: data.tags.join(', '), // カンマ区切りの文字列に変換
    }
  } catch (err) {
    error.value = '記事の取得に失敗しました。時間を置いて再試行してください。'
    console.error('記事取得エラー:', err)
  }
  isLoading.value = false
}

// コンポーネントのマウント時に記事データを取得
onMounted(() => {
  const id = route.params.id
  fetchArticle(id)
})

/**
 * 記事を更新する
 */
const saveArticle = async () => {
  isLoading.value = true
  try {
    const updatedArticle = {
      ...article.value,
      tags: article.value.tags.split(',').map((tag) => tag.trim()), // 文字列から配列に変換
    }

    const response = await fetch(`http://localhost:3000/articles/${route.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedArticle),
    })

    if (!response.ok) {
      throw new Error(`サーバーエラー: ${response.status}`)
    }
    router.push('/articles')
  } catch (err) {
    error.value = '記事の更新に失敗しました。時間を置いて再試行してください。'
    console.error('記事更新エラー:', err)
  }
  isLoading.value = false
}

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
    <h1>記事編集</h1>

    <template v-if="isLoading">
      <p class="loading">記事を読み込み中...</p>
    </template>

    <template v-else-if="error">
      <p class="error-message">{{ error }}</p>
    </template>

    <template v-else>
      <form @submit.prevent="saveArticle">
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
