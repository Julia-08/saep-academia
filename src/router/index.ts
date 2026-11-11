import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/Registro.vue'), 
    meta: { requiresGuest: true },
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: () => import('../views/Inicio.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/personais',
    name: 'personais',
    component: () => import('../views/Personais.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/alunos',
    name: 'alunos',
    component: () => import('../views/Alunos.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/treinos',
    name: 'treinos',
    component: () => import('../views/Treinos.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, _from) => {
  const token = localStorage.getItem('user_token')

  if (to.meta.requiresAuth && !token) {
    return '/login'
  }
  
  if (to.meta.requiresGuest && token) {
    return '/inicio'
  }

  return true
})

export default router