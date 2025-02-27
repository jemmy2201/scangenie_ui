<script setup>
    import { ref } from 'vue';
    import api from '@/api/axios';
    import { useRouter } from 'vue-router';
    import { VFileInput, VBtn, VAlert, VContainer, VCard, VCardTitle, VCardText, VIcon } from 'vuetify/components';

    const files = ref([{ id: Date.now(), file: null }]); // Setidaknya ada 1 file input
    const loading = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const addFileInput = () => {
        if (files.value.length < 10) {
            files.value.push({ id: Date.now(), file: null });
        }
    };

    const removeFileInput = (index) => {
        if (files.value.length > 1) {
            files.value.splice(index, 1);
        }
    };

    const uploadFile = async () => {
        if (files.value.every(f => !f.file)) {
            errorMessage.value = 'Select at least one file!';
            return;
        }

        successMessage.value = '';
        errorMessage.value = '';
        loading.value = true;

        const formData = new FormData();
        files.value.forEach((f) => {
            if (f.file) {
                formData.append(`files[]`, f.file);
            }
        });

        try {
            const response = await api.post('/extract/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            successMessage.value = response.data.message || 'File uploaded successfully!';

            router.push({
                name: 'ExtractData',
                query: { data: JSON.stringify(response.data.results) }
            });
        } catch (error) {
            errorMessage.value = error.response?.data?.message || 'Upload failed!';
        } finally {
            loading.value = false;
        }
    };
</script>

<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="upload-card" elevation="12">
            <v-card-title class="text-center text-h5 font-weight-bold">
                Upload File
            </v-card-title>
            <v-card-text>
                <div v-for="(fileObj, index) in files" :key="fileObj.id" class="d-flex align-center mb-3 file-input-wrapper">
                    <v-file-input v-model="fileObj.file" label="Select File" variant="outlined" class="flex-grow-1"></v-file-input>
                    <v-btn icon color="error" class="ml-3 mt-n5" @click="removeFileInput(index)" v-if="files.length > 1">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </div>

                <v-btn v-if="files.length < 10" block color="primary" class="mt-3" @click="addFileInput">
                    <v-icon left>mdi-plus</v-icon> Add File
                </v-btn>

                <v-btn :loading="loading" block color="success" class="mt-4 upload-btn" @click="uploadFile">
                    Upload
                </v-btn>
                <v-alert v-if="successMessage" type="success" class="mt-3">{{ successMessage }}</v-alert>
                <v-alert v-if="errorMessage" type="error" class="mt-3">{{ errorMessage }}</v-alert>

            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
    .upload-card {
        width: 450px;
        padding: 24px;
        border-radius: 20px;
        background: #f9f9f9;
    }
    .file-input-wrapper {
        display: flex;
        align-items: center;
    }
    .upload-btn {
        font-weight: bold;
    }
</style>
