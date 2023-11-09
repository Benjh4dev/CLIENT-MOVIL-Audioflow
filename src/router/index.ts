import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import RegisterView from '../views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import SongView from '@/views/SongView.vue';
import { useMainStore } from '@/stores/main';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/registro',
    component: RegisterView,
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/cancion',
    component: SongView,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();

  if (to.meta.requiresAuth && !mainStore.$state.token) {
    next('/');
  } else {
    next();
  }
})

export default router