<script setup>
import Home from './components/pages/Home.vue';
import SayHi from './components/pages/SayHi.vue';
import FooterSec from './components/pages/FooterSec.vue';
import NavBar from './components/layout/NavBar.vue';
import Loader from './components/common/Loader.vue';
import { computed } from 'vue';
import { useLoadImage } from '@/components/composable/useLoadImage'
// import { useFontLoader } from '@/components/composable/useFontLoader'
import Works from './components/pages/Works.vue';

const { isLoaded, isLoading, imageUrl } = useLoadImage();
// const { areFontsLoaded, isLoading: isFontLoading } = useFontLoader(); // for some reason with mixing this in the loader, it gets kinda messed up

// const isAppReady = computed(() => isLoaded && areFontsLoaded);

</script>

<template>
    <Loader v-if="isLoading" />
    <div v-show="isLoaded" id="app" class="m-auto w-[var(--sm-width)] md:w-[var(--md-width)] lg:w-[var(--lg-width)] xl:w-[var(--xl-width)] max-w-[550px]">
        <NavBar />
        <Home :image-url="imageUrl" :isLoaded="isLoaded" />
        <Works />
        <SayHi />
        <FooterSec />
    </div>
</template>

