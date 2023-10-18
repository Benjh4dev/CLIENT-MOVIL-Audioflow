import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import RegisterView from '../views/RegisterView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router