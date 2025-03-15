<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import ContactCard from '../common/ContactCard.vue';
import MainTitle from '../common/MainTitle.vue';

const urlFromEnv = import.meta.env.VITE_API_BASE_URL;

const links = ref([]);

const getData = async () => {
 try {
    const response = await axios.get(`${urlFromEnv}/api/LinkToMe`);
    links.value = response.data;
 } catch (error) {
    console.error("Error fetching data:", error);
 }
};
onMounted(getData);

</script>

<template>
    <div id="SayHi">
        <MainTitle title="Say Hi to me" />

        <div class="flex justify-start flex-wrap gap-3 md:gap-5 mb-[74px] hover:*:bg-white/5 active:*:bg-black/5 *:transition-colors *:duration-200">
            <ContactCard v-for="link in links" :title="link.title" :href="link.url" :imageUrl="`${urlFromEnv}${link.imgUrl}`" />
        </div>
    </div>
</template>

