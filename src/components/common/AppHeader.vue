<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.replace('/login')
}
</script>

<template>
  <nav class="app-header">
    <div class="app-header-left">
      <button class="button text-button" @click="router.push('/')">ホーム</button>
    </div>
    <div class="app-header-right">
      <span v-if="authStore.isAuthenticated">ログイン中: {{ authStore.user?.username || '' }}</span>
      <button class="button button-secondary" @click="handleLogout">ログアウト</button>
    </div>
  </nav>
</template>
