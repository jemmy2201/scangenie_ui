<script setup>
    import { VAlert, VBtn, VForm, VTextField, VCardTitle, VCard, VContainer, VCardText, VImg } from 'vuetify/components'
    import api from '@/api/axios' // Gunakan Axios global
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    // State untuk form login
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const errorMessage = ref('')
    const validationErrors = ref({}) // Menyimpan error dari API

    const login = async () => {
        errorMessage.value = ''
        validationErrors.value = {} // Reset error sebelum request baru
        loading.value = true

        try {
            const response = await api.post('/login', {
                email: email.value,
                password: password.value
            })

            // Simpan token ke localStorage (jika API mengembalikan token)
            localStorage.setItem('token', response.data.token)

            // Redirect ke halaman dashboard
            router.push('/dashboardPage')
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
            loading.value = false
        }
    }
</script>

<template>
    <v-img src="/image/logo.jpg" alt="Logo" max-height="80" max-width="200" class="mx-auto mb-4"></v-img>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="login-card" elevation="10">
            <v-card-title class="text-center text-h5 font-weight-bold">
                <span style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: #FF5722;">ScanGenie</span>
            </v-card-title>

            <v-card-title class="mt-n5 text-center text-h5 font-weight-bold">
                Login
            </v-card-title>

            <v-card-text>
                <v-form @submit.prevent="login">
                    <v-text-field
                            v-model="email"
                            label="Email"
                            type="email"
                            prepend-inner-icon="mdi-email"
                            variant="outlined"
                            required
                            :error-messages="validationErrors.email"
                    ></v-text-field>

                    <v-text-field
                            v-model="password"
                            label="Password"
                            type="password"
                            prepend-inner-icon="mdi-lock"
                            variant="outlined"
                            required
                            :error-messages="validationErrors.password"
                    ></v-text-field>

                    <v-alert v-if="errorMessage" type="error" class="mt-2">
                        {{ errorMessage }}
                    </v-alert>

                    <v-btn
                            :loading="loading"
                            block
                            color="primary"
                            class="mt-4"
                            type="submit"
                    >
                        Login
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
    .login-card {
        width: 400px;
        padding: 20px;
        border-radius: 16px;
    }
</style>
