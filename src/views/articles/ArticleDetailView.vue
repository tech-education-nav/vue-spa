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
  <div class="article-detail-container" v-if="article">
    <button class="back-button" @click="goBackToList">← 記事一覧に戻る</button>

    <h1>{{ article.title }}</h1>
    <p class="meta-info">
      <strong>作成者:</strong> {{ article.author }} | <strong>作成日:</strong>
      {{ new Date(article.createdAt).toLocaleDateString() }}
    </p>

    <div class="article-content">
      <p>{{ article.content }}</p>
    </div>

    <div class="tags">
      <strong>タグ:</strong>
      <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </div>

  <div v-else class="not-found">
    <p>記事が見つかりません。</p>
    <button class="back-button" @click="goBackToList">← 記事一覧に戻る</button>
  </div>
</template>

<style scoped>
/* 記事詳細コンテナ */
.article-detail-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* 一覧に戻るボタン */
.back-button {
  background: #7f8c8d;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-bottom: 20px;
}

.back-button:hover {
  background: #636e72;
}

/* 見出し */
h1 {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* メタ情報 */
.meta-info {
  font-size: 16px;
  color: #34495e;
  margin-bottom: 20px;
}

/* 記事本文 */
.article-content {
  font-size: 18px;
  line-height: 1.6;
  color: #2c3e50;
  background: #fff;
  padding: 20px 0;
  border-radius: 5px;
}

/* タグスタイル */
.tags {
  margin-top: 20px;
}

.tag {
  display: inline-block;
  padding: 5px 10px;
  margin-left: 10px;
  background: #3498db;
  color: white;
  border-radius: 5px;
  font-size: 14px;
}

/* 記事が見つからない場合のスタイル */
.not-found {
  text-align: center;
  padding: 50px;
  font-size: 20px;
  color: #e74c3c;
}
</style>
