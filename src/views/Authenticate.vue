<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Windows from '@/components/icon/Windows.vue';
import Toaster from '@/components/common/Toaster.vue';
import Loader from "@/components/common/Loader.vue";

const urlFromEnv = import.meta.env.VITE_API_BASE_URL;

const inRequest = ref(false);
const showMessage = ref(false);
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const login = async () => {
   showMessage.value = false;

  if (password.value == "") {
    return;
  }

  try {
    inRequest.value = true;
    const response = await axios.post(
      `${urlFromEnv}/api/auth/login`,
      { password: password.value }
    );

    console.log(response.data);

    // if (response.data.token) {
    //   localStorage.setItem("authToken", response.data.token); // Store token
    //   router.push("/dashboard"); // Redirect on success
    // }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Login failed";
    showMessage.value = true;
  }
  inRequest.value = false;
};
</script>

<template>
    <form @submit.prevent="login" class="relative flex flex-col min-h-[90vh] justify-center items-center w-min m-auto">
        <input v-model="password" type="password" class="rounded-md p-1.5 shadow-md bg-white/80 dark:bg-white/40 outline-none dark:placeholder-white/80" placeholder="kill switch" autofocus="on" autocomplete="off" />
        <button type="submit" class="absolute end-2">
            <Windows />
        </button>
    </form>

    <Toaster :show="showMessage" :text="errorMessage" type="error" />

    <Loader v-if="inRequest" :hasBg="true" />
</template>