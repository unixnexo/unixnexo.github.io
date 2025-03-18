<script setup>
import { computed, watch } from 'vue';
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
  "bg-blue-500/90": props.type === "info",
  "bg-red-500/90": props.type === "error",
  "bg-green-500/90": props.type === "success",
}));


// watch(() => props.show, (newVal) => { // <= this is now being added in the auth store
//     if (newVal == true) {
//         setTimeout(() => {
//             hideToaster();
//         }, 2000);
//     }
// });

const hideToaster = () => {
    show.value = false;
};

</script>

<template>
    <div :class="[bgClass, { show: show }]" class="toaster-div absolute top-0 -translate-y-20 right-2 flex items-center rounded-lg p-3 shadow-sm space-x-7 min-w-[90vw] xsm:min-w-[80vw] sm:min-w-[50vw] md:min-w-64 transition-transform z-50">
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
    right: 8px;
    transition-duration: 1s;
    transition-timing-function: cubic-bezier(1, 0, 0, 1);
}
.show {
    transform: translateY(10px) !important;
}
</style>