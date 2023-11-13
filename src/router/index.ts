import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import RegisterView from '../views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import SongView from '@/views/SongView.vue';
import ProfileViewVue from '@/views/ProfileView.vue';
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardia de navegación para verificar autenticación
router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();

  if (to.meta.requiresAuth && !mainStore.$state.token) {
    next('/');
    console.log('No autenticado');
    return;
  } else if ((to.path === '/login' || to.path === '/register') && mainStore.$state.token) {
    next('/');
    console.log('Autenticado, no puede acceder');
    return;
  }
  else {
    console.log('Autenticado');
    next();
  }
});

export default router