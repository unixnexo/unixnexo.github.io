<script setup>
import Github from '../icon/Github.vue';
import Link from '../icon/Link.vue';

const props = defineProps({
    id: Number,
    title: String,
    url: String,
    repoUrl: String,
})

</script>

<template>
    <div class="flex divide-x-2 items-center divide-gray-500 dark:divide-white/60 bg-white/30 rounded-md p-2 shadow-md border">
        <div class="shrink-0 pr-3" style="width: 5ch;">
            <span># {{ props.id }}</span>
        </div>
        <div class="grow px-3">
            <p class="line-clamp-1">{{ props.title }}</p>
        </div>
        <div class="flex space-x-1.5 pl-3">
            <a :href="props.repoUrl" target="_blank">
                <Github size="18" />
            </a>
            <a :href="props.url" target="_blank">
                <Link size="16" />
            </a>
        </div>
    </div>
</template>