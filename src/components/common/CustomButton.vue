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
    },
    btnDisable: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <button :type="props.btnType" :disabled="props.btnDisable" :class="props.bgColor" class="py-0.5 px-4 rounded-md disabled:opacity-45">{{ props.title }}</button>
</template>