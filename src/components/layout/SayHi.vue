<script setup>
import { onMounted, ref } from 'vue';
import ContactCard from '../common/ContactCard.vue';
import MainTitle from '../common/MainTitle.vue';
import { useLinkToMeStore } from '@/stores/linkToMe';

const linkToMeStore = useLinkToMeStore();

onMounted(async () => {
    await linkToMeStore.get();
});

</script>

<template>
    <div id="SayHi">
        <MainTitle title="Say Hi to me" />

        <div class="flex justify-start flex-wrap gap-3 md:gap-5 mb-[74px] hover:*:bg-white/5 active:*:bg-black/5 *:transition-colors *:duration-200">
            <ContactCard v-for="link in linkToMeStore.links" :title="link.title" :href="link.url" :imageUrl="`${linkToMeStore.urlFromEnv}${link.imgUrl}`" />
        </div>
    </div>
</template>

