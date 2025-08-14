<script setup>
import { ref, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Windows from '@/components/icon/Windows.vue';
import Loader from "@/components/common/Loader.vue";

const router = useRouter();
const authStore = useAuthStore()

const password = ref("");

const input = useTemplateRef("input");

const login = async () => {

  if (password.value == "") {
    return;
  }

  input.value.blur();

  const success = await authStore.login(password.value)
  if (success) {
    router.push({ name: 'admin-dash' })
  } else {
    input.value.focus();
    input.value.select();
  }
};
</script>

<template>
    <form @submit.prevent="login" class="relative flex flex-col min-h-[90vh] justify-center items-center w-min m-auto">
        <input v-model="password" ref="input" type="password" class="rounded-md p-1.5 shadow-md bg-white/80 dark:bg-white/40 outline-none dark:placeholder-white/80" placeholder="kill switch" autofocus="on" autocomplete="off" />
        <button type="submit" :disabled="authStore.isLoading" class="absolute end-2">
            <Windows />
        </button>
    </form>

    <Loader v-if="authStore.isLoading" :hasBg="true" />
</template>