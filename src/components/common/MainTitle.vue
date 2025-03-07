<script setup>
import Line from './Line.vue';

const props = defineProps({
    title: String,
    mb: {
        type: Number,
        default: 32, // in pixel
    },
});
</script>

<template>
    <div :style="{ marginBottom: `${mb}px` }" class="space-x-2 text-black/50 dark:text-white/50">
        <Line />
        <span>{{ props.title }}</span>
        <Line w="w-24 md:w-44" />
    </div>
</template>