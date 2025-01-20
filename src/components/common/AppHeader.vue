<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <nav class="app-header">
    <div class="app-header-left">
      <button class="button text-button" @click="router.push('/')">ホーム</button>
    </div>
    <div class="app-header-right">
      <span>XXX さん</span>
      <button class="button button-secondary" @click="router.replace('/login')">ログアウト</button>
    </div>
  </nav>
</template>
