<script setup>
import { computed, watch, ref } from 'vue';
import X from '@/components/icon/X.vue';

const props = defineProps({
    text: {
        type: String,
        default: '¯\_(ツ)_/¯'
    },
    type: {
        // info, error, success
        type: String,
        default: "Info"
    }
});

const show = defineModel('show', { type: Boolean, default: false });

const bgClass = computed(() => ({
  "bg-blue-500/80": props.type === "info",
  "bg-red-500/80": props.type === "error",
  "bg-green-500/80": props.type === "success",
}));


watch(() => props.show, (newVal) => {
    if (newVal == true) {
        setTimeout(() => {
            hideToaster();
        }, 3000);
    }
});

const hideToaster = () => {
    show.value = false;
};

</script>

<template>
    <div :class="[bgClass, { show: show }]" class="toaster-div absolute top-0 -translate-y-20 left-1/2 -translate-x-1/2 flex items-center rounded-lg p-3 shadow-sm space-x-7 min-w-64 transition-transform z-50">
        <div class="grow">
            <p>{{ props.text }}</p>
        </div>
        <div>
            <button @click="hideToaster" class="flex hover:bg-white/30 p-0.5 rounded-lg transition-colors">
                <X />
            </button>
        </div>
    </div>
</template>

<style scoped>
.toaster-div {
    transition-duration: 1s;
    transition-timing-function: cubic-bezier(1, 0, 0, 1);
}
.show {
    transform: translateY(100px) translateX(-50%) !important;
}
</style>