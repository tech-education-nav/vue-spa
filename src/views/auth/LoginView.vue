<template>
  <div class="login-container">
    <div class="login-box">
      <h1>ログイン</h1>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">ユーザー名</label>
          <input
            v-model.trim="username"
            type="text"
            id="username"
            placeholder="ユーザー名を入力"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">パスワード</label>
          <input
            v-model.trim="password"
            type="password"
            id="password"
            placeholder="パスワードを入力"
            required
          />
        </div>

        <button type="submit" class="login-button" :disabled="!username || !password">
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
  font-family: Arial, sans-serif;
}

/* ログインボックス */
.login-box {
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

/* 見出し */
h1 {
  margin-bottom: 20px;
  color: #333;
}

/* 入力グループ */
.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

/* ログインボタン */
.login-button {
  width: 100%;
  padding: 12px;
  background: #4facfe;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-button:hover {
  background: #00c6ff;
}

.login-button[disabled] {
  background: #ccc;
}
</style>
