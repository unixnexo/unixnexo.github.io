<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const checkAuthStatus = async () => {
    const success = await authStore.checkAuthStatus();
    console.log(success, authStore.error);
};

onMounted(checkAuthStatus);

</script>

<template>
admin dash 
</template>