<script setup>
import Accordion from '@/components/common/Accordion.vue';
import LabelInput from '@/components/common/LabelInput.vue';
import CustomButton from '@/components/common/CustomButton.vue';
import FormContentWrapper from '../common/FormContentWrapper.vue';
import { useWorkStore } from '@/stores/work';
import { ref, onMounted } from 'vue';

const workStore = useWorkStore();

const formData = ref({
    title: '',
    githubUrl: '',
    websiteUrl: '',
    createdAt: '',
});

onMounted(async () => {
    // Get Works
    await workStore.get();
});


</script>

<template>
    <Accordion title="Work" titleBgColor="bg-green-500/50">
        <form method="POST" class="space-y-5">

            <FormContentWrapper v-for="work in workStore.works" :key="work.id">
                <template #idHeader>
                    <span>#{{ work.id }}</span>
                </template>
                <template #inputBody>
                    <input type="hidden" :value="work.id" />
                    <LabelInput label="title" id="title" />
                    <LabelInput label="githubUrl" id="githubUrl" marginTop="12px" />
                    <LabelInput label="websiteUrl" id="websiteUrl" marginTop="12px" />
                    <p>Created: {{ new Date(work.createdAt).toLocaleDateString() }}</p>
                </template>
                <template #btnFooter>
                    <CustomButton title="send" bgColor="bg-green-600/70" btnType="submit" />
                    <CustomButton title="DEL" bgColor="bg-red-600/70" btnType="button" />
                </template>
            </FormContentWrapper>

        </form>
    </Accordion>
</template>