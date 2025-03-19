import { defineStore } from 'pinia';
import axios from 'axios';
import { useToastStore } from './toast';

export const useLinkToMeStore = defineStore('linkToMe', {

    state: () => ({
        isLoading: false,
        error: null,
        urlFromEnv: import.meta.env.VITE_API_BASE_URL,
        links: [],
    }),

    actions: {

        async get() {
          const toastStore = useToastStore();
          this.isLoading = true;
          this.error = null;
    
          try {
            const response = await axios.get(`${this.urlFromEnv}/api/LinkToMe`);
            this.links = response.data;
            return this.work;
          } catch (error) {
            this.error = error.response?.data?.message || 'Failed to fetch links to me';
            toastStore.showToast(this.error, 'error');
            return null;
          } finally {
            this.isLoading = false;
          }
        },

        async update(formData) {
            const toastStore = useToastStore();
            this.isLoading = true;
            this.error = null;
      
            try {
              const response = await axios.put(`${this.urlFromEnv}/api/LinkToMe`, 
                formData, 
                { 
                  withCredentials: true,
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                });
              
                if (response.status === 201) {
                    // Update the item in the local array
                    const id = parseInt(formData.get('Id'));
                    const index = this.links.findIndex(link => link.id === id);
                    
                    if (index !== -1) {
                        this.links[index] = {
                            ...this.links[index],
                            title: formData.get('Title') || this.links[index].title,
                            url: formData.get('Url') || this.links[index].url
                        };
                        
                        if (response.data && response.data.imgUrl) {
                            this.links[index].imgUrl = response.data.imgUrl;
                        }
                    }
                    
                    toastStore.showToast('Updated successfully', 'success');
                    return true;
                }
                return false;
            } catch (error) {
              this.error = error.response?.data?.message || 'Failed to update link to me';
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
              const response = await axios.delete(`${this.urlFromEnv}/api/LinkToMe/${id}`, { withCredentials: true });
              if (response.status === 200) {
                this.links = this.links.filter(link => link.id !== id);
                toastStore.showToast('Delete successful', 'success');
                return true;
              }
              return false;
            } catch (error) {
              this.error = error.response?.data?.message || 'Failed to delete links to me';
              toastStore.showToast(this.error, 'error');
              return false;
            } finally {
              this.isLoading = false;
            }
      
        },

    }

});