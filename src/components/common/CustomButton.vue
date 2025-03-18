<script setup>
const props = defineProps({
    title: {
        type: String,
        default: "🔥"
    },
    btnType: {
        type: String,
        default: "button"
    },
    bgColor: {
        type: String,
        default: "bg-blue-300"
    }
});
</script>

<template>
    <button :type="props.btnType" :class="props.bgColor" class="py-0.5 px-4 rounded-md">{{ props.title }}</button>
</template>