import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    /**
     * 認証判定
     */
    isAuthenticated: (state) => {
      return !!state.token && !!state.user
    },
  },
  actions: {
    /**
     * ユーザーのログイン処理を行い、認証結果を返す
     *
     * @param {string} email - メールアドレス
     * @param {string} password - パスワード
     * @returns {Promise<{ isSuccess: boolean, error: string }>}
     *  - `isSuccess`: 認証成功時は `true`、失敗時は `false`
     *  - `error`: 認証エラーメッセージまたは空文字
     */
    async login(email, password) {
      try {
        // APIリクエスト
        const response = await fetch('http://localhost:3000/users')

        if (!response.ok) {
          throw new Error(`サーバーエラー: ${response.status}`)
        }

        const users = await response.json()

        // 該当するユーザーを検索（管理者のみログイン可能）
        const matchedUser = users.find(
          (u) => u.email === email && u.password === password && u.role === 'admin',
        )

        if (matchedUser) {
          // 擬似アクセストークンの生成（Base64エンコード）
          const token = btoa(`${matchedUser.id}:${matchedUser.email}`)
          this.user = { id: matchedUser.id, email: matchedUser.email, role: matchedUser.role }
          this.token = token

          // 認証情報をローカルストレージに保存
          localStorage.setItem('authToken', token)
          localStorage.setItem('authUser', JSON.stringify(this.user))

          return { isSuccess: true, error: '' }
        } else {
          return {
            isSuccess: false,
            error: '認証エラーが発生しました。',
          }
        }
      } catch (error) {
        console.error('ログインエラー:', error.message)
        return {
          isSuccess: false,
          error: 'システムエラーが発生しました。時間をおいて再度お試しください。',
        }
      }
    },
    /**
     * ログアウト
     */
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
    },
    /**
     * ローカルストレージから認証情報を復元
     * ナビゲーションガードで使用
     */
    loadAuthState() {
      const token = localStorage.getItem('authToken')
      const user = JSON.parse(localStorage.getItem('authUser'))
      if (token && user) {
        this.token = token
        this.user = user
      }
    },
  },
})
