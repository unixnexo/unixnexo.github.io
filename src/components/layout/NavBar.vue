<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useDarkMode } from '../composable/useDarkMode';
import Sun from '../icon/Sun.vue';
import Moon from '../icon/Moon.vue';

const { theme, toggleTheme } = useDarkMode();

const nav = ref(null);
const isScrolled = ref(false);

const handleScroll = () => {
    const shouldBeScrolled = window.scrollY > 150;

    if (shouldBeScrolled !== isScrolled.value) {
        isScrolled.value = shouldBeScrolled;

        if (window.innerWidth >= 880) {            
            // big screen
            nav.value.classList.add('transition-opacity', 'duration-300', 'ease-linear');
            nav.value.classList.remove('transition-transform');

            if (shouldBeScrolled) {
                nav.value.classList.add('opacity-0');
                setTimeout(() => {
                    nav.value.classList.add('after-scroll-md');
                }, 300);
                setTimeout(() => {
                    nav.value.classList.remove('opacity-0');
                }, 400);
            } else {
                nav.value.classList.add('opacity-0');
                setTimeout(() => {
                    nav.value.classList.remove('after-scroll-md');
                }, 300);
                setTimeout(() => {
                    nav.value.classList.remove('opacity-0');
                }, 400);
            }
        }
        // sm screen
        else {
            nav.value.classList.remove('transition-opacity', 'duration-300', 'ease-linear');
            nav.value.classList.add('transition-transform');

            if (shouldBeScrolled) {
                nav.value.classList.add('-translate-y-20');
                setTimeout(() => {
                    nav.value.classList.add('after-scroll-sm');
                }, 300);
                setTimeout(() => {
                    nav.value.classList.remove('-translate-y-20');
                }, 400);
            } else {
                nav.value.classList.add('-translate-y-20');
                setTimeout(() => {
                    nav.value.classList.remove('after-scroll-sm');
                }, 300);
                setTimeout(() => {
                    nav.value.classList.remove('-translate-y-20');
                }, 300);
            }
        }

    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
    <nav ref="nav" class="flex m-auto pt-5 space-x-3 *:space-x-3.5 will-change-auto items-center">
        <div class="flex items-baseline">
            <a href="#home" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })" class="on-mouse">Home</a>
            <hr class="w-16 md:w-32 h-0.5 border-0 rounded-sm bg-gray-600 dark:bg-white/50 inline-block">
        </div>
        <div class="flex grow justify-end items-center">
            <a href="#works" class="on-mouse">Works</a>
            <a href="#SayHi" class="on-mouse">Say Hi</a>
            <Transition name="fade" mode="out-in">
                <div :key="theme">
                    <div v-if="theme === 'light'" @click="toggleTheme" class="on-mouse">
                        <Sun />
                    </div>
                    <div v-if="theme === 'dark'" @click="toggleTheme" class="on-mouse">
                        <Moon />
                    </div>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>