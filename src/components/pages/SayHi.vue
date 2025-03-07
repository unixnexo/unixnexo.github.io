<script setup>
import { ref } from 'vue';
import { useIntersectionObserver } from '../composable/useIntersectionObserver';
import ContactCard from '../common/ContactCard.vue';
import MainTitle from '../common/MainTitle.vue';

const targetRef = ref(null);
const { isVisible } = useIntersectionObserver(targetRef);

</script>

<template>
    <div ref="targetRef" id="SayHi" :class="{ 'fade-in': isVisible }" class="animate-div">
        <MainTitle title="Say Hi to me" />

        <div class="flex justify-start flex-wrap gap-3 md:gap-5 mb-[74px] hover:*:bg-white/5 active:*:bg-black/5 *:transition-colors *:duration-200">
            <ContactCard title="Github" href="https://github.com/unixnexo" imageUrl="/github.png" />
            <ContactCard title="Gmail" href="mailto:unixnexo@gmail.com" imageUrl="/gmail.png" />
            <ContactCard title="Telegram" href="https://t.me/unixnexo" imageUrl="/telegram.png" />
            <ContactCard title="SoundCloud" href="https://soundcloud.com/unixnexo" imageUrl="/soundcloud.png" />
        </div>
    </div>
</template>

