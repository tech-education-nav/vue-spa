<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// フォームデータの定義
const title = ref('')
const content = ref('')
const author = ref('')
const tags = ref('')
const router = useRouter()

// 投稿ボタンの無効化を算出プロパティで制御
const isSubmitDisabled = computed(() => {
  return !(title.value && content.value && author.value)
})

// 記事の投稿処理
const submitArticle = () => {
  if (isSubmitDisabled.value) return

  const newArticle = {
    id: Date.now(),
    title: title.value,
    content: content.value,
    author: author.value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: tags.value.split(',').map((tag) => tag.trim()), // カンマ区切りでタグを配列化
  }

  console.log('新しい記事が投稿されました:', newArticle)
  alert('記事が投稿されました')
  router.push('/articles') // 記事一覧に戻る
}

// 記事一覧に戻る
const goToArticles = () => {
  router.push('/articles')
}
</script>

<template>
  <div class="new-article-container">
    <div class="top-actions">
      <button class="back-button" @click="goToArticles">← 記事一覧に戻る</button>
    </div>

    <h1>記事の新規作成</h1>

    <form @submit.prevent="submitArticle">
      <div class="form-group">
        <label for="title">タイトル</label>
        <input id="title" v-model="title" type="text" placeholder="タイトルを入力" required />
      </div>

      <div class="form-group">
        <label for="content">本文</label>
        <textarea id="content" v-model="content" placeholder="本文を入力" required></textarea>
      </div>

      <div class="form-group">
        <label for="author">作成者</label>
        <input id="author" v-model="author" type="text" placeholder="作成者名を入力" required />
      </div>

      <div class="form-group">
        <label for="tags">タグ（カンマ区切り）</label>
        <input id="tags" v-model="tags" type="text" placeholder="例: Vue, JavaScript" />
      </div>

      <button type="submit" class="submit-button" :disabled="isSubmitDisabled">投稿</button>
    </form>
  </div>
</template>

<style scoped>
/* 全体コンテナ */
.new-article-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* 一覧へ戻るボタン */
.top-actions {
  text-align: left;
  margin-bottom: 20px;
}

.back-button {
  background: #7f8c8d;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
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

/* フォームグループ */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #34495e;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

/* テキストエリアのサイズ調整 */
textarea {
  height: 150px;
}

/* 投稿ボタン（下部横幅いっぱい） */
.submit-button {
  width: 100%;
  background: #27ae60;
  color: white;
  padding: 15px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background: #219150;
}

/* 投稿ボタンの無効化スタイル */
.submit-button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}
</style>
