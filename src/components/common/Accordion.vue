<script setup>
const props = defineProps({
    title: {
        type: String,
        default: "🔥"
    },
    titleBgColor: {
        type: String,
        default: "bg-transparent"
    }
});

</script>

<template>
    <details class="border border-black/50 dark:border-white/50 rounded-md shadow">
        <summary :class="props.titleBgColor" class="p-2 rounded-md cursor-pointer">{{ title }}</summary>
        <div class="p-2 my-5">
            <slot></slot>
        </div>
    </details>
</template>