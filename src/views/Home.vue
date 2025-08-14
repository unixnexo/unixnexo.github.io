<script setup>
import Home from '@/components/layout/Home.vue';
import SayHi from '@/components/layout/SayHi.vue';
import FooterSec from '@/components/layout/FooterSec.vue';
import Loader from '@/components/common/Loader.vue';
import Works from '@/components/layout/Works.vue';

import { ref} from 'vue';
import Stack from '@/components/layout/Stack.vue';
import Jobs from '@/components/layout/Jobs.vue';


const isLoaded = ref(false);

const updateLoading = (value) => {
    isLoaded.value = value;
};
</script>

<template>
    <Loader v-if="!isLoaded" />
    <div v-show="isLoaded">
        <Home :isLoaded="isLoaded" @update:isLoaded="updateLoading" />
        <Stack />
        <Jobs />
        <!-- <Works /> -->
        <SayHi />
        <FooterSec />
    </div>
</template>