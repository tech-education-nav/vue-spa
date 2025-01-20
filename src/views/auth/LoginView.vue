<template>
  <div class="login-container">
    <div class="container login-box">
      <h1>ログイン</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">ユーザー名</label>
          <input
            v-model.trim="username"
            type="text"
            id="username"
            placeholder="ユーザー名を入力"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">パスワード</label>
          <input
            v-model.trim="password"
            type="password"
            id="password"
            placeholder="パスワードを入力"
            required
          />
        </div>

        <button type="submit" class="button button-primary" :disabled="!username || !password">
          ログイン
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  alert(`ユーザー名: ${username.value}, パスワード: ${password.value}`)
  // 仮の処理、後で認証処理を追加
  router.push('/')
}
</script>

<style scoped>
/* 全体のコンテナ */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
/* ログインボックスの特定スタイル */
.login-box {
  min-width: 400px;
}
</style>
