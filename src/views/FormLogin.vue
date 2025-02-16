<script setup>
    import {  VAlert, VBtn,VForm, VTextField,VCardTitle,VCard,VContainer,VCardText,VImg} from 'vuetify/components'
    import api from '@/api/axios' // Gunakan Axios global
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    // State untuk form login
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const errorMessage = ref('')

    const login = async () => {
        errorMessage.value = ''
        loading.value = true
        console.log('jrg 1',)

        try {
            const response = await api.post('/login', {
                email: email.value,
                password: password.value
            })
            console.log('jrg',response.data)
            // Simpan token ke localStorage (jika API mengembalikan token)
            localStorage.setItem('token', response.data.token)

            // Redirect ke halaman dashboard
            router.push('/dashboardPage')
        } catch (error) {
            errorMessage.value = 'Email atau password salah!'
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
                        ></v-text-field>

                        <v-text-field
                                v-model="password"
                                label="Password"
                                type="password"
                                prepend-inner-icon="mdi-lock"
                                variant="outlined"
                                required
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
