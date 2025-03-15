<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import WorkItems from '../common/WorkItems.vue';
import MainTitle from '../common/MainTitle.vue';

const urlFromEnv = import.meta.env.VITE_API_BASE_URL;

const getData = async () => {
 try {
    const response = await axios.get(`${urlFromEnv}/api/Work`);
    works.value = response.data;
 } catch (error) {
    console.error("Error fetching data:", error);
 }
};
onMounted(getData);

const works = ref([]);

</script>

<template>
    <div id="works">
        <MainTitle title="Things I've worked on" />
    
        <div class="mb-[74px] space-y-3">
            <WorkItems v-for="(work, index) in works" :key="work.id" :id="works.length - index" :title="work.title" :url="work.websiteUrl" :repoUrl="work.githubUrl"  />
        </div>
    </div>
</template>
