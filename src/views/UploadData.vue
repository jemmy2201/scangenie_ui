<script setup>
    import { ref } from 'vue';
    import api from '@/api/axios';
    import { VFileInput, VBtn, VAlert, VContainer, VCard, VCardTitle, VCardText, VList, VListItem, VListItemTitle, VListItemSubtitle } from 'vuetify/components';

    const file = ref(null);
    const loading = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');
    const uploadedData = ref(null);

    const uploadFile = async () => {
        if (!file.value) {
            errorMessage.value = 'Pilih file terlebih dahulu';
            return;
        }

        successMessage.value = '';
        errorMessage.value = '';
        loading.value = true;

        const formData = new FormData();
        formData.append('file', file.value);

        try {
            const response = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            successMessage.value = response.data.message || 'File uploaded successfully!';
            uploadedData.value = response.data.data || null;
        } catch (error) {
            errorMessage.value = error.response?.data?.message || 'Upload failed!';
        } finally {
            loading.value = false;
        }
    };
</script>

<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="upload-card" elevation="10">
            <v-card-title class="text-center text-h5 font-weight-bold">
                Upload File
            </v-card-title>
            <v-card-text>
                <v-file-input v-model="file" label="Pilih File" outlined></v-file-input>
                <v-alert v-if="successMessage" type="success" class="mt-2">{{ successMessage }}</v-alert>
                <v-alert v-if="errorMessage" type="error" class="mt-2">{{ errorMessage }}</v-alert>
                <v-btn :loading="loading" block color="blue" class="mt-4" @click="uploadFile">
                    Upload
                </v-btn>

                <div v-if="uploadedData" class="mt-4">
                    <v-card-title class="text-center text-h6 font-weight-bold">Uploaded Data</v-card-title>
                    <v-list>
                        <v-list-item v-for="(value, key) in uploadedData" :key="key">
                            <v-list-item-title>{{ key }}</v-list-item-title>
                            <v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
    .upload-card {
        width: 400px;
        padding: 20px;
        border-radius: 16px;
    }
</style>
