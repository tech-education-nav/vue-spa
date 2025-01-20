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
const handleSubmit = () => {
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
const handleBackList = () => {
  router.push('/articles')
}
</script>

<template>
  <div class="container">
    <button class="button button-secondary" @click="handleBackList">← 記事一覧に戻る</button>
    <h1>記事の新規作成</h1>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">タイトル</label>
        <input id="title" v-model="title" type="text" required />
      </div>

      <div class="form-group">
        <label for="content">本文</label>
        <textarea id="content" v-model="content" required></textarea>
      </div>

      <div class="form-group">
        <label for="author">作成者</label>
        <input id="author" v-model="author" type="text" required />
      </div>

      <div class="form-group">
        <label for="tags">タグ（カンマ区切り）</label>
        <input id="tags" v-model="tags" type="text" />
      </div>

      <button type="submit" class="button button-primary" :disabled="isSubmitDisabled">投稿</button>
    </form>
  </div>
</template>
