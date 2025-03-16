import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Authenticate from '@/views/Authenticate.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/Authenticate', component: Authenticate },
//   { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
