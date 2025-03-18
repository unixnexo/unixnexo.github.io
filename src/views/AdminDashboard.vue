<script setup>
import { onMounted } from 'vue';
import { useGeneralInfoStore } from '@/stores/generalInfo';
import Accordion from '@/components/common/Accordion.vue';
import LabelInput from '@/components/common/LabelInput.vue';
import CustomButton from '@/components/common/CustomButton.vue';

const generalInfoStore = useGeneralInfoStore();

onMounted(async () => {
    // Get GeneralInfo
    await generalInfoStore.get(); 
});

const handleSubmit = () => {
    console.log('submit');  
};

// Delete GeneralInfo
const handleDelete = async () => {
    const d = await generalInfoStore.delete();
    console.log(d);
};

</script>

<template>
    <div class="mt-20">
        <!-- General Info -->
        <Accordion title="General Info" titleBgColor="bg-blue-500/50">
            <form method="POST" @submit.prevent="handleSubmit">
                <div class="flex space-x-3">

                    <div class="flex flex-col grow">
                        <LabelInput label="intro text" id="introText" :inputValue="generalInfoStore.generalInfo.introText" />
                        <LabelInput label="profile" id="profile" inputType="file" marginTop="22px" />
                        <div class="mt-auto space-x-2 pt-5">
                            <CustomButton title="send" bgColor="bg-green-600/70" btnType="submit" />
                            <CustomButton @click="handleDelete" title="DEL" bgColor="bg-red-600/70" />
                        </div>
                    </div>

                    <div class="w-28 xsm:w-32 sm:w-40 self-center h-fit shrink-0 rounded-md overflow-hidden">
                        <div class="size-full object-cover">
                            <img :src="`${generalInfoStore.urlFromEnv}${generalInfoStore.generalInfo.imgUrl}`" class="size-full object-cover" alt="profile picture" loading="lazy">
                        </div>
                    </div>

                </div>
            </form>
        </Accordion>
    </div>
</template>