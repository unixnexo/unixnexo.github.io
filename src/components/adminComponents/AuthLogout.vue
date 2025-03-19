<script setup>
import Logout from '@/components/icon/Logout.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
    const success = await authStore.logout();
    if (success) {
        router.push({ name: 'home' });
    } 
};


</script>

<template>
    <div @click="handleLogout" class="on-mouse">
        <Logout />
    </div>
</template>