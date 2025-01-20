<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// ルート情報とルーター取得
const route = useRoute()
const router = useRouter()

// 記事データ（仮のデータ）
const article = ref({
  title: '',
  content: '',
  author: '',
  tags: '',
})

const articles = [
  {
    id: 1,
    title: 'Vue.js入門',
    content: 'Vue.jsはシンプルで強力なフレームワークです。',
    author: '管理者',
    tags: ['Vue', 'JavaScript'],
  },
  {
    id: 2,
    title: '状態管理の基礎',
    content: 'Piniaを使えば状態管理が楽になります。',
    author: 'ユーザー1',
    tags: ['State Management', 'Pinia'],
  },
]

// 記事データの取得
onMounted(() => {
  const id = Number(route.params.id)
  const foundArticle = articles.find((a) => a.id === id)
  if (foundArticle) {
    article.value = {
      ...foundArticle,
      tags: foundArticle.tags.join(', '), // カンマ区切りに変換
    }
  } else {
    alert('記事が見つかりません')
    router.push('/articles')
  }
})

// 記事の保存処理
const saveArticle = () => {
  console.log('編集された記事:', article.value)
  alert('記事が更新されました')
  router.push('/articles')
}

// 一覧に戻る
const goBackToList = () => {
  router.push('/articles')
}
</script>

<template>
  <div class="container">
    <button class="button button-secondary" @click="goBackToList">← 記事一覧に戻る</button>
    <h1>記事編集</h1>
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
  </div>
</template>
