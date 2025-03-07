<script setup>
import { ref } from 'vue';
import { useIntersectionObserver } from '../composable/useIntersectionObserver';

const targetRef = ref(null);
const { isVisible } = useIntersectionObserver(targetRef);

</script>

<template>
    <div ref="targetRef" id="footer" :class="{ 'fade-in': isVisible }" class="text-center pb-5 animate-div">
        <hr class="h-px mb-2 bg-gray-300 border-0 dark:bg-white/40">
        <small class="text-black/50 dark:text-white/50">First publish Feb 2025 by Ali Bolouki aka: unixnexo</small>
    </div>
</template>

<style scoped>
#footer {
  opacity: 0;
  transition: opacity 0.5s linear;
}
</style>