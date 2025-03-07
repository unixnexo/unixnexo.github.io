<script setup>
import { ref } from 'vue';
import { useIntersectionObserver } from '../composable/useIntersectionObserver';
import WorkItems from '../common/WorkItems.vue';
import MainTitle from '../common/MainTitle.vue';

const targetRef = ref(null);

const works = ref([
    { id: 1, title: 'Rock Paper Scissors', url: 'https://unixnexo.github.io/rock-paper-scissors/', repoUrl: 'https://github.com/unixnexo/rock-paper-scissors' },
    { id: 2, title: 'SoundCloud main page design', url: 'https://unixnexo.github.io/soundcloud-design/', repoUrl: 'https://github.com/unixnexo/soundcloud-design' },
    { id: 3, title: 'YouTube main page design', url: 'https://unixnexo.github.io/youtube-design/', repoUrl: 'https://github.com/unixnexo/youtube-design/' },
    { id: 4, title: 'Pinterest main page design', url: 'https://unixnexo.github.io/pinterest-design/', repoUrl: 'https://github.com/unixnexo/pinterest-design' },
    { id: 5, title: 'B Burgers menu design', url: 'https://unixnexo.github.io/B-Burgers/', repoUrl: 'https://github.com/unixnexo/B-Burgers/' },
]);

const { isVisible } = useIntersectionObserver(targetRef);   

</script>

<template>
    <div ref="targetRef" id="works" :class="{ 'fade-in': isVisible }" class="animate-div">
        <MainTitle title="Things I've worked on" />
    
        <div class="mb-[74px] space-y-3">
            <WorkItems v-for="work in works" :key="work.id" :id="work.id" :title="work.title" :url="work.url" :repoUrl="work.repoUrl"  />
        </div>
    </div>
</template>
