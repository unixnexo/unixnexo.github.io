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

    async add(formData) {
      const toastStore = useToastStore();
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post(`${this.urlFromEnv}/api/GeneralInfo`, 
          formData, 
          { 
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
        
        this.generalInfo = response.data;
        toastStore.showToast('Added general info', 'success');
        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to add general info';
        toastStore.showToast(this.error, 'error');
        return false;
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
        this.generalInfo =  {
          id: null,
          introText: '',
          imgUrl: ''
        };
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