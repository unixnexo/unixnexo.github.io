<script setup>
import { ref, onMounted } from 'vue';
import WorkItems from '../common/WorkItems.vue';
import MainTitle from '../common/MainTitle.vue';
import { useWorkStore } from '@/stores/work';

const workStore = useWorkStore();

onMounted(async () => {
    await workStore.get();
});

</script>

<template>
    <div id="works">
        <MainTitle title="Things I've worked on" />
    
        <div class="mb-[74px] space-y-3">
            <WorkItems v-for="(work, index) in workStore.works" :key="work.id" :id="workStore.works.length - index" :title="work.title" :url="work.websiteUrl" :repoUrl="work.githubUrl"  />
        </div>
    </div>
</template>
