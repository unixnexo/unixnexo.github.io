import { defineStore } from 'pinia';
import axios from 'axios';
import { useToastStore } from './toast';

export const useAuthStore = defineStore('auth', {

  state: () => ({
    isAuthenticated: false,
    isLoading: false,
    error: null,
    urlFromEnv: import.meta.env.VITE_API_BASE_URL,
  }),

  actions: {

    async login(password) {
      const toastStore = useToastStore();
      this.isLoading = true
      this.error = null
      
      try {
        const response = await axios.post(
          `${this.urlFromEnv}/api/auth/login`, { password }, { withCredentials: true }
        );
        
        if (response.data.success) {
          this.isAuthenticated = true;
          toastStore.showToast('Login successful', 'success');
          return true;
        }
        return false;
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
        toastStore.showToast(this.error, 'error');
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async checkAuthStatus() {
        this.isLoading = true;
        this.error = null;
        
        try {
          const response = await axios.get(
            `${this.urlFromEnv}/api/auth/status`, { withCredentials: true }
          )
          this.isAuthenticated = response.data.isAuthenticated;
          return this.isAuthenticated;
        } catch (error) {
          this.error = 'Failed to check authentication status';
          this.isAuthenticated = false;
          return false;
        } finally {
          this.isLoading = false;
        }
    },

    async logout() {
      const toastStore = useToastStore();
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.post(
          `${this.urlFromEnv}/api/auth/logout`, {}, { withCredentials: true }
        );
        
        if (response.data.success) {
          this.isAuthenticated = false;
          this.user = null;
          toastStore.showToast('Logout successful', 'success');
          return true;
        } else {
          this.error = response.data.message || 'Logout failed';
          toastStore.showToast(this.error, 'error');
          return false;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Logout failed';
        toastStore.showToast(this.error, 'error');
        return false;
      } finally {
        this.isLoading = false;
      }
    },

  
  }
});