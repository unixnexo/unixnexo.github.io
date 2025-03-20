<script setup>
import Link from '../icon/Link.vue';

const props = defineProps({
    title: String,
    imageUrl: String,
    href: String
});

</script>

<template>
    <a :href="href" target="_blank" class="flex flex-col border rounded-xl shadow-md p-5 size-[48%] bg-white/30">
        <div class="grow flex mb-[32px]">
            <div class="grow">
                <img class="w-[52px] md:w-[74px]" :src="imageUrl" :alt="title" />
            </div>
            <div>
                <Link />
            </div>
        </div>
        <div>
            <p class="text-xl">{{ title }}</p>
        </div>
    </a>
</template>