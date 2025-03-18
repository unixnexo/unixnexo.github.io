<script setup>
const props = defineProps({
    label: {
        type: String,
        default: "🔥"
    },
    id: {
        type: String,
        require: true
    },
    inputType: {
        type: String,
        default: "text"
    },
    marginTop: {
        type: String,
        default: "0px"
    },
    inputValue: {
        type: String,
    }
});
</script>

<template>
    <div class="flex flex-col" :style="{ marginTop: `${props.marginTop}` }">
        <label :for="props.id" class="mb-1.5 text-sm text-black/50 dark:text-white/70">{{ props.label }}</label>
        <input 
            :type="props.inputType" 
            :id="props.id" 
            :name="props.id"
            :value="props.inputValue"
            v-bind="props.inputType === 'file' ? { accept: 'image/*' } : {}"
            class="w-full p-1.5 rounded-md bg-transparent border-2 border-black/50 dark:border-white/70 outline-none focus:border-black" 
            :placeholder="props.label" 
        />
    </div>
</template>