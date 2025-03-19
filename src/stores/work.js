import { defineStore } from 'pinia';
import axios from 'axios';
import { useToastStore } from './toast';

export const useWorkStore = defineStore('work', {
  
  state: () => ({
    isLoading: false,
    error: null,
    urlFromEnv: import.meta.env.VITE_API_BASE_URL,
    works: [],
    currentWork: {
      id: null,
      title: '',
      githubUrl: '',
      websiteUrl: '',
      createdAt: '',
    }
  }),

  actions: {

    async get() {
      const toastStore = useToastStore();
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(`${this.urlFromEnv}/api/Work`);
        this.works = response.data;
        return this.work;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch works';
        toastStore.showToast(this.error, 'error');
        return null;
      } finally {
        this.isLoading = false;
      }
    },

  }

});