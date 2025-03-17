import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Authenticate from '@/views/Authenticate.vue';
import AdminDashboard from './views/AdminDashboard.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/authenticate', component: Authenticate },
  { path: '/admin-dashboard', component: AdminDashboard },
//   { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
