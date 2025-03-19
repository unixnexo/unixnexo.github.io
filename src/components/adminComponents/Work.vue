<script setup>
import Accordion from '@/components/common/Accordion.vue';
import LabelInput from '@/components/common/LabelInput.vue';
import CustomButton from '@/components/common/CustomButton.vue';
import FormContentWrapper from '../common/FormContentWrapper.vue';
import { useWorkStore } from '@/stores/work';
import { ref, onMounted } from 'vue';

const workStore = useWorkStore();

const formData = ref({
    Id: 0,
    Title: '',
    GithubUrl: '',
    WebsiteUrl: ''
});

onMounted(async () => {
    // Get Works
    await workStore.get();
});

// Create ?? need to come up with a way

// Update
const handleUpdate = async (work) => {
    formData.value = {
        Id: work.id,
        Title: work.title,
        GithubUrl: work.githubUrl,
        WebsiteUrl: work.websiteUrl
    };
    await workStore.update(formData.value);
};

// Delete
const handleDelete = async (id) => {
    await workStore.delete(id);
};

</script>

<template>
    <Accordion title="Work" titleBgColor="bg-green-500/50">
        <div class="space-y-5">
            <div v-for="work in workStore.works" :key="work.id">
                <form method="POST" @submit.prevent="handleUpdate(work)">
                    <FormContentWrapper>
                        <template #idHeader>
                            <span>#{{ work.id }}</span>
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
</template>