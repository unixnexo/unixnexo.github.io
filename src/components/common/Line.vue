<script setup>
const props = defineProps({
    w: {
        type: String,
        default: 'w-8 md:w-16',
    },
});
</script>

<template>
    <hr :class="w" class="h-0.5 border-0 rounded-sm bg-gray-600/50 dark:bg-white/30 inline-block">
</template>