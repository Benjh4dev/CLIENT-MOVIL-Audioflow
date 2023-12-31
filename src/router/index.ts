import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import RegisterView from '../views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import SongView from '@/views/SongView.vue';
import ProfileViewVue from '@/views/ProfileView.vue';
import PlaylistView from '@/views/PlaylistView.vue';
import { useMainStore } from '@/stores/main';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/register',
    component: RegisterView,
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/song',
    component: SongView,
  },
  {
    path: '/profile',
    component: ProfileViewVue,
    meta: { requiresAuth: true},
  },
  {
    name: 'Playlist',
    path: '/playlist/:id',
    component: PlaylistView,
    meta: { requiresAuth: true},
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardia de navegación para verificar autenticación
router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();

  if (to.meta.requiresAuth && !mainStore.token) {
    next('/');
    return;
  } else if ((to.path === '/login' || to.path === '/register') && mainStore.token) {
    next('/');
    return;
  }
  else {
    next();
  }
});

export default router