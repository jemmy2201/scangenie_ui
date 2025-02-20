<script setup>
    import {onMounted, ref} from 'vue';
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
    const validationErrors = ref({}) // Menyimpan error dari API
    const formErrors = ref({
        email: [],
        password: [],
    });

    const LoadData = async () => {
        try {
            const response = await api.post('/HrmClaim/select');
            subdomain.value = response.data.claims[0].subdomain
            email.value = response.data.claims[0].email
            password.value = response.data.claims[0].password
            BtnEdit.value = response.data.claims;
        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data
                if (responseData.errors) {
                    // Simpan error validasi ke variabel state
                    validationErrors.value = responseData.errors
                } else {
                    errorMessage.value = responseData.message || 'Claim registered failed!'
                }
            } else {
                errorMessage.value = 'Something went wrong, please try again later.'
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
                const responseData = error.response.data
                if (responseData.errors) {
                    // Simpan error validasi ke variabel state
                    validationErrors.value = responseData.errors
                } else {
                    errorMessage.value = responseData.message || 'Login failed!'
                }
            } else {
                errorMessage.value = 'Something went wrong, please try again later.'
            }
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        LoadData();
    });
</script>

<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="form-card" elevation="10">
            <v-card-title class="text-center text-h5 font-weight-bold">
                HRM Claim
            </v-card-title>
            <v-card-text>
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
