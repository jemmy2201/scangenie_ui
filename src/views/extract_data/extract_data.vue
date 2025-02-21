<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="edit-card" elevation="10">
            <v-card-title class="text-center text-h5 font-weight-bold">Edit Uploaded Data</v-card-title>
            <v-card-text>
                <template v-if="Object.keys(fileData).length">
                    <v-text-field
                            v-for="(value, key) in fileData"
                            :key="key"
                            v-model="fileData[key]"
                            :label="key"
                            outlined
                    ></v-text-field>

                    <!-- Select Box untuk memilih klaim -->
                    <v-select
                            v-model="selectedClaim"
                            :items="claims"
                            item-title="claimdesp"
                            item-value="id"
                            label="Select Claim"
                            outlined
                            return-object
                    ></v-select>

                    <!-- Wrapper untuk tombol -->
                    <div class="d-flex justify-space-between align-center mt-4">
                        <v-btn color="secondary" @click="saveChanges">
                            Back
                        </v-btn>

                        <v-btn color="primary" class="mx-2" @click="dialog = true">
                            Select Claim
                        </v-btn>

                        <v-btn color="red" :disabled="!selectedClaim" @click="saveChanges">
                            Post
                        </v-btn>
                    </div>
                </template>
                <v-alert v-else type="error" class="mt-2">
                    No data available to edit.
                </v-alert>
            </v-card-text>
        </v-card>

        <!-- Dialog Popup untuk Select Claim -->
        <v-dialog v-model="dialog" max-width="400">
            <v-card>
                <v-card-title class="text-center text-h6">Select Claim</v-card-title>
                <v-card-text>
                    <v-select
                            v-model="selectedClaim"
                            :items="claims"
                            item-title="claimdesp"
                            item-value="id"
                            label="Select Claim"
                            outlined
                            dense
                            @update:modelValue="selectClaim"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
    import { ref, onMounted, nextTick } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import api from '@/api/axios';
    import { VBtn, VAlert, VContainer, VCard, VCardTitle, VCardText, VTextField, VDialog,VSelect} from 'vuetify/components';

    const route = useRoute();
    const router = useRouter();
    const fileData = ref({});
    const claims = ref([]); // Data klaim
    const selectedClaim = ref(null); // Klaim yang dipilih
    const dialog = ref(false); // Status dialog popup

    // Ambil data dari query parameter saat halaman dimuat
    onMounted(async () => {
        try {
            if (route.query.data) {
                const parsedData = JSON.parse(route.query.data);
                Object.assign(fileData.value, parsedData); // Memastikan reaktivitas
                await nextTick(); // Tunggu Vue update DOM
                console.log('Data setelah diparse:', fileData.value);
            }
        } catch (error) {
            console.error('Error parsing data:', error);
            fileData.value = {}; // Default jika parsing gagal
        }

        // Fetch data klaim dari API
        fetchClaims();
    });

    // Fungsi mengambil data klaim
    const fetchClaims = async () => {
        try {
            const response = await api.post('/endpoint/hrmilion/getclaimtype');
            console.log('Response API:', response.data); // Debugging untuk memastikan data yang diterima

            // Pastikan path menuju array data benar
            claims.value = response.data.claims.original.data.data;
        } catch (error) {
            console.error('Error fetching claims:', error);
        }
    };

    // Fungsi memilih klaim dari dialog
    const selectClaim = (claim) => {
        selectedClaim.value = claim;
        dialog.value = false; // Tutup dialog setelah memilih
    };

    // Fungsi untuk menyimpan perubahan
    const saveChanges = () => {
        router.push('/upload_data');
    };
</script>

<style scoped>
    .edit-card {
        width: 400px;
        padding: 20px;
        border-radius: 16px;
    }
    .cursor-pointer {
        cursor: pointer;
    }
</style>
