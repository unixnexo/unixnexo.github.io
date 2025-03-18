<script setup>
import Logout from '../icon/Logout.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

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