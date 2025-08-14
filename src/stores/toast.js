import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
  state: () => ({
    show: false,
    message: '',
    type: ''
  }),
  
  actions: {
    showToast(message, type = 'info') {
      this.message = message;
      this.type = type;
      this.show = true;
      
      setTimeout(() => {
        this.show = false;
      }, 2000);
    }
  }
});