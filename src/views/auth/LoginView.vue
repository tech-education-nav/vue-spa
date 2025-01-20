<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  const { isSuccess, error } = await authStore.login(email.value, password.value)
  if (isSuccess) {
    router.replace('/')
  } else {
    errorMessage.value = error
  }
}
</script>

<template>
  <div class="login-container">
    <div class="container login-box">
      <h1>ログイン</h1>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">ユーザー名</label>
          <input
            v-model.trim="email"
            type="text"
            id="email"
            placeholder="メールアドレスを入力"
            autocomplete="email"
            require
          />
        </div>

        <div class="form-group">
          <label for="password">パスワード</label>
          <input
            v-model.trim="password"
            type="password"
            id="password"
            placeholder="パスワードを入力"
            autocomplete="current-password"
            required
          />
        </div>

        <button type="submit" class="button button-primary" :disabled="!email || !password">
          ログイン
        </button>
      </form>
    </div>
  </div>
</template>

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
  width: 400px;
}
</style>
