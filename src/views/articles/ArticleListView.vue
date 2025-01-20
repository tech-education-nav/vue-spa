<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// ダミーデータ（本番ではAPI経由で取得）
const articles = ref([])

const router = useRouter()

// 記事の一覧データを取得（仮のデータ）
onMounted(() => {
  articles.value = [
    { id: 1, title: 'Vue.js入門', createdAt: '2025-01-10', author: '管理者' },
    { id: 2, title: '状態管理の基礎', createdAt: '2025-01-12', author: 'ユーザー1' },
  ]
})

// 記事の新規作成画面へ遷移
const handleCreate = () => {
  router.push('/articles/new')
}

// 記事の編集画面へ遷移
const handleEdit = (id) => {
  router.push(`/articles/${id}/edit`)
}

// 記事の削除
const handleDelete = (id) => {
  if (confirm('本当に削除しますか？')) {
    articles.value = articles.value.filter((article) => article.id !== id)
  }
}
</script>

<template>
  <div class="container">
    <h1>記事一覧</h1>
    <div class="text-right">
      <button class="button button-primary" @click="handleCreate">+ 新規作成</button>
    </div>
    <template v-if="articles.length > 0">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>作成日</th>
            <th>作成者</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.id }}</td>
            <td>
              <router-link :to="`/articles/${article.id}`">{{ article.title }}</router-link>
            </td>
            <td>{{ article.createdAt }}</td>
            <td>{{ article.author }}</td>
            <td>
              <button class="button button-success" @click="handleEdit(article.id)">編集</button>
              <button class="button button-danger" @click="handleDelete(article.id)">削除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <p>記事はありません。</p>
    </template>
  </div>
</template>
