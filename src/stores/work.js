import { defineStore } from 'pinia';
import axios from 'axios';
import { useToastStore } from './toast';

export const useWorkStore = defineStore('work', {
  
  state: () => ({
    isLoading: false,
    error: null,
    urlFromEnv: import.meta.env.VITE_API_BASE_URL,
    works: [],
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

    async add(formData) {
      const toastStore = useToastStore();
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post(`${this.urlFromEnv}/api/Work`, formData, { withCredentials: true });
        if (response.status === 201) {
          if (response.data) {
            this.works.unshift(response.data); // Add to beginning of array
          }
          toastStore.showToast('Added general info', 'success');
          return true;
        }
        return false;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to add work';
        toastStore.showToast(this.error, 'error');
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async update(formData) {
      const toastStore = useToastStore();
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.put(`${this.urlFromEnv}/api/Work`, formData, { withCredentials: true });
        if (response.status === 200) {
          const index = this.works.findIndex(work => work.id === formData.Id);
          if (index !== -1) {
            // Update only the fields that were sent
            this.works[index] = {
              ...this.works[index], // Keep all existing properties
              title: formData.Title || this.works[index].title, // Update title if provided, otherwise keep old value
              githubUrl: formData.GithubUrl || this.works[index].githubUrl,
              websiteUrl: formData.WebsiteUrl || this.works[index].websiteUrl
            };
          }
          toastStore.showToast('Updated work', 'success');
          return true;
        }
        return false;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update work';
        toastStore.showToast(this.error, 'error');
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async delete(id) {
      const toastStore = useToastStore();
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.delete(`${this.urlFromEnv}/api/Work/${id}`, { withCredentials: true });
        if (response.status === 200) {
          this.works = this.works.filter(work => work.id !== id);
          toastStore.showToast('Delete successful', 'success');
          return true;
        }
        return false;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete work';
        toastStore.showToast(this.error, 'error');
        return false;
      } finally {
        this.isLoading = false;
      }

    },

  }

});