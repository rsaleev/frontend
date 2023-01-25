import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const appTitle = process.env.VUE_APP_TITLE

// function hasAccess(to, from, next) {
//   let path = to.replace('/', '')
//   if (permissions.getResourceAccess(path)) {
//     next(to)
//   } else {
//     next(from)
//   }
// }

// function checkAuth(to, from, next) {
//   if (store.getters['auth/TOKEN_GET']) {
//     next('/')
//   }
// }

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Главная', requiresAuth: false }
  },
  {
    path: '/login',
    name: 'auth',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'Авторизация',
      requiresAuth: true,
      routeScope: null
    }
  },
  {
    path: '/objects',
    name: 'objects',
    component: () => import('../views/ObjectsView.vue'),
    meta: {
      title: 'Объекты',
      requiresAuth: false,
      routeScope: null
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFoundView,
    meta: {
      title: 'Страница не найдена',
      requiresAuth: false,
      routeScope: null
    }
  }
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //  подставновка наименования пути в окно браузера
  document.title = to.meta.title + ' - ' + appTitle
  // проверка авторизации
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (store.getters['auth/LOGGED_IN_GET']) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
