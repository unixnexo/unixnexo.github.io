import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {

    state: () => ({
        isAuthenticated: false,
        isLoading: false,
        error: null,
        urlFromEnv: import.meta.env.VITE_API_BASE_URL
    }),

    actions: {

        async login(password) {
          this.isLoading = true
          this.error = null
          
          try {
            const response = await axios.post(
              `${this.urlFromEnv}/api/auth/login`, { password }, { withCredentials: true }
            )
            
            if (response.data.success) {
                this.isAuthenticated = true
                return true
            }
            return false
          } catch (error) {
            this.error = error.response?.data?.message || 'Login failed'
            return false
          } finally {
            this.isLoading = false
          }
        },

        async checkAuthStatus() {
          // if (this.isLoading) return; // Prevent multiple simultaneous checks

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
            this.isLoading = true
            this.error = null
            
            try {
              await axios.post(
                `${this.urlFromEnv}/api/auth/logout`, { withCredentials: true }
              )
              this.isAuthenticated = false
              this.user = null
              return true
            } catch (error) {
              this.error = 'Logout failed'
              return false
            } finally {
              this.isLoading = false
            }
        }

    }

});