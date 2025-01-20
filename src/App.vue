<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// ログインページではナビゲーションを表示しない
const isLoginPage = computed(() => route.path === '/login')
</script>

<template>
  <AppHeader v-if="!isLoginPage" />
  <RouterView />
</template>
