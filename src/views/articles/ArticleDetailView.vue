<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// ルート情報とルーター取得
const route = useRoute()
const router = useRouter()

// 記事データ（仮のデータ）
const article = ref(null)

// 仮のデータ一覧
const articles = [
  {
    id: 1,
    title: 'Vue.js入門',
    content: 'Vue.jsはシンプルで強力なフレームワークです。',
    author: '管理者',
    createdAt: '2025-01-07T12:00:00Z',
    updatedAt: '2025-01-07T12:00:00Z',
    tags: ['Vue', 'JavaScript'],
  },
  {
    id: 2,
    title: '状態管理の基礎',
    content: 'Piniaを使えば状態管理が楽になります。',
    author: 'ユーザー1',
    createdAt: '2025-01-08T10:00:00Z',
    updatedAt: '2025-01-08T10:00:00Z',
    tags: ['State Management', 'Pinia'],
  },
]

// TODO: 記事データの取得
onMounted(() => {
  const id = Number(route.params.id)
  article.value = articles.find((a) => a.id === id)
})

// 一覧に戻る処理
const goBackToList = () => {
  router.push('/articles')
}
</script>

<template>
  <div class="container" v-if="article">
    <button class="button button-secondary" @click="goBackToList">← 記事一覧に戻る</button>
    <h1>{{ article.title }}</h1>
    <p class="form-group">
      <strong>作成者:</strong> {{ article.author }} | <strong>作成日:</strong>
      {{ article.createdAt }}
    </p>
    <div class="form-group">
      <p>{{ article.content }}</p>
    </div>
    <div>
      <strong>タグ:</strong>
      <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </div>
</template>
