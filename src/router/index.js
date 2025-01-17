import { createRouter, createWebHistory } from 'vue-router'

// ルートコンポーネントのインポート
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import Error400View from '@/views/errors/Error400View.vue'
import ArticleIndexView from '@/views/articles/ArticleIndexView.vue'
import ArticleListView from '@/views/articles/ArticleListView.vue'
import ArticleDetailView from '@/views/articles/ArticleDetailView.vue'
import ArticleNewView from '@/views/articles/ArticleNewView.vue'
import ArticleEditView from '@/views/articles/ArticleEditView.vue'

// ルート定義
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/articles',
    component: ArticleIndexView, // 親コンポーネント
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'articles',
        component: ArticleListView,
      },
      {
        path: ':id',
        name: 'article-detail',
        component: ArticleDetailView,
        props: true,
      },
      {
        path: 'new',
        name: 'article-new',
        component: ArticleNewView,
      },
      {
        path: ':id/edit',
        name: 'article-edit',
        component: ArticleEditView,
        props: true,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error-404',
    component: Error400View,
  },
]

// ルーターの作成
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
