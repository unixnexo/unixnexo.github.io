<script setup>
import Accordion from '../common/Accordion.vue';
import { useLinkToMeStore } from '@/stores/linkToMe';
import { onMounted, ref, useTemplateRef } from 'vue';
import FormContentWrapper from '../common/FormContentWrapper.vue';
import LabelInput from '../common/LabelInput.vue';
import CustomButton from '../common/CustomButton.vue';
import Loader from '../common/Loader.vue';
import FormContentWrapperGradient from '../common/FormContentWrapperGradient.vue';

const linkToMeStore = useLinkToMeStore();

const formDataUpdate = ref({
    Id: 0,
    Title: '',
    Url: '',
});

const formDataCreate = ref({
    Title: '',
    Url: '',
});
const selectedFile = ref(null);
const createFormRef = useTemplateRef('createForm');

onMounted(async () => {
    // Get Links
    await linkToMeStore.get();
});

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];  
};

// Create
const handleCreate = async () => {
    if (!formDataCreate.value.Title.trim() && 
        !formDataCreate.value.Url.trim()) {
        return;
    }

    const formDataObj = new FormData();
    
    formDataObj.append('Title', formDataCreate.value.Title);
    formDataObj.append('Url', formDataCreate.value.Url);

    if (selectedFile.value) {
        formDataObj.append('File', selectedFile.value);
    }
    
    const success = await linkToMeStore.add(formDataObj);

    if (success) {
        formDataCreate.value = {
            Title: '',
            Url: ''
        };
        selectedFile.value = null;
        createFormRef.value.reset();
    }

};

// Update
const handleUpdate = async (link) => {
    formDataUpdate.value = {
        Id: link.id,
        Title: link.title,
        Url: link.url
    };

    const formDataObj = new FormData();

    formDataObj.append('Id', formDataUpdate.value.Id);
    formDataObj.append('Title', formDataUpdate.value.Title);
    formDataObj.append('Url', formDataUpdate.value.Url);

    if (selectedFile.value) {
        formDataObj.append('File', selectedFile.value);
    }
    
    await linkToMeStore.update(formDataObj);
    selectedFile.value = null;
};

// Delete
const handleDelete = async (id) => {
    await linkToMeStore.delete(id);
};

</script>

<template>
    <Accordion title="Link To Me" titleBgColor="bg-orange-500/50">

        <div class="space-y-5">
            <!-- create form -->
            <FormContentWrapperGradient>
                <form method="POST" ref="createForm" @submit.prevent="handleCreate()">                
                    <LabelInput label="title" id="title" v-model="formDataCreate.Title" />
                    <LabelInput label="url" id="url" marginTop="12px" v-model="formDataCreate.Url" />
                    <LabelInput label="imgUrl" id="imgUrl" marginTop="12px" inputType="file" :onChangeFunc="handleFileChange" />
                    <CustomButton title="Create" bgColor="bg-green-600/70" btnType="submit" :btnDisable="linkToMeStore.isLoading" class="mt-5" />
                </form>
            </FormContentWrapperGradient>

            <!-- links to me -->
            <div v-for="(link, index) in linkToMeStore.links.slice().reverse()" :key="link.id">
                <form method="POST" @submit.prevent="handleUpdate(link)">
                    <FormContentWrapper>
                        <template #idHeader>
                            <span>#{{ linkToMeStore.links.length - index }}</span>
                        </template>
                        <template #inputBody>
                            <input type="hidden" name="id" v-model="link.id" readonly/>
                            <LabelInput label="title" id="title" v-model="link.title" />
                            <LabelInput label="url" id="url" marginTop="12px" v-model="link.url" />
                            <div class="flex items-end">
                                <LabelInput label="imgUrl" id="imgUrl" marginTop="12px" inputType="file" :onChangeFunc="handleFileChange" />
                                <img :src="`${linkToMeStore.urlFromEnv}${link.imgUrl}`" class="size-12 ml-auto" alt="icon" loading="lazy">
                            </div>
                        </template>
                        <template #btnFooter>
                            <CustomButton title="send" bgColor="bg-green-600/70" btnType="submit" :btnDisable="linkToMeStore.isLoading" />
                            <CustomButton @click="handleDelete(link.id)" title="DEL" bgColor="bg-red-600/70" btnType="button" :btnDisable="linkToMeStore.isLoading" />
                        </template>
                    </FormContentWrapper>
                </form>
            </div>

        </div>
    </Accordion>

    <Loader v-if="linkToMeStore.isLoading" :hasBg="true" />
</template>