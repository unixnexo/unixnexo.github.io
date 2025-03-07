<script setup>
import Link from '../icon/Link.vue';

const props = defineProps({
    title: String,
    imageUrl: String,
    href: String
});

</script>

<template>
    <a :href="href" target="_blank" class="flex flex-col border rounded-xl shadow-md h-[145px] w-[160px] md:h-[170px] md:w-[240px] p-5 bg-white/30">
        <div class="grow flex">
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