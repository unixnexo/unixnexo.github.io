<script setup>
import { onMounted } from 'vue';
import NavBar from './components/layout/NavBar.vue';
import { useAuthStore } from './stores/auth';
import Toaster from './components/common/Toaster.vue';

const authStore = useAuthStore();

onMounted(async () => {
    const success = await authStore.checkAuthStatus();
});

</script>

<template>
    <div id="app" class="m-auto w-[var(--sm-width)] md:w-[var(--md-width)] lg:w-[var(--lg-width)] xl:w-[var(--xl-width)] max-w-[550px]">
        <NavBar />
        <RouterView />

        <Toaster :show="authStore.toast.show" :text="authStore.toast.message" :type="authStore.toast.type" />
    </div>
</template>

