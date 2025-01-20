<script setup>
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const articles = ref([])
// 削除処理関連
const isModalVisible = ref(false)
const deletableArticleId = ref(null)

/**
 * 記事一覧データを取得する
 */
const fetchArticles = async () => {
  try {
    const response = await fetch('http://localhost:3000/articles')
    if (!response.ok) {
      throw new Error(`データの取得に失敗しました。ステータスコード: ${response.status}`)
    }
    articles.value = await response.json()
  } catch (error) {
    console.error('記事一覧の取得エラー:', error)
    alert('記事一覧の取得に失敗しました')
  }
}

// コンポーネントがマウントされたら記事一覧を取得
onBeforeMount(fetchArticles)

/**
 * 記事の新規作成画面へ遷移する
 */
const handleCreate = () => {
  router.push('/articles/new')
}

/**
 * 記事の編集画面へ遷移する
 * @param {number} id 記事ID
 */
const handleEdit = (id) => {
  router.push(`/articles/${id}/edit`)
}

/**
 * 削除確認モーダルを開く
 * @param {number} id 記事ID
 */
const openDeleteModal = (id) => {
  deletableArticleId.value = id
  isModalVisible.value = true
}

/**
 * 削除実行
 */
const deleteArticle = async () => {
  try {
    const response = await fetch(`http://localhost:3000/articles/${deletableArticleId.value}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`削除に失敗しました。ステータスコード: ${response.status}`)
    }
    articles.value = articles.value.filter((article) => article.id !== deletableArticleId.value)
    deletableArticleId.value = null
  } catch (error) {
    console.error('記事削除エラー:', error)
    alert('記事の削除に失敗しました')
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
              <button class="button button-danger" @click="openDeleteModal(article.id)">
                削除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <p>記事はありません。</p>
    </template>
  </div>
  <!-- 削除確認モーダル -->
  <ConfirmModal
    :isVisible="isModalVisible"
    title="記事削除"
    message="本当にこの記事を削除しますか？"
    confirmText="削除する"
    @execute="deleteArticle"
    @close="isModalVisible = false"
  />
</template>
