<script setup>
    import { VAlert, VBtn, VForm, VTextField, VCardTitle, VCard, VContainer, VCardText, VImg } from 'vuetify/components'
    import api from '@/api/axios' // Gunakan Axios global
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    // State untuk form login
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const errorMessage = ref('')
    const validationErrors = ref({}) // Menyimpan error dari API

    const register = async () => {
        errorMessage.value = ''
        validationErrors.value = {} // Reset error sebelum request baru
        loading.value = true

        try {
            const response = await api.post('/register', {
                name: name.value,
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
    const goToLogin = () => {
        router.push('/');
    };
</script>

<template>
    <v-img src="/image/logo.jpg" alt="Logo" max-height="80" max-width="200" class="mx-auto mb-4"></v-img>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="login-card" elevation="10">
            <v-card-title class="text-center text-h5 font-weight-bold">
                <span style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: #FF5722;">ScanGenie</span>
            </v-card-title>

            <v-card-title class="mt-n5 text-center text-h5 font-weight-bold">
                Register
            </v-card-title>

            <v-card-text>
                <v-form @submit.prevent="register">
                    <v-text-field
                            v-model="name"
                            label="Name"
                            type="name"
                            prepend-inner-icon="mdi-account"
                            variant="outlined"
                            required
                            :error-messages="validationErrors.name"
                    ></v-text-field>

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
                            color="red"
                            class="mb-4"
                            type="submit"
                    >
                        Register Now
                    </v-btn>

                    <!-- Teks untuk Registrasi -->
                    <v-row justify="center" class="mt-4 ml-10">
                        <v-col class="text-center">
                        <span class="text-black">Already have an account?
                            <span
                                    style="color: blue; cursor: pointer;"
                                    @click="goToLogin"
                            >
                                LOGIN
                            </span>
                        </span>
                        </v-col>
                    </v-row>


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
    .text-black {
        color: #000;
    }
</style>
