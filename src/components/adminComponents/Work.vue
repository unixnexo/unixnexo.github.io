<script setup>
import Accordion from '@/components/common/Accordion.vue';
import LabelInput from '@/components/common/LabelInput.vue';
import CustomButton from '@/components/common/CustomButton.vue';
import FormContentWrapper from '../common/FormContentWrapper.vue';
import { useWorkStore } from '@/stores/work';
import { ref, onMounted } from 'vue';
import FormContentWrapperGradient from '../common/FormContentWrapperGradient.vue';
import Loader from '../common/Loader.vue';

const workStore = useWorkStore();

const formDataUpdate = ref({
    Id: 0,
    Title: '',
    GithubUrl: '',
    WebsiteUrl: ''
});

const formDataCreate = ref({
    Title: '',
    GithubUrl: '',
    WebsiteUrl: ''
});


onMounted(async () => {
    // Get Works
    await workStore.get();
});

// Create
const handleCreate = async () => {
    if (!formDataCreate.value.Title.trim() && 
        !formDataCreate.value.GithubUrl.trim() && 
        !formDataCreate.value.WebsiteUrl.trim()) {
        return;
    }
    
    const success = await workStore.add(formDataCreate.value);
    if (success) {
        formDataCreate.value = ref({
            Title: '',
            GithubUrl: '',
            WebsiteUrl: ''
        });
    }
};

// Update
const handleUpdate = async (work) => {
    formDataUpdate.value = {
        Id: work.id,
        Title: work.title,
        GithubUrl: work.githubUrl,
        WebsiteUrl: work.websiteUrl
    };
    await workStore.update(formDataUpdate.value);
};

// Delete
const handleDelete = async (id) => {
    await workStore.delete(id);
};

</script>

<template>
    <Accordion title="Work" titleBgColor="bg-green-500/50">
        <div class="space-y-5">
            <!-- create form -->
            <FormContentWrapperGradient>
                <form method="POST" @submit.prevent="handleCreate">
                    <LabelInput label="title" id="title" v-model="formDataCreate.Title" />
                    <LabelInput label="githubUrl" id="githubUrl" marginTop="12px" v-model="formDataCreate.GithubUrl" />
                    <LabelInput label="websiteUrl" id="websiteUrl" marginTop="12px" v-model="formDataCreate.WebsiteUrl" />
                    <CustomButton title="Create" bgColor="bg-green-600/70" btnType="submit" :btnDisable="workStore.isLoading" class="mt-5" />
                </form>
            </FormContentWrapperGradient>

            <!-- works -->
            <div v-for="(work, index) in workStore.works" :key="work.id">
                <form method="POST" @submit.prevent="handleUpdate(work)">
                    <FormContentWrapper>
                        <template #idHeader>
                            <span>#{{ workStore.works.length - index }}</span>
                        </template>
                        <template #inputBody>
                            <input type="hidden" name="id" v-model="work.id" readonly/>
                            <LabelInput label="title" id="title" v-model="work.title" />
                            <LabelInput label="githubUrl" id="githubUrl" marginTop="12px" v-model="work.githubUrl" />
                            <LabelInput label="websiteUrl" id="websiteUrl" marginTop="12px" v-model="work.websiteUrl" />
                            <p class="mt-2">Created: {{ new Date(work.createdAt).toLocaleDateString() }}</p>
                        </template>
                        <template #btnFooter>
                            <CustomButton title="send" bgColor="bg-green-600/70" btnType="submit" :btnDisable="workStore.isLoading" />
                            <CustomButton @click="handleDelete(work.id)" title="DEL" bgColor="bg-red-600/70" btnType="button" :btnDisable="workStore.isLoading" />
                        </template>
                    </FormContentWrapper>
                </form>
            </div>
        </div>
    </Accordion>

    <Loader v-if="workStore.isLoading" :hasBg="true" />
</template>