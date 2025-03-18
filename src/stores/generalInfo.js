import { defineStore } from 'pinia';
import axios from 'axios';
import { useToastStore } from './toast';

export const useGeneralInfoStore = defineStore('generalInfo', {
  
  state: () => ({
    isLoading: false,
    error: null,
    urlFromEnv: import.meta.env.VITE_API_BASE_URL,
    generalInfo: {
      id: null,
      introText: '',
      imgUrl: ''
    }
  }),

  actions: {

    async get() {
      const toastStore = useToastStore();
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(`${this.urlFromEnv}/api/GeneralInfo`);
        this.generalInfo = response.data;
        return this.generalInfo;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch general info';
        toastStore.showToast(this.error, 'error');
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    async delete() {
      const toastStore = useToastStore();
      this.isLoading = true;
      this.error = null;

      try {
        await axios.delete(`${this.urlFromEnv}/api/GeneralInfo`, { withCredentials: true });
        toastStore.showToast('Delete successful', 'success');
        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete general info';
        toastStore.showToast(this.error, 'error');
        return false;
      } finally {
        this.isLoading = false;
      }

    },

  }

});