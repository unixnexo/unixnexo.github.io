<script setup>
import NavBar from './components/layout/NavBar.vue';

</script>

<template>
    <div id="app" class="m-auto w-[var(--sm-width)] md:w-[var(--md-width)] lg:w-[var(--lg-width)] xl:w-[var(--xl-width)] max-w-[550px]">
        <NavBar />
        <RouterView />
    </div>
</template>

