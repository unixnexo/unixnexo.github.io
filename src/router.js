import { createRouter, createWebHashHistory  } from 'vue-router';
import { useAuthStore } from './stores/auth';
import Home from '@/views/Home.vue';
import Authenticate from '@/views/Authenticate.vue';
import AdminDashboard from './views/AdminDashboard.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/authenticate', name: 'authenticate', component: Authenticate, meta: { requiresGuest: true } },
  { path: '/admin-dashboard', name: 'admin-dash' , component: AdminDashboard, meta: { requiresAuth: true } },
//   { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory (),
  routes,
});

// Navigation guard to check authentication status before each route change
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.checkAuthStatus();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'authenticate' })
  }
  
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: 'admin-dash' })
  }
  
  return next()
})

export default router;
