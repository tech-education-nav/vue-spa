import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:3000/articles'

/**
 * 記事のCRUD処理を管理するコンポーサブル
 */
export const useArticle = () => {
  const articles = ref([])
  const article = ref({
    title: '',
    content: '',
    author: '',
    tags: '',
  })
  const isLoading = ref(false)
  const error = ref('')
  const router = useRouter()

  /**
   * 入力値がすべて埋まっているかチェック
   * @returns {boolean} フォームが無効かどうか
   */
  const isSubmitDisabled = computed(() => {
    return !(article.value.title && article.value.content && article.value.author)
  })

  /**
   * 記事一覧を取得する
   */
  const fetchArticles = async () => {
    isLoading.value = true
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`サーバーエラー: ${response.status}`)
      }
      articles.value = await response.json()
    } catch (err) {
      error.value = '記事一覧の取得に失敗しました。時間をおいて再試行してください。'
      console.error('記事一覧取得エラー:', err)
    }
    isLoading.value = false
  }

  /**
   * 記事詳細を取得する
   * @param {number} id 記事ID
   */
  const fetchArticle = async (id) => {
    isLoading.value = true
    try {
      const response = await fetch(`${API_URL}/${id}`)
      if (!response.ok) {
        throw new Error(`サーバーエラー: ${response.status}`)
      }
      const data = await response.json()
      article.value = {
        ...data,
      }
    } catch (err) {
      error.value = '記事の取得に失敗しました。時間をおいて再試行してください。'
      console.error('記事取得エラー:', err)
    }
    isLoading.value = false
  }

  /**
   * 記事を作成する
   */
  const createArticle = async () => {
    isLoading.value = true
    try {
      const newArticle = {
        ...article.value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags:
          article.value.tags.length > 0
            ? article.value.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag !== '')
            : [],
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle),
      })

      if (!response.ok) {
        throw new Error(`サーバーエラー: ${response.status}`)
      }
      router.push('/articles')
    } catch (err) {
      error.value = '記事の投稿に失敗しました。時間をおいて再試行してください。'
      console.error('記事投稿エラー:', err)
    }
    isLoading.value = false
  }

  /**
   * 記事を更新する
   * @param {number} id 記事ID
   */
  const updateArticle = async (id) => {
    isLoading.value = true
    try {
      const updatedArticle = {
        ...article.value,
        tags:
          article.value.tags.length > 0
            ? article.value.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag !== '')
            : [],
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedArticle),
      })

      if (!response.ok) {
        throw new Error(`サーバーエラー: ${response.status}`)
      }
      router.push('/articles')
    } catch (err) {
      error.value = '記事の更新に失敗しました。時間をおいて再試行してください。'
      console.error('記事更新エラー:', err)
    }
    isLoading.value = false
  }

  /**
   * 記事を削除する
   * @param {number} id 記事ID
   */
  const deleteArticle = async (id) => {
    isLoading.value = true
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error(`サーバーエラー: ${response.status}`)
      }
      articles.value = articles.value.filter((a) => a.id !== id)
    } catch (err) {
      error.value = '記事の削除に失敗しました。時間をおいて再試行してください。'
      console.error('記事削除エラー:', err)
    }
    isLoading.value = false
  }

  /**
   * 記事一覧へ戻る処理
   */
  const handleBackList = () => {
    router.push('/articles')
  }

  return {
    articles,
    article,
    isLoading,
    error,
    isSubmitDisabled,
    fetchArticles,
    fetchArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    handleBackList,
  }
}
