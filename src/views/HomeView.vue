<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToArticles = () => {
  router.push('/articles')
}
</script>

<template>
  <div class="home-container">
    <h1>管理画面</h1>
    <p>以下のメニューから管理機能を選択してください。</p>
    <div class="menu">
      <button class="menu-item" @click="goToArticles">記事管理</button>
      <button class="menu-item" disabled>ユーザー管理（未実装）</button>
      <button class="menu-item" disabled>設定（未実装）</button>
    </div>
  </div>
</template>

<style scoped>
/* 全体のレイアウト */
.home-container {
  max-width: 800px;
  margin: 100px auto;
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* タイトル */
h1 {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* 説明 */
p {
  font-size: 18px;
  color: #34495e;
  margin-bottom: 30px;
}

/* メニューコンテナ */
.menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* メニューアイテム（ボタン） */
.menu-item {
  padding: 15px 0;
  font-size: 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
}

.menu-item:hover {
  background: #2980b9;
}

.menu-item:disabled {
  background: #7f8c8d;
  cursor: not-allowed;
}
</style>
