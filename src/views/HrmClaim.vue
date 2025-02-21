<script setup>
    import { onMounted, ref } from 'vue';
    import api from '@/api/axios';
    import { VTextField, VBtn, VAlert, VContainer, VCard, VCardTitle, VCardText } from 'vuetify/components';

    // State untuk form input
    const subdomain = ref('');
    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const successMessage = ref('');
    const BtnEdit = ref('');
    const errorMessage = ref('');
    const validationErrors = ref({});
    const formErrors = ref({
        email: [],
        password: [],
    });

    const testSuccessMessage = ref('');
    const testErrorMessage = ref('');
    const testLoading = ref(false);

    const LoadData = async () => {
        try {
            const response = await api.post('/HrmClaim/select');
            subdomain.value = response.data.claims[0].subdomain;
            email.value = response.data.claims[0].email;
            password.value = response.data.claims[0].password;
            BtnEdit.value = response.data.claims;
        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                if (responseData.errors) {
                    validationErrors.value = responseData.errors;
                } else {
                    errorMessage.value = responseData.message || 'Claim registered failed!';
                }
            } else {
                // errorMessage.value = 'Something went wrong, please try again later.';
            }
        } finally {
            loading.value = false;
        }
    };

    const submitForm = async () => {
        if (!subdomain.value || !email.value || !password.value) {
            errorMessage.value = 'All fields must be filled in.';
            return;
        }

        successMessage.value = '';
        errorMessage.value = '';
        formErrors.value = { email: [], password: [] };
        loading.value = true;

        const formData = {
            subdomain: subdomain.value,
            email: email.value,
            password: password.value
        };

        try {
            const response = await api.post('/HrmClaim/insert', formData);
            successMessage.value = response.data.message || 'Form submitted successfully!';
            await LoadData();
        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                if (responseData.errors) {
                    validationErrors.value = responseData.errors;
                } else {
                    errorMessage.value = responseData.message || 'Login failed!';
                }
            } else {
                errorMessage.value = 'Something went wrong, please try again later.';
            }
        } finally {
            loading.value = false;
        }
    };

    // Fungsi untuk menguji koneksi API dengan parameter
    const testConnection = async () => {
        testSuccessMessage.value = '';
        testErrorMessage.value = '';
        testLoading.value = true;

        const testData = {
            subdomain: subdomain.value,
            email: email.value,
            password: password.value
        };

        try {
            const response = await api.post('/endpoint/hrmilion/login', testData);

            if (response.data.success) {
                testSuccessMessage.value = 'Connection successful!';
            } else {
                testErrorMessage.value = 'Connection failed!';
            }
        } catch (error) {
            testErrorMessage.value = 'Connection failed! Please check your endpoint or network again.';
        } finally {
            testLoading.value = false;
        }
    };

    onMounted(() => {
        LoadData();
    });
</script>

<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="form-card" elevation="10">
            <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-h5 font-weight-bold">HRM Claim</span>
                <v-btn color="primary" @click="testConnection" :loading="testLoading">
                    Test Koneksi
                </v-btn>
            </v-card-title>
            <v-card-text>
                <!-- Notifikasi Test Koneksi -->
                <v-alert v-if="testSuccessMessage" type="success" class="mb-2">{{ testSuccessMessage }}</v-alert>
                <v-alert v-if="testErrorMessage" type="error" class="mb-2">{{ testErrorMessage }}</v-alert>

                <!-- Subdomain Field -->
                <v-text-field
                        v-model="subdomain"
                        label="Subdomain"
                        outlined
                        required
                        :error-messages="validationErrors.subdomain"
                ></v-text-field>

                <!-- Email Field -->
                <v-text-field
                        v-model="email"
                        label="Email"
                        type="email"
                        outlined
                        required
                        :error-messages="validationErrors.email"
                ></v-text-field>

                <!-- Password Field -->
                <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        outlined
                        required
                        :error-messages="validationErrors.password"
                ></v-text-field>

                <!-- Global Success & Error Messages -->
                <v-alert v-if="successMessage" type="success" class="mt-2">{{ successMessage }}</v-alert>
                <v-alert v-if="errorMessage" type="error" class="mt-2">{{ errorMessage }}</v-alert>

                <!-- Submit Button -->
                <v-btn :loading="loading" block color="red" class="mt-4" @click="submitForm">
                    {{ BtnEdit.length > 0 ? 'Update' : 'Submit' }}
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
    .form-card {
        width: 400px;
        padding: 20px;
        border-radius: 16px;
    }
</style>
