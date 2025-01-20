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
const goToNewArticle = () => {
  router.push('/articles/new')
}

// 記事の編集画面へ遷移
const goToEditArticle = (id) => {
  router.push(`/articles/${id}/edit`)
}

// 記事の削除
const deleteArticle = (id) => {
  if (confirm('本当に削除しますか？')) {
    articles.value = articles.value.filter((article) => article.id !== id)
  }
}
</script>

<template>
  <div class="article-list-container">
    <h1>記事一覧</h1>
    <div class="actions">
      <button class="new-article-button" @click="goToNewArticle">+ 新規作成</button>
    </div>

    <table class="article-table">
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
            <router-link :to="`/articles/${article.id}`">
              {{ article.title }}
            </router-link>
          </td>
          <td>{{ article.createdAt }}</td>
          <td>{{ article.author }}</td>
          <td>
            <button class="edit-button" @click="goToEditArticle(article.id)">編集</button>
            <button class="delete-button" @click="deleteArticle(article.id)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* 記事一覧ページコンテナ */
.article-list-container {
  max-width: 1000px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* 見出し */
h1 {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* アクションボタン */
.actions {
  text-align: right;
  margin-bottom: 20px;
}

.new-article-button {
  padding: 12px 25px;
  font-size: 18px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.new-article-button:hover {
  background: #2980b9;
}

/* 記事一覧テーブル */
.article-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.article-table th,
.article-table td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.article-table th {
  background: #2c3e50;
  color: white;
}

/* 編集・削除ボタン */
.edit-button {
  padding: 8px 15px;
  margin-right: 10px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:hover {
  background: #219150;
}

.delete-button {
  padding: 8px 15px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background: #c0392b;
}
</style>
