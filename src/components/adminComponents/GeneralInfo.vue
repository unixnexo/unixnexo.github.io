<script setup>
import { onMounted, ref } from 'vue';
import { useGeneralInfoStore } from '@/stores/generalInfo';
import Accordion from '@/components/common/Accordion.vue';
import LabelInput from '@/components/common/LabelInput.vue';
import CustomButton from '@/components/common/CustomButton.vue';
import Loader from '../common/Loader.vue';

const generalInfoStore = useGeneralInfoStore();

const formData = ref({
  introText: '',
});
const selectedFile = ref(null);

onMounted(async () => {
    // Get GeneralInfo
    const success = await generalInfoStore.get();
    if (success) {
        formData.value.introText = generalInfoStore.generalInfo.introText;
    }
});

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];  
};

// Add or Update GeneralInfo
const handleSubmit = async () => {
    const formDataObj = new FormData();
    formDataObj.append('introText', formData.value.introText);

    if (selectedFile.value) {
        formDataObj.append('file', selectedFile.value); 
    }

    try {
        // Add
        await generalInfoStore.add(formDataObj);
    } catch (error) {
        if (error.message === "OnlyOneGeneralInfoAllowed") {
            // Update
            await generalInfoStore.update(formDataObj);
        }
    }
};

// Delete GeneralInfo
const handleDelete = async () => {
    const success = await generalInfoStore.delete();
    if (success) {
        formData.value = {
            introText: '',
            imgUrl: ''
        };
    }
};
</script>

<template>
    <Accordion title="General Info" titleBgColor="bg-blue-500/50">
        <form method="POST" @submit.prevent="handleSubmit">
            <div class="flex space-x-3">

                <div class="flex flex-col grow">
                    <LabelInput label="intro text" id="introText" v-model="formData.introText" />
                    <LabelInput label="profile" id="profile" inputType="file" marginTop="22px" v-model="formData.imgUrl" :onChangeFunc="handleFileChange" />
                    <div class="mt-auto space-x-2 pt-5">
                        <CustomButton title="send" bgColor="bg-green-600/70" btnType="submit" :btnDisable="generalInfoStore.isLoading" />
                        <CustomButton @click="handleDelete" title="DEL" bgColor="bg-red-600/70" :btnDisable="generalInfoStore.isLoading" />
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

    <Loader v-if="generalInfoStore.isLoading" :hasBg="true" />
</template>